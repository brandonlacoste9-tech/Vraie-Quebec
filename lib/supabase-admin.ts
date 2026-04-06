import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/** Server-only client for webhooks / admin updates. Requires SUPABASE_SERVICE_ROLE_KEY. */
export function createServiceRoleClient(): SupabaseClient<any> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.Project_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient<any>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
