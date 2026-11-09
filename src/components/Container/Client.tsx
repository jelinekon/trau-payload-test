'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

import { ContainerProps } from '.'
import { useBackgroundColor } from '../../providers/BackgroundColorProvider'

export type ContainerClientProps = Pick<ContainerProps, 'background'>

export const ContainerClient: React.FC<ContainerClientProps> = ({ background }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { backgroundColor, setBackgroundColor } = useBackgroundColor()

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        // markers: true,
        onEnter: () => setBackgroundColor(background || 'beige-dark'),
        onEnterBack: () => setBackgroundColor(background || 'beige-dark'),
      })
    },
    { scope: containerRef },
  )

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none"></div>
}
