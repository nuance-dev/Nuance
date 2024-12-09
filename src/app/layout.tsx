import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
  weight: '200 900',
})

export const metadata: Metadata = {
  title: 'Nuanced - An Alphabet of Free macOS mini-apps',
  description:
    'I am in the process of building 26 macOS open-source apps, one for each letter of the alphabet. To improve workflows and to have a bit of fun',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    title: 'Nuanced - An Alphabet of Free macOS mini-apps',
    description:
      'I am in the process of building 26 macOS open-source apps, one for each letter of the alphabet. To improve workflows and to have a bit of fun',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Nuanced',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Nuanced - An Alphabet of Free macOS mini-apps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuanced - An Alphabet of Free macOS mini-apps',
    description:
      'I am in the process of building 26 macOS open-source apps, one for each letter of the alphabet. To improve workflows and to have a bit of fun',
    creator: '@Nuancedev',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://nuanced.dev',
  ),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, monaSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white dark:bg-gray-950">
        <Providers>{children}</Providers>
      </body>
      <SpeedInsights />
      <Analytics />
    </html>
  )
}
