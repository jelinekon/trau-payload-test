'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/Button'

import bgBlur from 'public/bgs/popup.jpg'

import Logo from 'public/ui/logo-ai.svg'
import Closer from 'public/ui/closer.svg'

import Image from 'next/image'

// Set to true to remember dismissal for COOKIE_MAX_AGE
const COOKIE_ENABLED = false
const COOKIE_NAME = 'popup-dismissed'
const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours
const FADE_DURATION = 300

export const Popup = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isDismissed =
      COOKIE_ENABLED &&
      document.cookie.split('; ').some((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))

    if (!isDismissed) {
      setIsMounted(true)
      requestAnimationFrame(() => setIsVisible(true))
    }
  }, [])

  const handleClose = () => {
    if (COOKIE_ENABLED) {
      document.cookie = `${COOKIE_NAME}=1; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
    }
    setIsVisible(false)
    setTimeout(() => setIsMounted(false), FADE_DURATION)
  }

  if (!isMounted) return null

  return (
    <div
      className={`fixed bottom-4 p-4 rounded-3xl overflow-hidden md:p-5 md:max-w-lg max-md:w-[calc(100%-2rem)] right-4 z-50 transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transitionDuration: `${FADE_DURATION}ms` }}
    >
      <div className="absolute inset-0">
        <Image
          src={bgBlur}
          alt="Popup background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <img
          src="/bgs/popup-lines.svg"
          alt=""
          className="absolute inset-x-7 inset-y-0 z-0 w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative">
        <button
          type="button"
          className="absolute w-7 h-7 flex rounded-full text-white items-center justify-center border border-white opacity-50 hover:opacity-100 transition-opacity top-0 right-0"
          onClick={handleClose}
          aria-label="Close"
        >
          <span className="w-full">
            <Closer />
          </span>
        </button>
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
          <div className="text-white">
            <span className="block w-36 mb-6 md:mb-8">
              <Logo />
            </span>
            <p className="font-bold mb-4">Design taste, encoded.</p>
            <p className="text-12">
              Turn your taste in design to the one source of truth AI can read. So the tools you use
              stop producing almost-right work.
            </p>
          </div>
          <div>
            <Button label="Learn more" href="http://trau.ai/" />
          </div>
        </div>
      </div>
    </div>
  )
}
