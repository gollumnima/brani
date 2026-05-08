import SentenceCard from '@/components/sentence/SentenceCard'
import type { SentenceWithBook } from '@/types'

const mockSentence: SentenceWithBook = {
  id: '1',
  user_id: 'user-1',
  book_id: 'book-1',
  content: '삶은 슬프지만 나는 춤추는걸 멈추지않지.',
  memo: '춤을 추는 이유',
  tags: ['SF', '철학', '인생'],
  page_number: 72,
  translator: '',
  is_public: true,
  like_count: 42,
  save_count: 18,
  created_at: '2026-05-01T09:00:00Z',
  is_liked: true,
  is_saved: false,
  book: {
    id: 'book-1',
    title: '안녕,바나나',
    author: '김재아',
    cover_image_url: null,
  },
  profile: {
    id: 'user-1',
    username: 'doori',
    avatar_url: null,
  },
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-0 py-4 sm:px-4 sm:py-16">
      <SentenceCard sentence={mockSentence} />
    </main>
  )
}
