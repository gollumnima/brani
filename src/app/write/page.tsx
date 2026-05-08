import Link from 'next/link'
import WriteForm from '@/components/write/WriteForm'

export default function WritePage() {
  return (
    <div className="mx-auto w-full max-w-xl">
      <header className="flex items-center gap-3 px-4 py-4 sm:px-0 sm:pt-10">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="뒤로가기"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </Link>
        <h1 className="text-base font-semibold text-zinc-800">문장 기록하기</h1>
      </header>
      <WriteForm />
    </div>
  )
}
