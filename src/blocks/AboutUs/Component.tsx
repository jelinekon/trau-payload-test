'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import { cn } from '@/utilities/ui'
import React, { useRef } from 'react'
import RichText from '@/components/RichText'

gsap.registerPlugin(ScrollTrigger)

import NextImage from 'next/image'

import type { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { Container } from '@/components/Container'
import { useBackgroundColor } from '@/providers/BackgroundColorProvider'
import { Join } from '@/components/Join'
import { AnimateText } from '@/components/AnimateText'

export const AboutUsBlock: React.FC<AboutUsBlockProps> = (props) => {
  const { label, content, quote, numbers, quoteAuthor, settings } = props

  // const { backgroundColor } = useBackgroundColor()

  const backgroundColor = settings?.backgroundColor || 'black'

  const numbersRef = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      if (!numbersRef.current) return
      gsap.fromTo(
        numbersRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: numbersRef.current,
            start: 'top 85%',
          },
        },
      )
    },
    { scope: numbersRef },
  )

  return (
    <Container background={settings?.backgroundColor}>
      <div
        className={cn('transition-colors', {
          'text-white': backgroundColor === 'black',
        })}
      >
        <div
          className={cn('border-b transition-colors -mx-4 px-4 pt-10 pb-20 md:pb-24', {
            'border-white/10 ': backgroundColor === 'black',
            'border-black/20 ': backgroundColor !== 'black',
          })}
        >
          <div className="relative lg:w-2/3 md:p-10">
            <div className="relative">
              {label && (
                <p className="whitespace-pre md:absolute caption md:top-1 max-md:mb-8">{label}</p>
              )}
              {content && (
                <AnimateText animation="wordUp" indentClass="md:pl-28">
                  <RichText data={content} enableGutter={false} />
                </AnimateText>
              )}
            </div>
          </div>
        </div>
        {(quote || (numbers && numbers.length > 0)) && (
          <div
            className={cn(
              'md:w-1/2 p-5 pb-10 md:p-10 relative transition-colors md:ml-auto max-md:ml-10 border-l',
              {
                'border-white/10': backgroundColor === 'black',
                'border-black/20': backgroundColor !== 'black',
              },
            )}
          >
            <Join
              backgroundColor={backgroundColor}
              displayFrom="sm"
              verticalAlign="top"
              horizontalAlign="left"
            />
            {quote && (
              <div className="lg:w-3/5">
                <RichText data={quote} enableGutter={false} />
                {quoteAuthor && typeof quoteAuthor === 'object' && (
                  <div>
                    <div className="inline-flex items-center gap-3 p-[0.375rem] mt-8 border md:pr-10 bg-white/10 border-white/10 rounded-2xl md:mt-10">
                      <div className="relative w-12 overflow-hidden aspect-square rounded-xl">
                        {quoteAuthor.photo && typeof quoteAuthor.photo === 'object' && (
                          <NextImage
                            src={quoteAuthor.photo.sizes?.square?.url || ''}
                            alt={quoteAuthor.name || 'Quote Author'}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="body-s">{quoteAuthor.name}</p>
                        <p className="opacity-50 caption">{quoteAuthor.role}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {numbers && numbers.length > 0 && (
              <ul
                ref={numbersRef}
                className="flex flex-col gap-8 mt-24 md:flex-row md:flex-wrap md:mt-32"
              >
                {numbers.map((item, index) => (
                  <li key={index} className="md:flex-1">
                    <p className="h1">{item.number}</p>
                    {item.label && <p className="mt-2 opacity-50 caption">{item.label}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </Container>
  )
}
