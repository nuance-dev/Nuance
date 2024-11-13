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

const Terms = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="m-0 inline-block border-none bg-transparent p-0 text-blue-500 underline hover:text-blue-400">
          Terms and Conditions
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Terms of Use
          </DialogTitle>
          <DialogDescription>Last updated: November 13, 2024</DialogDescription>
        </DialogHeader>
        <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-6 text-sm text-gray-300">
          <section className="space-y-2">
            <h3 className="font-medium text-white">Overview</h3>
            <p>
              These Terms of Use govern your use of all applications developed
              by Nuance ("we", "us", or "our"), including Achico, Medio, Figura,
              and Vocal (collectively, the "Apps").
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-medium text-white">Free and Open Source</h3>
            <p>
              Apps are provided free of charge and are open source under the MIT
              License. You can find the source code for each app on our GitHub
              repositories.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-medium text-white">Use of Applications</h3>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                The Apps are designed for macOS and require specific versions as
                indicated in each app's documentation
              </li>
              <li>We provide the Apps "as is" without warranty of any kind</li>
              <li>
                You may use, copy, modify, and distribute the Apps in accordance
                with the MIT License
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-medium text-white">Privacy</h3>
            <ul className="list-disc space-y-1 pl-4">
              <li>The apps process all data locally on your device</li>
              <li>
                Some Apps may require system permissions to function (e.g.,
                Vocal needs microphone access for transcription)
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-medium text-white">Disclaimer</h3>
            <p>
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-medium text-white">Contact</h3>
            <p>For support, feature requests, or bug reports:</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Use the GitHub Issues page for each respective App</li>
              <li>Follow us on Twitter/X @Nuancedev</li>
              <li>Support our work via Buy Me a Coffee</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Terms
