import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function POST(request: Request) {
  const { email, acceptedTnc } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 },
    )
  }

  if (acceptedTnc !== true) {
    return NextResponse.json(
      { error: 'Terms and Conditions must be accepted' },
      { status: 400 },
    )
  }

  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email, accepted_tnc: acceptedTnc }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(
    { message: 'Email submitted successfully' },
    { status: 200 },
  )
}
