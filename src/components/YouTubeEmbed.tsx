'use client'

import { useEffect, useRef, useState } from 'react'

interface YouTubeEmbedProps {
  videoId: string
  title: string
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0">
      {isIntersecting ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
          <div className="text-sm text-gray-500">Loading video...</div>
        </div>
      )}
    </div>
  )
}
