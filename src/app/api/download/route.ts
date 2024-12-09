import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

const rateLimit = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT = 7
const TIME_WINDOW = 3600000

const GITHUB_FALLBACK = {
  'Achico.app': 'https://github.com/nuance-dev/achico/releases/latest',
  'Convierto.app': 'https://github.com/nuance-dev/convierto/releases/latest',
  'Figura.app': 'https://github.com/nuance-dev/figura/releases/latest',
  'Vocal.app': 'https://github.com/nuance-dev/vocal/releases/latest',
  'Medio.app': 'https://github.com/nuance-dev/medio/releases/latest',
  'Impulso.app': 'https://github.com/nuance-dev/impulso/releases/latest',
  'Guia.app': 'https://github.com/nuance-dev/guia/releases/latest',
  'Quiebro.app': 'https://github.com/nuance-dev/quiebro/releases/latest',
  'Uno.app': 'https://github.com/nuance-dev/uno/releases/latest',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function GET(request: Request) {
  const headersList = headers()
  const ip = headersList.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const userRateLimit = rateLimit.get(ip)
  const { searchParams } = new URL(request.url)
  const appName = searchParams.get('app')

  if (!appName) {
    return NextResponse.json({ error: 'Missing app name' }, { status: 400 })
  }

  if (userRateLimit) {
    if (now - userRateLimit.timestamp > TIME_WINDOW) {
      rateLimit.set(ip, { count: 1, timestamp: now })
    } else if (userRateLimit.count >= RATE_LIMIT) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          resetIn: Math.ceil(
            (TIME_WINDOW - (now - userRateLimit.timestamp)) / 60000,
          ),
          fallbackUrl: GITHUB_FALLBACK[appName as keyof typeof GITHUB_FALLBACK],
        },
        { status: 429 },
      )
    } else {
      userRateLimit.count++
    }
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now })
  }

  try {
    const { data } = supabase.storage
      .from('app-releases')
      .getPublicUrl(`${appName}.zip`)

    return NextResponse.json({ url: data.publicUrl })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Download failed',
        fallbackUrl: GITHUB_FALLBACK[appName as keyof typeof GITHUB_FALLBACK],
      },
      { status: 500 },
    )
  }
}
