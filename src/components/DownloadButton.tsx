'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { DownloadModal } from '@/components/DownloadModal'
import { motion, AnimatePresence } from 'framer-motion'

interface DownloadButtonProps {
  appName: string
  children: React.ReactNode
}

export function DownloadButton({ appName, children }: DownloadButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'rateLimit'>('success')
  const [isLoading, setIsLoading] = useState(false)
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    resetIn: number
    fallbackUrl: string
  } | null>(null)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      console.log('Initiating download...')
      const response = await fetch(`/api/download?app=${appName}`)
      const data = await response.json()
      console.log('Download response:', data)

      if (response.status === 429) {
        setRateLimitInfo({
          resetIn: data.resetIn,
          fallbackUrl: data.fallbackUrl,
        })
        setModalType('rateLimit')
        setShowModal(true)
        console.log('Rate limit reached, showing modal')
        return
      }

      setModalType('success')
      setShowModal(true)
      console.log('Success, showing modal')

      setTimeout(() => {
        window.location.href = data.url
      }, 100)
    } catch (error) {
      console.error('Download error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={handleDownload}
        className="relative overflow-hidden"
        disabled={isLoading}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/5"
            >
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white/100" />
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <DownloadModal
        type={modalType}
        appName={appName}
        isOpen={showModal}
        onClose={() => {
          console.log('Modal closing')
          setShowModal(false)
        }}
        rateLimitInfo={rateLimitInfo || undefined}
      />
    </>
  )
}
