'use client'

import { useState, useRef, useEffect } from 'react'

type ScrambleTextLinkProps = {
  linkText: string
  animateOnHover?: boolean
  animateOnLoad?: {
    enabled: boolean
    delay: number
  }
  intervalsBetween?: number // interval between each character change in ms
  duration?: number // total duration of the animation in ms
  shuffleFraction?: number // fraction of characters to scramble at once (0 to 1)
  onScrambleStart?: () => void
  onScrambleEnd?: () => void
  externalTrigger?: {
    onEnter: boolean
    onLeave: boolean
  }
  periodic?: {
    enabled: boolean
    minDelay?: number // min ms between scrambles, default 3000
    maxDelay?: number // max ms between scrambles, default 7000
  }
}

const ScrambleTextLink = ({
  linkText,
  animateOnHover,
  duration,
  intervalsBetween,
  shuffleFraction = 0.33,
  animateOnLoad = { enabled: true, delay: 0 },
  onScrambleStart,
  onScrambleEnd,
  externalTrigger,
  periodic,
}: ScrambleTextLinkProps) => {
  const [text, setText] = useState(linkText)
  const [isAnimating, setIsAnimating] = useState(false)
  const [fixedWidth, setFixedWidth] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const periodicTimerRef = useRef<NodeJS.Timeout | null>(null)
  const spanRef = useRef<HTMLSpanElement | null>(null)
  if (!intervalsBetween) intervalsBetween = 30
  if (!duration) duration = 5 * intervalsBetween

  const scrambledText = (text: string) => {
    const chars = text.split('')
    const eligibleIndices = chars.reduce<number[]>((acc, char, i) => {
      if (char !== ' ') acc.push(i)
      return acc
    }, [])
    const desiredCount = Math.max(2, Math.floor(eligibleIndices.length * shuffleFraction))
    const shuffledIndices = [...eligibleIndices].sort(() => Math.random() - 0.5)
    const toChange = new Set(shuffledIndices.slice(0, desiredCount))
    return chars
      .map((char, i) =>
        toChange.has(i) ? String.fromCharCode(Math.floor(Math.random() * (126 - 91)) + 91) : char,
      )
      .join('')
  }

  const handleScramble = () => {
    if (spanRef.current) {
      setFixedWidth(spanRef.current.offsetWidth)
    }
    setIsAnimating(true)
    onScrambleStart?.()
    let i = 0
    intervalRef.current = setInterval(() => {
      setText(scrambledText(linkText))
      if (i++ >= duration / intervalsBetween) {
        restoreText()
      }
    }, intervalsBetween)
  }

  const restoreText = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setText(linkText)
      setIsAnimating(false)
      setFixedWidth(null)
      onScrambleEnd?.()
    }
  }

  useEffect(() => {
    if (animateOnLoad.enabled) {
      const timeout = setTimeout(handleScramble, animateOnLoad.delay)
      return () => {
        clearTimeout(timeout)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (externalTrigger?.onEnter) {
      handleScramble()
    }
    if (externalTrigger?.onLeave) {
      restoreText()
    }
  }, [externalTrigger])

  useEffect(() => {
    if (!periodic?.enabled || isAnimating) return
    const min = periodic.minDelay ?? 3000
    const max = periodic.maxDelay ?? 7000
    periodicTimerRef.current = setTimeout(handleScramble, min + Math.random() * (max - min))
    return () => {
      if (periodicTimerRef.current) clearTimeout(periodicTimerRef.current)
    }
  }, [isAnimating, periodic?.enabled])

  if (animateOnHover) {
    return (
      <span
        ref={spanRef}
        className="cursor-pointer"
        style={
          isAnimating
            ? { whiteSpace: 'nowrap', display: 'inline-block', width: fixedWidth ?? undefined }
            : undefined
        }
        onPointerEnter={handleScramble}
        onMouseLeave={restoreText}
      >
        {text}
      </span>
    )
  }

  return (
    <span
      ref={spanRef}
      className="cursor-pointer"
      style={
        isAnimating
          ? { whiteSpace: 'nowrap', display: 'inline-block', width: fixedWidth ?? undefined }
          : undefined
      }
    >
      {text}
    </span>
  )
}

export default ScrambleTextLink
