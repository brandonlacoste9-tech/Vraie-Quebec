import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { checkUsageLimit, incrementUsage } from "@/lib/subscription"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const MAX_PROMPT_LENGTH = 5000

const google = createGoogleGenerativeAI({
  baseURL: "https://ai-gateway.vercel.sh/v1/google",
  apiKey: process.env.AI_GATEWAY_API_KEY || "",
})

interface GenerateImageResponse {
  url: string
  prompt: string
  description?: string
}

interface ErrorResponse {
  error: string
  message?: string
  details?: string
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key configuration first
    const apiKey = process.env.AI_GATEWAY_API_KEY
    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        {
          error: "Configuration error",
          message: "AI Gateway API key is not configured",
          details: "Please set AI_GATEWAY_API_KEY environment variable. See https://vercel.com/docs/ai-gateway for setup instructions.",
        },
        { status: 500 },
      )
    }

    const userEmail = request.headers.get("x-user-email") || "guest@example.com"
    const { allowed, reason, subscription } = await checkUsageLimit(userEmail, "image")

    if (!allowed) {
      return NextResponse.json(
        {
          error: reason,
          upgradeUrl: "https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00",
          subscription,
        },
        { status: 403 },
      )
    }

    const formData = await request.formData()
    const mode = formData.get("mode") as string
    const prompt = formData.get("prompt") as string
    const aspectRatio = formData.get("aspectRatio") as string
    const strengthParam = formData.get("strength") as string
    const strength = strengthParam ? parseFloat(strengthParam) : 0.8 // Default to 0.8 if not provided

    if (!mode) {
      return NextResponse.json({ error: "Mode is required" }, { status: 400 })
    }

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json({ error: `Prompt too long. Maximum ${MAX_PROMPT_LENGTH} characters.` }, { status: 400 })
    }

    if (mode === "text-to-image") {
      const result = await generateText({
        model: google("gemini-2.0-flash-exp"),
        prompt: `Generate a high-quality image: ${prompt}`,
        providerOptions: {
          google: {
            responseModalities: ["IMAGE", "TEXT"],
          },
        },
      })

      const imageFiles = result.files?.filter((f) => f.mediaType?.startsWith("image/")) || []

      if (imageFiles.length === 0) {
        return NextResponse.json(
          { error: "No image generated", details: "The model did not return any images" },
          { status: 500 },
        )
      }

      const firstImage = imageFiles[0]
      const imageUrl = `data:${firstImage.mediaType};base64,${firstImage.base64}`

      incrementUsage(userEmail, "image").catch(() => {})

      return NextResponse.json({
        url: imageUrl,
        prompt: prompt,
        description: result.text || "",
      })
    } else if (mode === "image-editing") {
      const image1 = formData.get("image1") as File
      const image1Url = formData.get("image1Url") as string
      const image2 = formData.get("image2") as File
      const image2Url = formData.get("image2Url") as string

      const convertToBase64 = async (source: File | string): Promise<{ base64: string; mediaType: string }> => {
        if (typeof source === "string") {
          const response = await fetch(source)
          const arrayBuffer = await response.arrayBuffer()
          const base64 = Buffer.from(arrayBuffer).toString("base64")
          return { base64, mediaType: response.headers.get("content-type") || "image/jpeg" }
        } else {
          const arrayBuffer = await source.arrayBuffer()
          const base64 = Buffer.from(arrayBuffer).toString("base64")
          return { base64, mediaType: source.type }
        }
      }

      const img1Data = await convertToBase64(image1 || image1Url)
      const img2Data = image2 || image2Url ? await convertToBase64(image2 || image2Url) : null

      // Enhance prompt with strength information if provided
      const enhancedPrompt = strength !== 0.8 
        ? `${prompt} (editing strength: ${Math.round(strength * 100)}%)`
        : prompt

      const content: any[] = [{ type: "image", image: `data:${img1Data.mediaType};base64,${img1Data.base64}` }]
      if (img2Data) {
        content.push({ type: "image", image: `data:${img2Data.mediaType};base64,${img2Data.base64}` })
      }
      content.push({ type: "text", text: enhancedPrompt })

      const result = await generateText({
        model: google("gemini-2.0-flash-exp"),
        messages: [{ role: "user", content }],
        providerOptions: {
          google: {
            responseModalities: ["IMAGE", "TEXT"],
          },
        },
      })

      const imageFiles = result.files?.filter((f) => f.mediaType?.startsWith("image/")) || []

      if (imageFiles.length === 0) {
        return NextResponse.json({ error: "No image generated" }, { status: 500 })
      }

      const firstImage = imageFiles[0]
      incrementUsage(userEmail, "image").catch(() => {})

      return NextResponse.json({
        url: `data:${firstImage.mediaType};base64,${firstImage.base64}`,
        prompt,
        description: result.text || "",
      })
    }

    return NextResponse.json({ error: "Invalid mode" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Error in generate-image:", error)
    
    // Handle specific error types
    let errorMessage = "Failed to generate image"
    let errorDetails = error instanceof Error ? error.message : "Unknown error"
    let statusCode = 500

    // Check for API key related errors
    if (error instanceof Error) {
      if (error.message.includes("API key") || error.message.includes("authentication") || error.message.includes("401") || error.message.includes("403")) {
        errorMessage = "Configuration error"
        errorDetails = "Invalid or missing AI Gateway API key. Please check your environment variables."
        statusCode = 500
      } else if (error.message.includes("rate limit") || error.message.includes("429")) {
        errorMessage = "Rate limit exceeded"
        errorDetails = "Too many requests. Please try again later."
        statusCode = 429
      } else if (error.message.includes("network") || error.message.includes("fetch")) {
        errorMessage = "Network error"
        errorDetails = "Failed to connect to AI Gateway. Please check your internet connection and try again."
        statusCode = 503
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage, 
        details: errorDetails,
        type: statusCode === 500 && errorDetails.includes("API key") ? "configuration" : 
              statusCode === 429 ? "rate_limit" :
              statusCode === 503 ? "network" : "unknown"
      },
      { status: statusCode },
    )
  }
}
