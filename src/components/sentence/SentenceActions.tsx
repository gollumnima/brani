'use client'

import { useState } from 'react'

type Props = {
  sentenceId: string
  likeCount: number
  saveCount: number
  isLiked: boolean
  isSaved: boolean
}

export default function SentenceActions({
  sentenceId: _sentenceId,
  likeCount,
  saveCount,
  isLiked,
  isSaved,
}: Props) {
  const [liked, setLiked] = useState(isLiked)
  const [saved, setSaved] = useState(isSaved)
  const [likes, setLikes] = useState(likeCount)
  const [saves, setSaves] = useState(saveCount)

  function handleLike() {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  function handleSave() {
    setSaved(!saved)
    setSaves(saved ? saves - 1 : saves + 1)
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-rose-500"
        aria-label={liked ? '좋아요 취소' : '좋아요'}
      >
        <HeartIcon filled={liked} />
        <span>{likes}</span>
      </button>
      <button
        onClick={handleSave}
        className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-amber-500"
        aria-label={saved ? '저장 취소' : '저장'}
      >
        <BookmarkIcon filled={saved} />
        <span>{saves}</span>
      </button>
    </div>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-rose-500">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return filled ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500">
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  )
}
