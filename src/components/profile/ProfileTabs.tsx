'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Props = {
  myCount: number
  savedCount: number
}

export default function ProfileTabs({ myCount, savedCount }: Props) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? 'sentences'

  return (
    <div className="flex border-b border-zinc-100">
      <TabLink href="/profile" active={tab === 'sentences'}>
        문장 <span className="ml-1 text-zinc-400">{myCount}</span>
      </TabLink>
      <TabLink href="/profile?tab=saved" active={tab === 'saved'}>
        저장 <span className="ml-1 text-zinc-400">{savedCount}</span>
      </TabLink>
    </div>
  )
}

function TabLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`relative flex flex-1 items-center justify-center py-3 text-sm font-medium transition-colors ${
        active ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-zinc-800" />
      )}
    </Link>
  )
}
