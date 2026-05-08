import type { BookSearchResult } from '@/types'

const ALADIN_API_URL = 'https://www.aladin.co.kr/ttb/api/ItemSearch.aspx'

export async function searchBooksAladin(query: string): Promise<BookSearchResult[]> {
  const params = new URLSearchParams({
    TTBKey: process.env.ALADIN_API_KEY!,
    Query: query,
    QueryType: 'Keyword',
    MaxResults: '10',
    Output: 'JS',
    Version: '20131101',
    Cover: 'Big',
  })

  const res = await fetch(`${ALADIN_API_URL}?${params}`)
  if (!res.ok) return []

  const data = await res.json()
  if (!data.item) return []

  return data.item.map((item: AladinItem) => ({
    title: item.title,
    author: item.author.replace(/\s*\(지은이\)/, '').trim(),
    publisher: item.publisher,
    cover_image_url: item.cover,
    isbn: item.isbn13 || item.isbn,
    source: 'aladin' as const,
  }))
}

export async function searchBooksKakao(query: string): Promise<BookSearchResult[]> {
  const res = await fetch(
    `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}&size=10`,
    { headers: { Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}` } }
  )
  if (!res.ok) return []

  const data = await res.json()
  return data.documents.map((item: KakaoBook) => ({
    title: item.title,
    author: item.authors.join(', '),
    publisher: item.publisher,
    cover_image_url: item.thumbnail,
    isbn: item.isbn.split(' ')[1] || item.isbn.split(' ')[0],
    source: 'kakao' as const,
  }))
}

// 알라딘 우선, 결과 없으면 카카오 fallback
export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  const results = await searchBooksAladin(query)
  if (results.length > 0) return results
  return searchBooksKakao(query)
}

type AladinItem = {
  title: string
  author: string
  publisher: string
  cover: string
  isbn: string
  isbn13: string
}

type KakaoBook = {
  title: string
  authors: string[]
  publisher: string
  thumbnail: string
  isbn: string
}
