// ===== DB 타입 (Supabase 테이블 구조 반영) =====

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      books: {
        Row: Book
        Insert: Omit<Book, 'id' | 'created_at'>
        Update: Partial<Omit<Book, 'id' | 'created_at'>>
      }
      sentences: {
        Row: Sentence
        Insert: Omit<Sentence, 'id' | 'created_at' | 'like_count' | 'save_count'>
        Update: Partial<Omit<Sentence, 'id' | 'created_at'>>
      }
      sentence_likes: {
        Row: SentenceLike
        Insert: SentenceLike
        Update: never
      }
      sentence_saves: {
        Row: SentenceSave
        Insert: SentenceSave
        Update: never
      }
    }
  }
}

// ===== 도메인 타입 =====

export type Profile = {
  id: string           // auth.users.id
  username: string
  avatar_url: string | null
  bio: string | null
  created_at: string
}

export type Book = {
  id: string
  title: string
  author: string
  publisher: string | null
  cover_image_url: string | null
  isbn: string | null
  aladin_item_id: string | null
  sentence_count: number
  created_at: string
}

export type Sentence = {
  id: string
  user_id: string
  book_id: string
  content: string
  memo: string | null
  tags: string[]
  page_number: number | null
  translator: string | null
  is_public: boolean
  like_count: number
  save_count: number
  created_at: string
}

export type SentenceLike = {
  user_id: string
  sentence_id: string
  created_at: string
}

export type SentenceSave = {
  user_id: string
  sentence_id: string
  created_at: string
}

// ===== View / Join 타입 =====

export type SentenceWithBook = Sentence & {
  book: Pick<Book, 'id' | 'title' | 'author' | 'cover_image_url'>
  profile: Pick<Profile, 'id' | 'username' | 'avatar_url'>
  is_liked?: boolean
  is_saved?: boolean
}

export type BookWithSentences = Book & {
  sentences: SentenceWithBook[]
}

// ===== 책 검색 API 응답 타입 =====

export type BookSearchResult = {
  title: string
  author: string
  publisher: string
  cover_image_url: string
  isbn: string
  source: 'aladin' | 'kakao'
}
