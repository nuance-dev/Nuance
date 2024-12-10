import Image from 'next/image'
import { Button } from '@/components/Button'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

// Import all app logos
import AchicoLogo from '@/images/achico-logo.png'
import ConviertoLogo from '@/images/convierto-logo.png'
import FiguraLogo from '@/images/figura-logo.png'
import VocalLogo from '@/images/vocal-logo.png'
import MedioLogo from '@/images/medio-logo.png'
import ImpulsoLogo from '@/images/impulso-logo.png'
import GuiaLogo from '@/images/guia-logo.png'
import QuiebroLogo from '@/images/quiebro-logo.png'
import UnoLogo from '@/images/uno-logo.png'

// Map app names to their logos
const APP_LOGOS: { [key: string]: any } = {
  Achico: AchicoLogo,
  Convierto: ConviertoLogo,
  Figura: FiguraLogo,
  Vocal: VocalLogo,
  Medio: MedioLogo,
  Impulso: ImpulsoLogo,
  Guia: GuiaLogo,
  Quiebro: QuiebroLogo,
  Uno: UnoLogo,
}

interface DownloadModalProps {
  type: 'success' | 'rateLimit'
  appName: string
  isOpen: boolean
  onClose: () => void
  rateLimitInfo?: {
    resetIn: number
    fallbackUrl: string
  }
}

export function DownloadModal({
  type,
  appName,
  isOpen,
  onClose,
  rateLimitInfo,
}: DownloadModalProps) {
  const appDisplayName = appName.replace('.app', '')
  const [imageError, setImageError] = useState(false)

  const getAppIconFallback = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const appLogo = APP_LOGOS[appDisplayName]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        <DialogContent
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-md -translate-x-[50%] -translate-y-[50%] space-y-6 rounded-xl border border-white/10 bg-gray-950/95 p-6 shadow-2xl backdrop-blur"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {type === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <DialogHeader className="space-y-4">
                    <motion.div
                      className="relative mx-auto"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <div className="relative mx-auto mt-[-10px] h-24 w-24">
                        {!imageError && appLogo ? (
                          <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                            <Image
                              src={appLogo}
                              alt={`${appDisplayName} icon`}
                              fill
                              className="object-cover"
                              priority
                              onError={() => setImageError(true)}
                            />
                            <motion.div
                              className="absolute inset-6 bg-gradient-to-r from-white/20 via-white/0 to-white/0"
                              animate={{
                                x: ['0%', '100%'],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                                ease: 'linear',
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 text-2xl font-semibold text-white">
                            {getAppIconFallback(appDisplayName)}
                          </div>
                        )}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 20,
                            delay: 0.2,
                          }}
                          className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 p-2 shadow-lg"
                        >
                          <motion.svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-4 w-4 text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                              stroke="currentColor"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            />
                          </motion.svg>
                        </motion.div>
                      </div>
                    </motion.div>
                    <div className="space-y-2 text-center">
                      <DialogTitle className="text-lg font-medium tracking-tight text-white">
                        {appDisplayName} is on its way ✨
                      </DialogTitle>
                      <DialogDescription asChild>
                        <div className="space-y-6">
                          <p className="text-sm text-gray-400">
                            {appDisplayName} is about to be downloaded. If you
                            enjoy using it, consider fueling future innovations.
                          </p>
                          <div className="flex justify-center gap-3">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              whileHover={{ y: -2 }}
                              className="flex-1"
                            >
                              <Button
                                href="https://buymeacoffee.com/nuanced"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex h-10 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-sky-400/10 to-sky-500/10 px-4 text-sm text-white/80 transition-all hover:from-sky-400/20 hover:to-sky-500/20 hover:text-white"
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-sky-400/10 to-sky-400/0"
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '100%' }}
                                  transition={{
                                    duration: 0.75,
                                    ease: 'easeInOut',
                                  }}
                                />
                                Support
                              </Button>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                              whileHover={{ y: -2 }}
                              className="flex-1"
                            >
                              <Button
                                onClick={() => {
                                  onClose()
                                  setTimeout(() => {
                                    window.location.href = '/'
                                  }, 300)
                                }}
                                className="group relative flex h-10 w-full items-center justify-center overflow-hidden rounded-lg bg-white/5 px-4 text-sm text-white/80 transition-all hover:bg-white/10 hover:text-white"
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '100%' }}
                                  transition={{
                                    duration: 0.75,
                                    ease: 'easeInOut',
                                  }}
                                />
                                Explore More
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </DialogDescription>
                    </div>
                  </DialogHeader>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DialogHeader className="space-y-4">
                    <DialogTitle className="text-xl font-medium tracking-tight text-white">
                      Download Limit Reached
                    </DialogTitle>
                    <DialogDescription asChild>
                      <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur">
                          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent" />
                          <div className="relative space-y-2">
                            <div className="text-sm text-gray-300">
                              You have reached the hourly download limit. You
                              can:
                            </div>
                            <ul className="list-disc space-y-2 pl-4 text-sm text-gray-400">
                              <li>
                                Wait {rateLimitInfo?.resetIn} minutes for the
                                limit to reset
                              </li>
                              <li>
                                <a
                                  href={rateLimitInfo?.fallbackUrl}
                                  className="inline-flex items-center gap-1 text-sky-400 transition-colors hover:text-sky-300"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Download directly from GitHub
                                  <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                  </svg>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
