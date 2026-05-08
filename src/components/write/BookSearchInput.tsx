'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { BookSearchResult } from '@/types'

type Props = {
  selectedBook: BookSearchResult | null
  onSelect: (book: BookSearchResult) => void
  onClear: () => void
}

export default function BookSearchInput({ selectedBook, onSelect, onClear }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BookSearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([] as BookSearchResult[])
        setIsOpen(false)
        return
      }
      setIsLoading(true)
      try {
        const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`)
        setResults((await res.json()) as BookSearchResult[])
        setIsOpen(true)
      } finally {
        setIsLoading(false)
      }
    }, query.trim() ? 400 : 0)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (selectedBook) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3">
        {selectedBook.cover_image_url ? (
          <Image
            src={selectedBook.cover_image_url}
            alt={selectedBook.title}
            width={32}
            height={46}
            className="shrink-0 rounded object-cover shadow-sm"
          />
        ) : (
          <div className="h-[46px] w-[32px] shrink-0 rounded bg-zinc-200" />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-medium text-zinc-800">{selectedBook.title}</span>
          <span className="truncate text-xs text-zinc-500">{selectedBook.author} · {selectedBook.publisher}</span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-full px-2.5 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-200 hover:text-zinc-600"
        >
          변경
        </button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="책 제목이나 저자로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl bg-zinc-50 px-4 py-3 pr-10 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200"
        />
        {isLoading ? (
          <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" />
        ) : (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        )}
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1.5 max-h-72 w-full overflow-y-auto rounded-xl bg-white shadow-lg ring-1 ring-zinc-100">
          {results.length > 0 ? results.map((book, i) => (
            <li key={`${book.isbn}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  onSelect(book)
                  setQuery('')
                  setIsOpen(false)
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-zinc-50"
              >
                {book.cover_image_url ? (
                  <Image
                    src={book.cover_image_url}
                    alt={book.title}
                    width={28}
                    height={40}
                    className="shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="h-10 w-7 shrink-0 rounded bg-zinc-200" />
                )}
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-zinc-800">{book.title}</span>
                  <span className="truncate text-xs text-zinc-500">{book.author} · {book.publisher}</span>
                </div>
              </button>
            </li>
          )) : (
            <li className="px-4 py-3 text-sm text-zinc-400">검색 결과가 없습니다</li>
          )}
        </ul>
      )}
    </div>
  )
}
