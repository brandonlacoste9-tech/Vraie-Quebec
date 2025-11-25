import { createClient as createSupabaseClient } from "@supabase/supabase-js"

let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  // Return existing instance if available (singleton pattern)
  if (supabaseInstance) {
    return supabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.Project_URL

  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn("[v0] Supabase client not available - missing environment variables")
    console.warn("[v0] Checked: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_URL, Project_URL")
    console.warn("[v0] Checked: NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_ANON_KEY")
    return null
  }

  try {
    supabaseInstance = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    })
    return supabaseInstance
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    return null
  }
}
