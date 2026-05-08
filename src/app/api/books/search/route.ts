import { searchBooks } from '@/lib/books'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q) return Response.json([])

  const results = await searchBooks(q)
  return Response.json(results)
}
