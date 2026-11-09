'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'
import RichText from '@/components/RichText'

import Marquee from 'react-fast-marquee'

import type { VideoPlayerBlock as VideoPlayerBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { Container } from '@/components/Container'

gsap.registerPlugin(ScrollTrigger)

type Props = VideoPlayerBlockProps & {
  context?: 'page' | 'project'
}

export const VideoPlayerBlock: React.FC<Props> = (props) => {
  const { video, videoPreview, playLabel, autoplay, settings, context } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const playLabelRef = useRef<HTMLDivElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!autoplay || !containerRef.current) return

    const videoEl = videoWrapperRef.current?.querySelector('video')
    if (!videoEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Muted playback is required for browsers to allow autoplay
          videoEl.play().catch(() => {})
        } else {
          videoEl.pause()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [autoplay])

  useGSAP(
    () => {
      if (!containerRef.current) return

      gsap.fromTo(
        '.parallax-media',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      if (!playLabelRef.current) return

      const container = containerRef.current

      gsap.set(playLabelRef.current, { top: container.offsetHeight / 2 })

      const yTo = gsap.quickTo(playLabelRef.current, 'top', {
        duration: 0.6,
        ease: 'power3.out',
      })

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        yTo(e.clientY - rect.top)
      }

      const handleMouseLeave = () => {
        yTo(container.offsetHeight / 2)
      }

      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    { scope: containerRef },
  )

  return (
    <Container
      withContainerClass={context === 'page' ? true : false}
      background={settings?.backgroundColor}
    >
      <div
        className={cn({
          // 'md:pb-8': context === 'page',
          'bg-gradient-to-t from-dark -mx-4 px-4': context === 'page',
        })}
      >
        <div
          ref={containerRef}
          className={cn('relative bg-dark aspect-video overflow-hidden', {
            'rounded-[2.5rem] md:rounded-[4rem]': context === 'page',
          })}
        >
          <div className="parallax-media absolute inset-0 scale-[1.2]">
            {video && (
              <div ref={videoWrapperRef} className="absolute inset-0 ">
                <Media
                  resource={video}
                  videoClassName="w-full h-full block absolute object-cover"
                  muted={!!autoplay}
                  loop={!!autoplay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            )}
            {videoPreview && !autoplay && (
              <div
                className={cn(
                  'absolute inset-0 transition-opacity duration-500 pointer-events-none',
                  {
                    'opacity-0': isPlaying,
                  },
                )}
              >
                <Media
                  resource={videoPreview}
                  videoClassName="w-full h-full block absolute object-cover"
                  autoplay
                  muted
                  loop
                />
              </div>
            )}
          </div>
          {playLabel && (
            <div
              ref={playLabelRef}
              className={cn(
                'absolute left-0 w-full whitespace-pre py-1 text-center -translate-y-1/2 pointer-events-none play-label bg-orange',
                {
                  'opacity-0': isPlaying,
                },
              )}
            >
              <Marquee gradient={false} speed={30}>
                <div className="flex">
                  {[...Array(10)].map((el, i) => (
                    <p key={i} className="px-16 caption">
                      {playLabel}
                    </p>
                  ))}
                </div>
              </Marquee>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
