import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { Contact, PricingBlock as PricingBlockProps } from '@/payload-types'

import { Container } from '@/components/Container'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Button } from '@/components/Button'
import { PricingModel } from '@/components/PricingModel'

export const PricingBlock: React.FC<PricingBlockProps> = async (props) => {
  const { label, content, pricingModels, settings } = props

  const { calendlyLink }: Contact = await getCachedGlobal('contact', 1)()

  return (
    <Container background={settings?.backgroundColor}>
      <div className="py-12 md:pt-32 md:grid md:gap-10 md:grid-cols-2 md:pb-20 md:px-10">
        {label && <div>{<p className="whitespace-pre caption max-md:mb-6">{label}</p>}</div>}
        {content && (
          <div>
            <RichText data={content} enableGutter={false} />
          </div>
        )}
      </div>
      {pricingModels && pricingModels.length > 0 && (
        <div className="px-4 -mx-4 bg-gradient-to-t from-dark">
          <div className="md:pb-20 px-4 py-8 md:px-6 bg-beige-very-dark rounded-b-[2.5rem] md:rounded-b-[4rem]">
            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {pricingModels.map((model, index) => (
                <li key={index}>
                  <PricingModel model={model} calendlyLink={calendlyLink ?? ''} />
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center md:text-right md:mt-6 opacity-60">
              Haven&apos;t found anything that works for you?{' '}
              {calendlyLink && (
                <span className="max-md:flex max-md:justify-center">
                  <a
                    href={calendlyLink}
                    className="font-medium max-lg:underline hover:underline"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Get in touch
                  </a>
                </span>
              )}
              .
            </p>
          </div>
        </div>
      )}
    </Container>
  )
}
