'use client'

import { useEffect, useState } from 'react'
import { IconLink } from '@/components/IconLink'
import { GitHubIcon } from '@/components/GitHubIcon'
import { BookIcon } from '@/components/BookIcon'

function BackToTopButton() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-4 z-50 rounded-full bg-sky-500/10 p-2 text-sky-400 shadow-lg transition-all duration-300 hover:bg-sky-500/20 lg:bottom-8 ${
        showButton ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Back to top"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}

export function MobileFooter() {
  return (
    <>
      <BackToTopButton />
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-gray-950/80 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-center gap-4">
          <IconLink
            href="https://github.com/nuance-dev"
            icon={GitHubIcon}
            className="flex-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </IconLink>
          <IconLink
            href="https://buymeacoffee.com/nuanced"
            icon={BookIcon}
            className="flex-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy me a coffee
          </IconLink>
        </div>
      </div>
    </>
  )
}
