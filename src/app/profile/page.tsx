import { Suspense } from 'react'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileTabs from '@/components/profile/ProfileTabs'
import SentenceCard from '@/components/sentence/SentenceCard'
import { MOCK_MY_PROFILE, getMySentences, getSavedSentences, getMyStats } from '@/lib/mock'

type Props = {
  searchParams: Promise<{ tab?: string }>
}

export default async function ProfilePage({ searchParams }: Props) {
  const { tab } = await searchParams
  const activeTab = tab === 'saved' ? 'saved' : 'sentences'

  const profile = MOCK_MY_PROFILE
  const stats = getMyStats()
  const mySentences = getMySentences()
  const savedSentences = getSavedSentences()
  const sentences = activeTab === 'saved' ? savedSentences : mySentences

  return (
    <div className="mx-auto w-full max-w-xl">
      <ProfileHeader
        profile={profile}
        sentenceCount={stats.sentenceCount}
        likeCount={stats.likeCount}
        saveCount={stats.saveCount}
      />

      <Suspense fallback={<TabsFallback />}>
        <ProfileTabs myCount={mySentences.length} savedCount={savedSentences.length} />
      </Suspense>

      <ul className="flex flex-col gap-3 pb-24 pt-3">
        {sentences.length > 0 ? (
          sentences.map((sentence) => (
            <li key={sentence.id}>
              <SentenceCard sentence={sentence} />
            </li>
          ))
        ) : (
          <li className="flex flex-col items-center gap-2 py-20 text-center">
            <span className="text-3xl">📝</span>
            <p className="text-sm text-zinc-500">
              {activeTab === 'saved' ? '저장한 문장이 없습니다' : '아직 기록한 문장이 없습니다'}
            </p>
          </li>
        )}
      </ul>
    </div>
  )
}

function TabsFallback() {
  return <div className="flex h-11 border-b border-zinc-100" />
}
