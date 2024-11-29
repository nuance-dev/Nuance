'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DownloadButtonProps {
  appName: string
  children: React.ReactNode
}

export function DownloadButton({ appName, children }: DownloadButtonProps) {
  const [showRateLimitDialog, setShowRateLimitDialog] = useState(false)
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    resetIn: number
    fallbackUrl: string
  } | null>(null)

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/download?app=${appName}`)
      const data = await response.json()

      if (response.status === 429) {
        setRateLimitInfo({
          resetIn: data.resetIn,
          fallbackUrl: data.fallbackUrl,
        })
        setShowRateLimitDialog(true)
        return
      }

      window.location.href = data.url
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  return (
    <>
      <Button onClick={handleDownload}>{children}</Button>

      <Dialog open={showRateLimitDialog} onOpenChange={setShowRateLimitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Limit Reached</DialogTitle>
            <DialogDescription>
              You have reached the hourly download limit. You can:
              <ul className="mt-2 list-disc pl-4">
                <li>
                  Wait {rateLimitInfo?.resetIn} minutes for the limit to reset
                </li>
                <li>
                  <a
                    href={rateLimitInfo?.fallbackUrl}
                    className="text-sky-400 hover:text-sky-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download directly from GitHub →
                  </a>
                </li>
              </ul>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
