'use server'

import type { BookSearchResult } from '@/types'

export type CreateSentenceInput = {
  book: BookSearchResult
  content: string
  tags: string[]
  memo: string
  pageNumber: string
  translator: string
  isPublic: boolean
}

export async function createSentence(_input: CreateSentenceInput) {
  // TODO: auth 확인 후 Supabase insert
}
