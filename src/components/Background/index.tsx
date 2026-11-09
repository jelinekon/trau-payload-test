'use client'

import { use, useEffect, useRef } from 'react'

import { useBackgroundColor } from '../../providers/BackgroundColorProvider'
import { cn } from '@/utilities/ui'

export const BackgroundClient: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { backgroundColor, setBackgroundColor } = useBackgroundColor()

  useEffect(() => {
    console.log('Background color changed:', backgroundColor)
  }, [backgroundColor])

  return (
    <div
      ref={containerRef}
      className={cn('fixed transition-colors duration-500 z-0 inset-0', {
        'bg-beige-dark': backgroundColor === 'beige-dark',
        'bg-beige-light': backgroundColor === 'beige-light',
        'bg-beige-very-dark': backgroundColor === 'beige-very-dark',
        'bg-dark': backgroundColor === 'black',
      })}
    ></div>
  )
}
