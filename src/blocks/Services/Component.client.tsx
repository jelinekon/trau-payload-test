'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import NextImage from 'next/image'

import Dot from '@/../public/ui/dot.svg'

import type { Contact, ServicesBlock as ServicesBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { Container } from '@/components/Container'
import { slugify } from 'payload/shared'
import { Join } from '@/components/Join'
import { Button } from '@/components/Button'
import { AnimateText } from '@/components/AnimateText'

export const ServicesBlockClient: React.FC<ServicesBlockProps & { contact: Contact }> = (props) => {
  const {
    label,
    content,
    services,
    settings,
    contact: { calendlyLink },
  } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = React.useState<number>(0)

  useGSAP(
    () => {
      if (!services || services.length === 0) return

      services.forEach((service, index) => {
        if (!service || !service.title || typeof service.title !== 'string') return

        const section = document.getElementById(slugify(service.title))

        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 40%',
            end: 'bottom 40%',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          })
        }
      })
    },
    { scope: containerRef, dependencies: [services] },
  )

  return (
    <Container background={settings?.backgroundColor}>
      <div ref={containerRef}>
        <div className="px-4 pt-10 pb-20 -mx-4 border-b md:pb-10 border-black/20">
          <div className="relative md:p-10 lg:w-2/3">
            <div className="relative">
              {label && <p className="mb-4 whitespace-pre md:top-1 md:absolute caption">{label}</p>}
              {content && (
                <AnimateText animation="wordUp" indentClass="md:pl-36">
                  <RichText data={content} enableGutter={false} />
                </AnimateText>
              )}
            </div>
          </div>
        </div>
        {services && services.length > 0 && (
          <div className="px-4 -mx-4 border-b md:flex border-black/20 ">
            <div className="relative hidden md:block md:w-1/3 lg:w-1/4 md:border-r md:border-black/20">
              <div className="top-0 h-screen md:flex md:flex-col md:items-start md:justify-between md:p-10 md:sticky">
                <h3 className="h5">Our Approach</h3>
                <ul>
                  {services.map((service, index) => (
                    <li key={index} className="caption">
                      <a
                        href={`#${slugify(service.title ?? '')}`}
                        className={cn('link relative transition-all', {
                          'pl-4': activeIndex === index,
                          'opacity-60': activeIndex !== index,
                        })}
                      >
                        <span
                          className={cn(
                            'text-orange block transition-opacity absolute top-[0.175rem] left-0 w-2',
                            {
                              'opacity-0': activeIndex !== index,
                            },
                          )}
                        >
                          <Dot />
                        </span>
                        {service.title}
                      </a>
                    </li>
                  ))}
                </ul>
                {calendlyLink && (
                  <div>
                    <Button href={calendlyLink} label="Let’s talk" />
                  </div>
                )}
              </div>
            </div>
            <div className="relative md:flex-1 max-md:ml-10">
              <Join
                verticalAlign="top"
                horizontalAlign="left"
                className="-mt-px max-md:ml-px"
                displayFrom="sm"
              />
              <Join
                verticalAlign="bottom"
                horizontalAlign="left"
                rotated
                displayFrom="sm"
                className="-ml-px translate-y-px "
              />
              <ul className="h-full py-10 max-md:border-l border-black/20 lg:px-32 md:py-0 md:px-10 lg:py-16">
                {services.map((service, index) => (
                  <li
                    id={slugify(service.title ?? '')}
                    key={index}
                    className={cn(
                      'section relative transition-opacity py-6 max-md:pl-5 md:py-10 lg:py-16',
                      {
                        'opacity-30': activeIndex !== index,
                      },
                    )}
                  >
                    <div className="relative">
                      <span
                        className={cn(
                          'h-full w-[2px] bg-orange transition-opacity absolute -ml-5 left-0 md:-ml-10 lg:-ml-32 -translate-x-px',
                          {
                            'opacity-0': activeIndex !== index,
                          },
                        )}
                      ></span>
                      <div className="flex items-center gap-2 md:mb-8">
                        <p className="caption">{service.title}</p>
                        {service.title && service.length && (
                          <span className="w-1 opacity-30">
                            <Dot />
                          </span>
                        )}
                        <p className="caption">{service.length}</p>
                      </div>
                      {service.header && (
                        <div className="max-md:my-6 lg:w-3/5">
                          <AnimateText animation="wordUp">
                            <p className="h2">{service.header}</p>
                          </AnimateText>
                        </div>
                      )}
                      {service.description && (
                        <div
                          className={cn('transition-all duration-500 relative', {
                            'opacity-0 top-4': activeIndex !== index,
                            'top-0 opacity-100': activeIndex === index,
                          })}
                        >
                          <RichText
                            data={service.description}
                            enableGutter={false}
                            className="md:mt-10 lg:columns-2 lg:gap-10"
                          />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
