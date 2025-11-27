"use client"

import type React from "react"

import { useState } from "react"
import type { Generation } from "../types"
import { saveGeneration } from "@/lib/data/aiGenerations"

interface UseImageGenerationProps {
  prompt: string
  aspectRatio: string
  image1: File | null
  image2: File | null
  image1Url: string
  image2Url: string
  useUrls: boolean
  strength?: number // Strength for image editing (0.0-1.0)
  generations: Generation[]
  setGenerations: React.Dispatch<React.SetStateAction<Generation[]>>
  addGeneration: (generation: Generation) => Promise<void>
  onToast: (message: string, type?: "success" | "error") => void
  onImageUpload: (file: File, imageNumber: 1 | 2) => Promise<void>
  onApiKeyMissing?: () => void
  userId?: string // Add userId prop
}

interface GenerateImageOptions {
  prompt?: string
  aspectRatio?: string
  image1?: File | null
  image2?: File | null
  image1Url?: string
  image2Url?: string
  useUrls?: boolean
  strength?: number // Strength for image editing
  onApiKeyMissing?: () => void
  userId?: string // Destructure userId
}

const playSuccessSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime)

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  } catch (error) {
    console.log("Could not play sound:", error)
  }
}

export function useImageGeneration({
  prompt,
  aspectRatio,
  image1,
  image2,
  image1Url,
  image2Url,
  useUrls,
  strength = 0.8,
  generations,
  setGenerations,
  addGeneration,
  onToast,
  onImageUpload,
  onApiKeyMissing,
  userId,
}: UseImageGenerationProps) {
  const [selectedGenerationId, setSelectedGenerationId] = useState<string | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const cancelGeneration = (generationId: string) => {
    const generation = generations.find((g) => g.id === generationId)
    if (generation?.abortController) {
      generation.abortController.abort()
    }

    setGenerations((prev) =>
      prev.map((gen) =>
        gen.id === generationId && gen.status === "loading"
          ? { ...gen, status: "error" as const, error: "Cancelled by user", progress: 0, abortController: undefined }
          : gen,
      ),
    )
    onToast("Generation cancelled", "error")
  }

  const generateImage = async (options?: GenerateImageOptions) => {
    const effectivePrompt = options?.prompt ?? prompt
    const effectiveAspectRatio = options?.aspectRatio ?? aspectRatio
    const effectiveImage1 = options?.image1 !== undefined ? options.image1 : image1
    const effectiveImage2 = options?.image2 !== undefined ? options.image2 : image2
    const effectiveImage1Url = options?.image1Url !== undefined ? options.image1Url : image1Url
    const effectiveImage2Url = options?.image2Url !== undefined ? options.image2Url : image2Url
    const effectiveUseUrls = options?.useUrls !== undefined ? options.useUrls : useUrls
    const effectiveStrength = options?.strength !== undefined ? options.strength : strength
    const effectiveUserId = options?.userId !== undefined ? options.userId : userId

    const hasImages = effectiveUseUrls ? effectiveImage1Url || effectiveImage2Url : effectiveImage1 || effectiveImage2
    const currentMode = hasImages ? "image-editing" : "text-to-image"

    if (currentMode === "image-editing" && !effectiveUseUrls && !effectiveImage1) {
      onToast("Please upload at least one image for editing mode", "error")
      return
    }
    if (currentMode === "image-editing" && effectiveUseUrls && !effectiveImage1Url) {
      onToast("Please provide at least one image URL for editing mode", "error")
      return
    }
    if (!effectivePrompt.trim()) {
      onToast("Please enter a prompt", "error")
      return
    }

    const numVariations = 1
    const generationPromises = []

    for (let i = 0; i < numVariations; i++) {
      const generationId = `gen-${Date.now()}-${Math.random().toString(36).substring(7)}`
      const controller = new AbortController()

      const newGeneration: Generation = {
        id: generationId,
        status: "loading",
        progress: 0,
        imageUrl: null,
        prompt: effectivePrompt,
        timestamp: Date.now() + i,
        abortController: controller,
      }

      setGenerations((prev) => [newGeneration, ...prev])

      if (i === 0) {
        setSelectedGenerationId(generationId)
      }

      const progressInterval = setInterval(() => {
        setGenerations((prev) =>
          prev.map((gen) => {
            if (gen.id === generationId && gen.status === "loading") {
              const next =
                gen.progress >= 98
                  ? 98
                  : gen.progress >= 96
                    ? gen.progress + 0.2
                    : gen.progress >= 90
                      ? gen.progress + 0.5
                      : gen.progress >= 75
                        ? gen.progress + 0.8
                        : gen.progress >= 50
                          ? gen.progress + 1
                          : gen.progress >= 25
                            ? gen.progress + 1.2
                            : gen.progress + 1.5
              return { ...gen, progress: Math.min(next, 98) }
            }
            return gen
          }),
        )
      }, 100)

      const generationPromise = (async () => {
        try {
          const formData = new FormData()
          formData.append("mode", currentMode)
          formData.append("prompt", effectivePrompt)
          formData.append("aspectRatio", effectiveAspectRatio)

          if (currentMode === "image-editing") {
            formData.append("strength", effectiveStrength.toString())
            if (effectiveUseUrls) {
              formData.append("image1Url", effectiveImage1Url)
              if (effectiveImage2Url) {
                formData.append("image2Url", effectiveImage2Url)
              }
            } else {
              if (effectiveImage1) {
                formData.append("image1", effectiveImage1)
              }
              if (effectiveImage2) {
                formData.append("image2", effectiveImage2)
              }
            }
          }

          const response = await fetch("/api/generate-image", {
            method: "POST",
            headers: {
              "x-user-email": effectiveUserId || "guest@example.com", // Pass userId in headers
            },
            body: formData,
            signal: controller.signal,
          })

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Unknown error" }))

            clearInterval(progressInterval)

            // Handle configuration errors (missing API key)
            if (errorData.error === "Configuration error" || errorData.type === "configuration") {
              setGenerations((prev) => prev.filter((gen) => gen.id !== generationId))
              onApiKeyMissing?.()
              onToast("AI Gateway API key is not configured. Please contact the administrator.", "error")
              return
            }

            // Handle rate limit errors
            if (response.status === 429 || errorData.type === "rate_limit") {
              setGenerations((prev) =>
                prev.map((gen) =>
                  gen.id === generationId
                    ? { ...gen, status: "error" as const, error: errorData.details || "Rate limit exceeded", progress: 0, abortController: undefined }
                    : gen,
                ),
              )
              onToast("Rate limit exceeded. Please try again in a few moments.", "error")
              return
            }

            // Handle usage limit errors (403)
            if (response.status === 403) {
              setGenerations((prev) => prev.filter((gen) => gen.id !== generationId))
              const upgradeMessage = errorData.upgradeUrl 
                ? "Trial limit reached. Subscribe for unlimited access."
                : errorData.error || "Usage limit reached"
              onToast(upgradeMessage, "error")
              return
            }

            // Handle network errors
            if (errorData.type === "network" || response.status === 503) {
              setGenerations((prev) =>
                prev.map((gen) =>
                  gen.id === generationId
                    ? { ...gen, status: "error" as const, error: "Network error", progress: 0, abortController: undefined }
                    : gen,
                ),
              )
              onToast("Network error. Please check your connection and try again.", "error")
              return
            }

            // Handle validation errors (400)
            if (response.status === 400) {
              setGenerations((prev) => prev.filter((gen) => gen.id !== generationId))
              onToast(errorData.error || "Invalid request. Please check your input.", "error")
              return
            }

            // Handle model errors (no image generated)
            if (errorData.error === "No image generated") {
              setGenerations((prev) =>
                prev.map((gen) =>
                  gen.id === generationId
                    ? { ...gen, status: "error" as const, error: "Model did not generate an image", progress: 0, abortController: undefined }
                    : gen,
                ),
              )
              onToast("The AI model did not generate an image. Please try a different prompt.", "error")
              return
            }

            // Generic error handling
            const errorMessage = errorData.error || "Unknown error"
            const errorDetails = errorData.details ? `: ${errorData.details}` : ""
            setGenerations((prev) =>
              prev.map((gen) =>
                gen.id === generationId
                  ? { ...gen, status: "error" as const, error: errorMessage, progress: 0, abortController: undefined }
                  : gen,
              ),
            )
            onToast(`Error: ${errorMessage}${errorDetails}`, "error")
            return
          }

          const data = await response.json()

          clearInterval(progressInterval)

          if (data.url) {
            const completedGeneration: Generation = {
              id: generationId,
              status: "complete",
              progress: 100,
              imageUrl: data.url,
              prompt: effectivePrompt,
              timestamp: Date.now(),
              createdAt: new Date().toISOString(),
              aspectRatio: effectiveAspectRatio,
              mode: currentMode,
            }

            setGenerations((prev) => prev.filter((gen) => gen.id !== generationId))

            await addGeneration(completedGeneration)

            // Save to Supabase for persistent history
            try {
              await saveGeneration({
                user_id: effectiveUserId || null,
                user_email: effectiveUserId || null, // Using userId as email for now
                prompt: effectivePrompt,
                image_url: data.url,
                mode: currentMode,
                aspect_ratio: effectiveAspectRatio,
                description: data.description || null,
              })
            } catch (error) {
              // Don't fail the generation if saving to DB fails
              console.error("Failed to save generation to database:", error)
            }
          }

          if (selectedGenerationId === generationId) {
            setImageLoaded(true)
          }

          playSuccessSound()
        } catch (error) {
          console.error("Error in generation:", error)
          clearInterval(progressInterval)

          if (error instanceof Error && error.name === "AbortError") {
            // Generation was cancelled by user, don't show error
            return
          }

          // Handle network/fetch errors
          if (error instanceof TypeError && error.message.includes("fetch")) {
            setGenerations((prev) =>
              prev.map((gen) =>
                gen.id === generationId
                  ? { ...gen, status: "error" as const, error: "Network error", progress: 0, abortController: undefined }
                  : gen,
              ),
            )
            onToast("Network error. Please check your internet connection and try again.", "error")
            return
          }

          const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

          setGenerations((prev) =>
            prev.map((gen) =>
              gen.id === generationId
                ? { ...gen, status: "error" as const, error: errorMessage, progress: 0, abortController: undefined }
                : gen,
            ),
          )

          onToast(`Error generating image: ${errorMessage}`, "error")
        }
      })()

      generationPromises.push(generationPromise)
    }

    await Promise.all(generationPromises)
  }

  const loadGeneratedAsInput = async () => {
    const selectedGeneration = generations.find((g) => g.id === selectedGenerationId)
    if (!selectedGeneration?.imageUrl) return

    try {
      const response = await fetch(selectedGeneration.imageUrl)
      const blob = await response.blob()
      const file = new File([blob], "generated-image.png", { type: "image/png" })

      await onImageUpload(file, 1)
      onToast("Image loaded into Input 1", "success")
    } catch (error) {
      console.error("Error loading image as input:", error)
      onToast("Error loading image", "error")
    }
  }

  const retryGeneration = async (generationId: string) => {
    const generation = generations.find((g) => g.id === generationId)
    if (!generation) return

    // Reset the generation to loading state
    setGenerations((prev) =>
      prev.map((gen) =>
        gen.id === generationId
          ? {
              ...gen,
              status: "loading" as const,
              progress: 0,
              error: undefined,
              abortController: new AbortController(),
            }
          : gen,
      ),
    )

    // Retry with the same parameters
    await generateImage({
      prompt: generation.prompt,
      aspectRatio: generation.aspectRatio,
    })
  }

  return {
    selectedGenerationId,
    setSelectedGenerationId,
    imageLoaded,
    setImageLoaded,
    generateImage,
    cancelGeneration,
    loadGeneratedAsInput,
    retryGeneration,
  }
}
