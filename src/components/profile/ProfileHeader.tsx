import Image from 'next/image'
import type { Profile } from '@/types'

type Props = {
  profile: Profile
  sentenceCount: number
  likeCount: number
  saveCount: number
}

export default function ProfileHeader({ profile, sentenceCount, likeCount, saveCount }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-8 sm:px-0">
      {profile.avatar_url ? (
        <Image
          src={profile.avatar_url}
          alt={profile.username}
          width={72}
          height={72}
          className="rounded-full"
        />
      ) : (
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-zinc-200 text-2xl font-semibold text-zinc-500">
          {profile.username[0].toUpperCase()}
        </div>
      )}

      <div className="flex flex-col items-center gap-1">
        <span className="text-lg font-semibold text-zinc-900">{profile.username}</span>
        {profile.bio && (
          <p className="text-sm text-zinc-500">{profile.bio}</p>
        )}
      </div>

      <div className="flex w-full max-w-xs justify-around rounded-2xl bg-zinc-50 py-4">
        <Stat label="문장" value={sentenceCount} />
        <div className="w-px bg-zinc-200" />
        <Stat label="받은 좋아요" value={likeCount} />
        <div className="w-px bg-zinc-200" />
        <Stat label="저장됨" value={saveCount} />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-base font-semibold text-zinc-800">{value}</span>
      <span className="text-[11px] text-zinc-400">{label}</span>
    </div>
  )
}
