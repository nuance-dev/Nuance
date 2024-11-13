'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/Button'
import Terms from '@/components/Terms'

export function SignUpForm() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [acceptedTnc, setAcceptedTnc] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (!acceptedTnc) {
      setMessage('You must accept the Terms and Conditions.')
      setMessageType('error')
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, acceptedTnc }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setMessageType('success')
        setEmail('')
        setAcceptedTnc(false)
      } else {
        if (
          data.error?.includes('duplicate key value') ||
          data.error?.includes('subscribers_email_key')
        ) {
          setMessage('This email is already signed up.')
        } else {
          setMessage(data.error || 'Something went wrong')
        }
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Unable to connect. Please try again.')
      setMessageType('error')
    }
  }

  return (
    <div className="mt-8">
      <form
        className="relative isolate flex items-center pr-1"
        onSubmit={handleSubmit}
      >
        <div className="relative flex-auto">
          <label htmlFor={id} className="sr-only">
            Email address
          </label>
          <input
            required
            type="email"
            autoComplete="email"
            name="email"
            id={id}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="peer w-full rounded-lg bg-[#00000000] px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
          />
          {/* Overlay to hide Safari autofill */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full bg-black/50"
            aria-hidden="true"
          />
        </div>
        <Button type="submit" arrow>
          Get updates
        </Button>
        <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
        <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
      </form>

      <div className="mt-4 flex items-center space-x-2">
        <input
          type="checkbox"
          id="tnc"
          checked={acceptedTnc}
          onChange={(e) => setAcceptedTnc(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-sky-300"
        />
        <label htmlFor="tnc" className="text-sm text-gray-500">
          I accept the <Terms />
        </label>
      </div>

      {message && (
        <p
          className={`mt-2 text-sm ${
            messageType === 'success' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
