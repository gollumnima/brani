import Image from 'next/image'
import type { SentenceWithBook } from '@/types'
import SentenceActions from './SentenceActions'

type Props = {
  sentence: SentenceWithBook
}

export default function SentenceCard({ sentence }: Props) {
  const {
    id,
    content,
    book,
    profile,
    tags,
    page_number,
    translator,
    memo,
    like_count,
    save_count,
    is_liked,
    is_saved,
  } = sentence

  return (
    <article className="flex flex-col gap-3 bg-white p-4 shadow-sm ring-1 ring-zinc-100 sm:gap-4 sm:rounded-2xl sm:p-6">
      {/* Sentence content */}
      <blockquote className="text-base leading-7 text-zinc-800 sm:text-[1.05rem] sm:leading-8">
        <span className="text-zinc-400">&ldquo;</span>
        {content}
        <span className="text-zinc-400">&rdquo;</span>
      </blockquote>

      {/* Book info */}
      <div className="flex items-center gap-3">
        {book.cover_image_url ? (
          <Image
            src={book.cover_image_url}
            alt={book.title}
            width={32}
            height={46}
            className="rounded object-cover shadow-sm sm:h-[52px] sm:w-[36px]"
          />
        ) : (
          <div className="h-[46px] w-[32px] shrink-0 rounded bg-zinc-100 sm:h-[52px] sm:w-[36px]" />
        )}
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-medium text-zinc-800">{book.title}</span>
          <span className="truncate text-xs text-zinc-500">
            {book.author}
            {translator && ` · 역 ${translator}`}
          </span>
          {page_number && (
            <span className="text-xs text-zinc-400">p.{page_number}</span>
          )}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Memo */}
      {memo && (
        <p className="rounded-lg bg-zinc-50 px-3 py-2.5 text-sm leading-6 text-zinc-600 sm:px-4 sm:py-3">
          {memo}
        </p>
      )}

      {/* Footer: profile + actions */}
      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center gap-2">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.username}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="h-6 w-6 shrink-0 rounded-full bg-zinc-200" />
          )}
          <span className="text-xs text-zinc-500">{profile.username}</span>
        </div>
        <SentenceActions
          sentenceId={id}
          likeCount={like_count}
          saveCount={save_count}
          isLiked={is_liked ?? false}
          isSaved={is_saved ?? false}
        />
      </div>
    </article>
  )
}
