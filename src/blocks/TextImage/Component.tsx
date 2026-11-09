'use client'

import { cn } from '@/utilities/ui'

import React from 'react'

import NextImage from 'next/image'

import RichText from '@/components/RichText'

import Pricing from '@/../public/ui/pricing.svg'

import { hasText } from '@payloadcms/richtext-lexical/shared'

import type { TextImageBlock as TextImageBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
// import { Media } from '@/components/Media'

import styles from './styles.module.scss'
import { Container } from '@/components/Container'
import { useBackgroundColor } from '@/providers/BackgroundColorProvider'
import { Join } from '@/components/Join'
import { AnimateText } from '@/components/AnimateText'

type Props = TextImageBlockProps & {
  context?: 'page' | 'project'
}

export const TextImageBlock: React.FC<Props> = (props) => {
  const { label, header, content, image, settings, context } = props

  // const { backgroundColor } = useBackgroundColor()

  const backgroundColor = settings?.backgroundColor || 'black'

  return (
    <Container
      withContainerClass={context === 'page' ? true : false}
      background={settings?.backgroundColor}
    >
      <div>
        {(label || hasText(header)) && (
          <div
            className={cn('text-center md:border-b pt-18 md:pb-20 md:px-14', {
              'border-white/10 ': backgroundColor === 'black',
              'border-black/20 ': backgroundColor !== 'black',
              'md:pt-32 md:-mx-4 ': context === 'page',
              'md:pt-20': context !== 'page',
            })}
          >
            <div className="mx-auto lg:w-2/3">
              {label && <div>{<p className="mb-6 whitespace-pre caption">{label}</p>}</div>}
              {header && hasText(header) && (
                <AnimateText animation="wordUp">
                  <RichText data={header} enableGutter={false} />
                </AnimateText>
              )}
            </div>
          </div>
        )}
        <div className="relative flex flex-col md:flex-row">
          {image && typeof image === 'object' && (
            <div
              className={cn(' md:order-2 relative max-md:border-b ', {
                'border-white/10 ': backgroundColor === 'black',
                'border-black/20 ': backgroundColor !== 'black',
                'p-8 lg:py-32 lg:px-40 md:p-10 md:w-1/2': context === 'page',
                'md:w-2/3 max-md:order-2': context !== 'page',
              })}
            >
              <Media resource={image} imgClassName="w-full block" />
            </div>
          )}
          {content && (
            <div
              className={cn(' relative md:flex-1', {
                'border-white/10 ': backgroundColor === 'black',
                'border-black/20 ': backgroundColor !== 'black',
                'md:p-10 max-md:ml-10 py-10 px-5 lg:p-36 md:border-r max-md:border-l ':
                  context === 'page',
                'p-6 md:pr-12 lg:pr-24 max-md:pb-18': context !== 'page',
              })}
            >
              {context === 'page' && (
                <Join
                  backgroundColor={backgroundColor}
                  verticalAlign="top"
                  horizontalAlign="right"
                  displayFrom="sm"
                  className="-mt-px md:-mr-px max-md:right-auto max-md:left-0 max-md:-ml-3"
                />
              )}

              <RichText className={cn(styles.content)} data={content} enableGutter={false} />
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
