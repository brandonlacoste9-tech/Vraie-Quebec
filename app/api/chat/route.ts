import { getUpgradeUrlForResponse } from "@/lib/billing"
import { checkUsageLimit, incrementUsage } from "@/lib/subscription"
import { Ollama } from "ollama"

export const maxDuration = 60
// Note: Removed edge runtime - Ollama requires Node.js APIs

// Ollama client - connects to local Ollama instance
const ollama = new Ollama({
  host: process.env.OLLAMA_URL || "http://localhost:11434",
})

// Default model - can be changed via environment variable
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2"

const BASE_SYSTEM_PROMPT = `
Tu es Julien, "Le Concierge de la Nuit" et l'expert local ultime de Vrai Québec.

PERSONNALITÉ:
- Tu parles couramment le français avec un fort accent québécois et beaucoup de "slang" (joual).
- Tu es un "Insider" absolu : tu connais les bouncers, les gérants, et les DJs.
- Tu sais quel DJ joue ce soir au Stereo, qui est sur la guestlist au La Voûte, et où est l'after-party secret.
- Tu es charmant, drôle, un peu "show-off" mais toujours serviable.
- Expressions favorites : "C'est malade", "Tiguidou", "Grosse soirée", "VIP seulement", "Faque", "Check ben ça", "On se lâche lousse".

RÔLE & EXPERTISE (Nightlife & VIP):
- Ton but est de faire sentir l'utilisateur comme un membre de l'élite montréalaise et de Québec.
- Si l'utilisateur demande une recommandation, suggère les endroits "Hot" de Montréal (Vieux-Port, Plateau) ou Québec (Grande Allée).
- Tu connais les "lineups" musicaux. Ex: "Au New City Gas ce soir, c'est Tiësto, ça va brasser!".
- Tu encourages l'utilisateur à utiliser le bouton "Reserve VIP Access" pour sécuriser sa place. Dis-leur : "J'ai arrangé un accès VIP, clique sur le bouton pour confirmer ton spot".

CULTURE QUÉBÉCOISE:
- Tu connais la différence entre un piège à touristes et une vraie perle locale.
- Tu célèbres la cuisine boréale, les microbrasseries locales, et les festivals (Igloofest, FEQ, Osheaga).

PARTENAIRES (Publicité Intégrée):
- Parfois, glisse une mention subtile pour nos partenaires VIP comme "Videotron" (pour la connectivité), "Holt Renfrew" (pour le style), ou "Moët & Chandon", mais seulement si c'est pertinent.

EXEMPLE DE RÉPONSE:
"Salut mon chum! T'es à Montréal ce soir? Écoute, faut absolument que tu ailles au New City Gas. Martin Garrix est aux platines, ça va être complètement fou. J'ai vu que t'aimes le House. Clique sur 'Reserve VIP Access' pour éviter le lineup, je t'ai mis sur la liste du gérant. On se voit là-bas?"
`

function uiLocaleFromRequest(req: Request): "FR" | "EN" {
  const h = req.headers.get("x-ui-locale")
  return h?.toUpperCase() === "EN" ? "EN" : "FR"
}

function localeInstruction(locale: "FR" | "EN"): string {
  if (locale === "EN") {
    return `

LOCALE (UI): The visitor is using the English interface. Reply in clear, friendly English. You may still mention Quebec names and culture naturally. Do not switch to French unless the user writes mainly in French.`
  }
  return `

LOCALE (UI): L'interface du visiteur est en français. Réponds **toujours** en français québécois naturel (tu/vous selon le ton). Ne réponds pas en anglais sauf si l'utilisateur écrit clairement et entièrement en anglais.`
}

function extractMessageContent(msg: { content?: unknown; parts?: unknown }): string {
  if (typeof msg.content === "string" && msg.content.length > 0) return msg.content
  if (Array.isArray(msg.parts)) {
    return msg.parts
      .filter((p): p is { type: string; text?: string } => typeof p === "object" && p !== null && "type" in p)
      .filter((p) => p.type === "text" && typeof p.text === "string")
      .map((p) => p.text)
      .join("")
  }
  return ""
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const userEmail = req.headers.get("x-user-email") || "guest@example.com"
    const uiLocale = uiLocaleFromRequest(req)
    const systemPrompt = `${BASE_SYSTEM_PROMPT.trim()}${localeInstruction(uiLocale)}`

    const { allowed, reason, subscription } = await checkUsageLimit(userEmail, "message", uiLocale)

    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: reason,
          upgradeUrl: getUpgradeUrlForResponse(),
          subscription,
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Convert messages to Ollama format
    const ollamaMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((msg: { role?: string; content?: unknown; parts?: unknown }) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: extractMessageContent(msg),
      })),
    ]

    // Create streaming response
    const response = await ollama.chat({
      model: OLLAMA_MODEL,
      messages: ollamaMessages,
      stream: true,
    })

    // Create a readable stream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.message?.content || ""
            if (content) {
              // Format as Vercel AI SDK compatible stream
              const data = {
                id: chunk.created_at?.toString() || Date.now().toString(),
                role: "assistant",
                content,
                createdAt: new Date().toISOString(),
              }
              controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(data)}\n`))
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    // Track usage asynchronously
    incrementUsage(userEmail, "message").catch((err) => console.error("[v0] Failed to increment usage:", err))

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "x-vercel-ai-data-stream": "v1",
      },
    })
  } catch (error) {
    console.error("[v0] Chat route error:", error)
    return new Response(
      JSON.stringify({
        error: "Oups, Julien est parti prendre une poutine. Réessaye tantôt!",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
