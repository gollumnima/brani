'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import BookSearchInput from './BookSearchInput'
import TagInput from './TagInput'
import { createSentence } from '@/app/write/actions'
import type { BookSearchResult } from '@/types'

export default function WriteForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [book, setBook] = useState<BookSearchResult | null>(null)
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [memo, setMemo] = useState('')
  const [pageNumber, setPageNumber] = useState('')
  const [translator, setTranslator] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  const isValid = !!book && content.trim().length > 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || !book) return

    startTransition(async () => {
      await createSentence({ book, content, tags, memo, pageNumber, translator, isPublic })
      router.push('/')
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-4 pb-10 sm:px-0">
      {/* 책 */}
      <section className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">책</label>
        <BookSearchInput
          selectedBook={book}
          onSelect={setBook}
          onClear={() => setBook(null)}
        />
      </section>

      {/* 문장 */}
      <section className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">문장</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="기억하고 싶은 문장을 입력하세요"
          rows={5}
          className="w-full resize-none rounded-xl bg-zinc-50 px-4 py-3 text-sm leading-7 text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
        />
      </section>

      {/* 추가 정보 */}
      <section className="flex flex-col gap-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">추가 정보</span>

        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-xs text-zinc-500">페이지</label>
            <input
              type="number"
              min={1}
              value={pageNumber}
              onChange={(e) => setPageNumber(e.target.value)}
              placeholder="143"
              className="w-full rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <label className="text-xs text-zinc-500">역자</label>
            <input
              type="text"
              value={translator}
              onChange={(e) => setTranslator(e.target.value)}
              placeholder="이나경"
              className="w-full rounded-xl bg-zinc-50 px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500">태그</label>
          <TagInput tags={tags} onChange={setTags} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500">메모</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="이 문장에 대한 생각을 남겨보세요"
            rows={3}
            className="w-full resize-none rounded-xl bg-zinc-50 px-4 py-3 text-sm leading-6 text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        {/* 공개 여부 */}
        <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm text-zinc-700">공개</span>
            <span className="text-xs text-zinc-400">다른 사람들도 이 문장을 볼 수 있어요</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isPublic ? 'true' : 'false'}
            onClick={() => setIsPublic(!isPublic)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${isPublic ? 'bg-zinc-800' : 'bg-zinc-300'}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${isPublic ? 'left-[22px]' : 'left-0.5'}`}
            />
          </button>
        </div>
      </section>

      {/* 제출 */}
      <button
        type="submit"
        disabled={!isValid || isPending}
        className="w-full rounded-xl bg-zinc-800 py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
      >
        {isPending ? '저장 중…' : '문장 저장하기'}
      </button>
    </form>
  )
}
