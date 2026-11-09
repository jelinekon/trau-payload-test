'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { SplitText } from 'gsap/dist/SplitText'

gsap.registerPlugin(ScrollTrigger, useGSAP, SplitText)

import { cn } from '@/utilities/ui'

export type AnimateTextProps = {
  animation?: 'wordUp' | 'wordFade'
  className?: string
  indentClass?: string
  children: React.ReactNode
}

export const AnimateText: React.FC<AnimateTextProps> = ({
  animation,
  className,
  indentClass,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current || !animation) return

      if (animation === 'wordUp') {
        const split = new SplitText(containerRef.current, {
          type: 'words',
          mask: 'words',
        })

        if (split.words[0]?.parentElement && indentClass) {
          split.words[0].parentElement.classList.add(indentClass)
        }

        split.words.forEach((word, i) => {
          const mask = word.parentElement
          if (!mask) return
          mask.style.paddingTop = '0.1em'
          mask.style.paddingBottom = '0.2em'
          mask.style.marginTop = '-0.1em'
          mask.style.marginBottom = '-0.2em'
          // Skip horizontal padding/margin on the first word when indentClass is used —
          // inline styles would override the Tailwind class
          if (!(i === 0 && indentClass)) {
            mask.style.paddingLeft = '0.05em'
            mask.style.paddingRight = '0.05em'
            mask.style.marginLeft = '-0.05em'
            mask.style.marginRight = '-0.05em'
          }
        })

        gsap.from(split.words, {
          y: '110%',
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        })

        return () => split.revert()
      }
    },
    {
      scope: containerRef,
      dependencies: [animation],
    },
  )

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  )
}
