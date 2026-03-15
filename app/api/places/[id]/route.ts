import { getPlaceById } from '@/lib/data/places'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const place = await getPlaceById(params.id)
    
    if (!place) {
      return new Response(
        JSON.stringify({ error: 'Place not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    return new Response(
      JSON.stringify(place),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('[Places API] Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
