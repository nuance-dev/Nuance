'use client'

import React, { useState } from 'react'
import { Button } from '@/components/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const SuggestionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
  })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/submit-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('App idea submitted successfully!')
        setMessageType('success')
        setFormData({ title: '', description: '', email: '' })
        setTimeout(() => setIsOpen(false), 2000)
      } else {
        setMessage(data.error || 'Something went wrong')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('Unable to connect. Please try again.')
      setMessageType('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button">Request an App</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Request an App
          </DialogTitle>
          <DialogDescription>
            Tell me the app you need and I&apos;ll consider building!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="App Title"
              required
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 placeholder:text-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
            />
          </div>
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your app idea..."
              required
              className="h-32 w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 placeholder:text-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-900 placeholder:text-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
            />
          </div>
          {message && (
            <p
              className={`text-sm ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}
            >
              {message}
            </p>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="rounded-lg bg-sky-300 px-4 py-2 font-medium text-gray-900 hover:bg-sky-200 dark:bg-sky-400 dark:hover:bg-sky-300"
            >
              Submit Idea
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SuggestionForm
