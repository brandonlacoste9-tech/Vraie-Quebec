"use client"

import type React from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Send, Sparkles, User, Bot, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useRef, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { UsageIndicator } from "@/components/usage-indicator"
import { useUserIdentity } from "@/hooks/use-user-identity"

// Helper to extract text from UIMessage parts
function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text" && typeof p.text === "string")
    .map((p) => p.text)
    .join("")
}

export default function ChatPage() {
  const userId = useUserIdentity()
  const [limitReached, setLimitReached] = useState(false)
  const [limitMessage, setLimitMessage] = useState("")
  const [input, setInput] = useState("")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ 
      api: "/api/chat",
      headers: {
        "x-user-email": userId || "guest@example.com",
      },
    }),
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
  const isLoading = status === "streaming" || status === "submitted"

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || limitReached) return
    sendMessage({ text: input })
    setInput("")
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <MainNav />

      <div className="relative flex flex-1 flex-col min-h-0">
        <div className="absolute top-4 right-4 md:right-8 z-40 hidden md:block">
          <UsageIndicator type="message" />
        </div>

        <div className="flex-1 overflow-hidden relative min-h-0">
          <ScrollArea className="h-full min-h-0 p-4 md:p-8" ref={scrollRef}>
          <div className="max-w-3xl mx-auto space-y-6">
            <Alert className="bg-primary/10 border-primary/20">
              <Crown className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm text-foreground/80">
                Essai gratuit : 100 messages et 10 images pour 7 jours. Abonnez-vous pour un accès illimité à 6$/mois.
              </AlertDescription>
            </Alert>

            <div className="md:hidden">
              <UsageIndicator type="message" />
            </div>

            {limitReached && (
              <Alert className="bg-destructive/10 border-destructive/20">
                <AlertDescription className="text-sm text-foreground">
                  {limitMessage}{" "}
                  <Link href="https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00" className="underline text-primary font-semibold">
                    S'abonner
                  </Link>
                </AlertDescription>
              </Alert>
            )}

            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-light text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                  Assistant Vrai Québec
                </h2>
                <p className="max-w-md">
                  Posez-moi des questions sur les restaurants, hôtels, événements ou adresses cachées du Québec.
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <Avatar className="w-8 h-8 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-none px-4 py-3 max-w-[80%] ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface border border-border text-foreground"
                  }`}
                >
                  <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{getMessageText(m)}</p>
                </div>
                {m.role === "user" && (
                  <Avatar className="w-8 h-8 border border-border">
                    <AvatarFallback className="bg-muted text-foreground">
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start gap-3">
                <Avatar className="w-8 h-8 border border-border">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-surface border border-border px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>
          </ScrollArea>
        </div>

        <div className="flex-shrink-0 border-t border-border bg-surface/80 backdrop-blur-lg p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleCustomSubmit} className="relative flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Restaurants, hôtels, événements..."
                className="input-luxury pr-12 py-6"
                disabled={limitReached}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim() || limitReached}
                className="absolute right-1.5 top-1.5 h-9 w-9 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Envoyer</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
