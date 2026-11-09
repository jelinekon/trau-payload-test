'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import React from 'react'

import type { HorizontalGalleryBlock as HorizontalGalleryBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

import { Container } from '@/components/Container'

gsap.registerPlugin(ScrollTrigger)

export const HorizontalGalleryBlock: React.FC<HorizontalGalleryBlockProps> = (props) => {
  const { gallery, settings } = props

  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || !gallery?.length) return

    const getDistance = () => track.scrollWidth - section.offsetWidth

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${getDistance()}`,
        invalidateOnRefresh: true,
      },
    })
  })

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <Container background={settings?.backgroundColor} withContainerClass={false}>
        <div ref={trackRef} className="flex items-center h-screen will-change-transform">
          {gallery?.map((item, index) => (
            <div
              key={item.id ?? index}
              className="flex items-center justify-center w-full h-full px-4 py-8 md:p-16 lg:p-32 shrink-0 md:w-1/2"
            >
              {typeof item === 'object' && (
                <Media
                  resource={item.image}
                  className="h-full"
                  pictureClassName="block h-full"
                  imgClassName="h-full w-auto object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
