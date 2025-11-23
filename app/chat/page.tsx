"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { Send, Sparkles, User, Bot, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { UsageIndicator } from "@/components/usage-indicator"
import { useUserIdentity } from "@/hooks/use-user-identity" // Import hook

export default function ChatPage() {
  const userId = useUserIdentity() // Use the hook to get unique ID
  const [limitReached, setLimitReached] = useState(false)
  const [limitMessage, setLimitMessage] = useState("")
  const [inputValue, setInputValue] = useState("")

  const { messages, append, isLoading } = useChat({
    headers: {
      "x-user-email": userId || "guest@example.com", // Use unique ID instead of static guest email
    },
    onError: (err) => {
      try {
        const errorData = JSON.parse(err.message)
        if (errorData.error) {
          setLimitReached(true)
          setLimitMessage(errorData.error)
        }
      } catch {
        console.error("Chat error:", err)
      }
    },
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading || limitReached) return

    try {
      await append({ role: "user", content: inputValue })
      setInputValue("")
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-black text-white relative">
      <div className="absolute top-4 right-4 z-50 hidden md:block">
        <UsageIndicator type="message" />
      </div>

      <div className="flex-1 overflow-hidden relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

        <ScrollArea className="h-full p-4 md:p-8" ref={scrollRef}>
          <div className="max-w-3xl mx-auto space-y-6">
            <Alert className="bg-primary/10 border-primary/20">
              <Crown className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm text-white/80">
                Free trial: 100 messages & 10 images for 7 days. Subscribe for unlimited access at just $6/month.
              </AlertDescription>
            </Alert>

            <div className="md:hidden">
              <UsageIndicator type="message" />
            </div>

            {limitReached && (
              <Alert className="bg-destructive/10 border-destructive/20">
                <AlertDescription className="text-sm text-white">
                  {limitMessage}{" "}
                  <Link
                    href="https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00"
                    className="underline text-primary font-semibold"
                  >
                    Subscribe now
                  </Link>
                </AlertDescription>
              </Alert>
            )}

            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-heading text-white">Vrai Québec Assistant</h2>
                <p className="max-w-md">
                  Ask me anything about Montreal nightlife, best poutine spots, luxury hotels, or hidden gems in Quebec.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <Avatar className="w-8 h-8 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-white border border-white/10"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{m.content}</p>
                </div>

                {m.role === "user" && (
                  <Avatar className="w-8 h-8 border border-white/20">
                    <AvatarFallback className="bg-white/10 text-white">
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start gap-3">
                <Avatar className="w-8 h-8 border border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary/50 rounded-2xl px-4 py-3 border border-white/10 flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="border-t border-white/10 bg-black/50 backdrop-blur-lg p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleCustomSubmit} className="relative flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about restaurants, hotels, or events..."
              className="bg-secondary/50 border-white/10 text-white placeholder:text-muted-foreground/50 focus-visible:ring-primary pr-12 py-6"
              disabled={limitReached}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !inputValue.trim() || limitReached}
              className="absolute right-1.5 top-1.5 h-9 w-9 bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
