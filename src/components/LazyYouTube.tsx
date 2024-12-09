'use client'

import dynamic from 'next/dynamic'

const YouTubeEmbed = dynamic(() => import('./YouTubeEmbed'), {
  loading: () => (
    <div className="aspect-video w-full animate-pulse bg-gray-200 dark:bg-gray-800" />
  ),
  ssr: false,
})

interface LazyYouTubeProps {
  videoId: string
  title: string
}

export function LazyYouTube({ videoId, title }: LazyYouTubeProps) {
  return <YouTubeEmbed videoId={videoId} title={title} />
}
