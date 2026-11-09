'use client'

import { cn } from '@/utilities/ui'
import ScrambleTextLink from '../ScrambleTextLink'
import { useState, useRef, useEffect } from 'react'

interface ButtonProps {
  label: string
  href: string
  color?: 'orange' | 'transparent'
  type?: 'link' | 'control'
}

export const Button: React.FC<ButtonProps> = ({ label, href, color = 'orange', type = 'link' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [buttonWidth, setButtonWidth] = useState<number | null>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (buttonRef.current && buttonWidth === null) {
      setButtonWidth(buttonRef.current.offsetWidth)
    }
  }, [buttonWidth])

  const buttonClassName = cn(
    'px-4 py-2 text-12 leading-none whitespace-nowrap inline-flex font-caption uppercase border justify-center tracking-wider rounded-full',
    {
      'bg-orange border-orange': color === 'orange',
      'bg-transparent border-black/30': color === 'transparent',
    },
  )

  if (type === 'link' && href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        className={buttonClassName}
        target="_blank"
        rel="noopener noreferrer"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        style={{ width: buttonWidth ? `${buttonWidth}px` : 'auto' }}
      >
        <ScrambleTextLink
          linkText={label}
          duration={300}
          intervalsBetween={30}
          animateOnLoad={{ enabled: false, delay: 0 }}
          externalTrigger={{ onEnter: isHovered, onLeave: !isHovered }}
        />
      </a>
    )
  }
}
