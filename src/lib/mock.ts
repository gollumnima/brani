import type { Profile, SentenceWithBook } from '@/types'

export const MOCK_SENTENCES: SentenceWithBook[] = [
  {
    id: '1',
    user_id: 'user-1',
    book_id: 'book-1',
    content: '삶은 슬프지만 나는 춤추는걸 멈추지않지.',
    memo: '춤을 추는 이유',
    tags: ['SF', '철학', '인생'],
    page_number: 72,
    translator: null,
    is_public: true,
    like_count: 42,
    save_count: 18,
    created_at: '2026-05-01T09:00:00Z',
    is_liked: true,
    is_saved: false,
    book: { id: 'book-1', title: '안녕,바나나', author: '김재아', cover_image_url: null },
    profile: { id: 'user-1', username: 'doori', avatar_url: null },
  },
  {
    id: '2',
    user_id: 'user-2',
    book_id: 'book-2',
    content: '우리는 모두 별에서 왔다. 우리 몸을 이루는 원자들은 오래전 폭발한 별의 잔해다.',
    memo: null,
    tags: ['과학', '우주'],
    page_number: 31,
    translator: '박병철',
    is_public: true,
    like_count: 128,
    save_count: 54,
    created_at: '2026-04-20T14:00:00Z',
    is_liked: false,
    is_saved: true,
    book: { id: 'book-2', title: '코스모스', author: '칼 세이건', cover_image_url: null },
    profile: { id: 'user-2', username: 'stargazer', avatar_url: null },
  },
  {
    id: '3',
    user_id: 'user-3',
    book_id: 'book-3',
    content: '당신이 진정으로 무언가를 원한다면, 온 우주가 당신이 그것을 얻도록 도와줄 것이다.',
    memo: '처음 읽었을 때 믿지 않았는데 지금은 믿는다.',
    tags: ['자기계발', '철학'],
    page_number: 187,
    translator: '최정수',
    is_public: true,
    like_count: 201,
    save_count: 89,
    created_at: '2026-04-10T09:00:00Z',
    is_liked: false,
    is_saved: false,
    book: { id: 'book-3', title: '연금술사', author: '파울로 코엘료', cover_image_url: null },
    profile: { id: 'user-3', username: 'reader_k', avatar_url: null },
  },
  {
    id: '4',
    user_id: 'user-1',
    book_id: 'book-4',
    content: '어른이 된다는 건 어쩌면 포기의 연속인지도 모른다. 하지만 그 포기들이 쌓여 진짜 나를 만들어간다.',
    memo: null,
    tags: ['성장', '인생'],
    page_number: 56,
    translator: null,
    is_public: true,
    like_count: 77,
    save_count: 33,
    created_at: '2026-03-28T11:00:00Z',
    is_liked: true,
    is_saved: true,
    book: { id: 'book-4', title: '아무튼, 계속', author: '김하나', cover_image_url: null },
    profile: { id: 'user-1', username: 'doori', avatar_url: null },
  },
]

export const MOCK_MY_PROFILE: Profile = {
  id: 'user-1',
  username: 'doori',
  avatar_url: null,
  bio: '책 속의 문장을 수집하는 사람 📚',
  created_at: '2026-01-01T00:00:00Z',
}

export function getMySentences(): SentenceWithBook[] {
  return MOCK_SENTENCES.filter((s) => s.profile.id === 'user-1')
}

export function getSavedSentences(): SentenceWithBook[] {
  return MOCK_SENTENCES.filter((s) => s.is_saved)
}

export function getMyStats() {
  const mine = getMySentences()
  return {
    sentenceCount: mine.length,
    likeCount: mine.reduce((sum, s) => sum + s.like_count, 0),
    saveCount: mine.reduce((sum, s) => sum + s.save_count, 0),
  }
}

export function searchMockSentences(query: string): SentenceWithBook[] {
  const q = query.toLowerCase()
  return MOCK_SENTENCES.filter(
    (s) =>
      s.content.toLowerCase().includes(q) ||
      s.book.title.toLowerCase().includes(q) ||
      s.book.author.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)),
  )
}
