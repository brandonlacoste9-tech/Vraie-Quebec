import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { createOpenAI } from "@ai-sdk/openai"
import { checkUsageLimit, incrementUsage } from "@/lib/subscription"

export const maxDuration = 30

const openai = createOpenAI({
  baseURL: "https://ai-gateway.vercel.sh/v1/openai",
  apiKey: process.env.AI_GATEWAY_API_KEY || "",
})

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const userEmail = req.headers.get("x-user-email") || "guest@example.com"

    const { allowed, reason, subscription } = await checkUsageLimit(userEmail, "message")

    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: reason,
          upgradeUrl: "https://buy.stripe.com/test_6oU4gAfx18Ye11Xapw1kA00",
          subscription,
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const prompt = convertToModelMessages(messages)

    const result = streamText({
      model: openai("gpt-4o"),
      system: `
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
      `,
      prompt,
    })

    incrementUsage(userEmail, "message").catch((err) => console.error("[v0] Failed to increment usage:", err))

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Chat route error:", error)
    return new Response(
      JSON.stringify({
        error: "Oups, Julien est parti prendre une poutine. Réessaye tantôt!",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
