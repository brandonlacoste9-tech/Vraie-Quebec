// Data access layer for AI generations
// Handles saving and retrieving image generation history

import { createClient } from '@/lib/supabase'

export interface AIGeneration {
  id: string
  user_id: string | null
  user_email: string | null
  prompt: string
  image_url: string
  mode: 'text-to-image' | 'image-editing'
  aspect_ratio: string | null
  description: string | null
  strength: number | null
  created_at: string
  updated_at: string
}

export interface CreateAIGenerationInput {
  user_id?: string | null
  user_email?: string | null
  prompt: string
  image_url: string
  mode: 'text-to-image' | 'image-editing'
  aspect_ratio?: string | null
  description?: string | null
  strength?: number | null
}

/**
 * Save a generation to the database
 */
export async function saveGeneration(input: CreateAIGenerationInput): Promise<AIGeneration | null> {
  const supabase = createClient()
  
  if (!supabase) {
    console.warn('[AI Generations] Supabase client not available')
    return null
  }

  const { data, error } = await supabase
    .from('ai_generations')
    .insert({
      user_id: input.user_id || null,
      user_email: input.user_email || null,
      prompt: input.prompt,
      image_url: input.image_url,
      mode: input.mode,
      aspect_ratio: input.aspect_ratio || null,
      description: input.description || null,
      strength: input.strength || null,
    })
    .select()
    .single()

  if (error) {
    console.error('[AI Generations] Error saving generation:', error)
    return null
  }

  return data as AIGeneration
}

/**
 * Get user's generation history
 */
export async function getUserGenerations(
  userEmail: string,
  limit: number = 50,
  offset: number = 0
): Promise<AIGeneration[]> {
  const supabase = createClient()
  
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('ai_generations')
    .select('*')
    .eq('user_email', userEmail)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('[AI Generations] Error fetching user generations:', error)
    return []
  }

  return (data as AIGeneration[]) || []
}

/**
 * Get a single generation by ID
 */
export async function getGenerationById(id: string): Promise<AIGeneration | null> {
  const supabase = createClient()
  
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('ai_generations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('[AI Generations] Error fetching generation:', error)
    return null
  }

  return data as AIGeneration
}

/**
 * Delete a generation
 */
export async function deleteGeneration(id: string): Promise<boolean> {
  const supabase = createClient()
  
  if (!supabase) {
    return false
  }

  const { error } = await supabase
    .from('ai_generations')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[AI Generations] Error deleting generation:', error)
    return false
  }

  return true
}

/**
 * Get generation count for a user
 */
export async function getUserGenerationCount(userEmail: string): Promise<number> {
  const supabase = createClient()
  
  if (!supabase) {
    return 0
  }

  const { count, error } = await supabase
    .from('ai_generations')
    .select('*', { count: 'exact', head: true })
    .eq('user_email', userEmail)

  if (error) {
    console.error('[AI Generations] Error counting generations:', error)
    return 0
  }

  return count || 0
}



