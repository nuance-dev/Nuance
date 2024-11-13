import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
)

export default async function handler(
  req: { method: string; body: { title: any; description: any; email: any } },
  res: {
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: { error?: any; message?: string }): any; new (): any }
    }
  },
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { title, description, email } = req.body

  try {
    const { data, error } = await supabase
      .from('app_ideas')
      .insert([{ title, description, email }])

    if (error) throw error

    return res.status(200).json({ message: 'App idea submitted successfully!' })
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message })
  }
}
