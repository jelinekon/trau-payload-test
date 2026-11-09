'use client'

import { cn } from '@/utilities/ui'

import React from 'react'

import NextImage from 'next/image'

import RichText from '@/components/RichText'

import Pricing from '@/../public/ui/pricing.svg'

import type { TextBlock as TextBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
// import { Media } from '@/components/Media'

import { Container } from '@/components/Container'

import { Join } from '@/components/Join'

export const TextBlock: React.FC<TextBlockProps> = (props) => {
  const { label, content, settings } = props

  // const { backgroundColor } = useBackgroundColor()

  const backgroundColor = settings?.backgroundColor || 'black'

  return (
    <Container background={settings?.backgroundColor}>
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        {label && (
          <div
            className={cn('md:p-10 md:border-r relative pt-10 md:pb-10 md:px-5', {
              'border-white/10 ': backgroundColor === 'black',
              'border-black/20 ': backgroundColor !== 'black',
            })}
          >
            <Join
              backgroundColor={backgroundColor}
              verticalAlign="top"
              horizontalAlign="right"
              displayFrom="sm"
              className="hidden -mt-px md:block md:-mr-px max-md:right-auto max-md:left-0 max-md:-ml-3"
            />
            {label && <div>{<p className="whitespace-pre md:mb-6 caption">{label}</p>}</div>}
          </div>
        )}
        {content && (
          <div className="pt-5 pb-18 md:p-10 md:pb-40 body-xl-wrap">
            <RichText data={content} enableGutter={false} />
          </div>
        )}
      </div>
    </Container>
  )
}
