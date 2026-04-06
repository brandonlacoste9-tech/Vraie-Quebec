import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

/** Schema not fully generated — permissive typing so `.from()` / `.insert()` accept app tables */
let supabaseInstance: SupabaseClient<any> | null = null

export function createClient() {
  // Return existing instance if available (singleton pattern)
  if (supabaseInstance) {
    return supabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.Project_URL

  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Supabase not configured — app will use local fallback data
    return null
  }

  try {
    supabaseInstance = createSupabaseClient<any>(supabaseUrl, supabaseKey, {
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
