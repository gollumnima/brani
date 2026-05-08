import { Suspense } from 'react'
import SearchBar from '@/components/search/SearchBar'
import SentenceCard from '@/components/sentence/SentenceCard'
import { searchMockSentences } from '@/lib/mock'

type Props = {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const results = q ? searchMockSentences(q) : []

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* 검색바 */}
      <div className="sticky top-0 z-10 bg-white/80 px-4 py-3 backdrop-blur-sm sm:px-0">
        <Suspense fallback={<SearchBarFallback />}>
          <SearchBar />
        </Suspense>
      </div>

      {/* 결과 */}
      <div className="px-0 pb-24 sm:px-0">
        {!q ? (
          <EmptyQuery />
        ) : results.length === 0 ? (
          <NoResults query={q} />
        ) : (
          <ul className="flex flex-col gap-3 px-0 pt-2">
            {results.map((sentence) => (
              <li key={sentence.id}>
                <SentenceCard sentence={sentence} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function SearchBarFallback() {
  return (
    <div className="h-11 w-full animate-pulse rounded-2xl bg-zinc-100" />
  )
}

function EmptyQuery() {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-20 text-center">
      <span className="text-3xl">🔍</span>
      <p className="text-sm text-zinc-500">문장, 책 제목, 작가, 태그로 검색해보세요</p>
    </div>
  )
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-20 text-center">
      <span className="text-3xl">📭</span>
      <p className="text-sm font-medium text-zinc-700">
        &ldquo;{query}&rdquo; 검색 결과가 없습니다
      </p>
      <p className="text-xs text-zinc-400">다른 키워드로 검색해 보세요</p>
    </div>
  )
}
