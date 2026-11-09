'use client'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import RichText from '@/components/RichText'

import Pricing from '@/../public/ui/pricing.svg'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

import styles from './styles.module.scss'
import { Container } from '@/components/Container'
import { Join } from '@/components/Join'

export const FAQBlock: React.FC<FAQBlockProps> = (props) => {
  const { label, content, questions, settings } = props

  const [openedIndex, setOpenedIndex] = useState<number>(-1)

  return (
    <Container background={settings?.backgroundColor}>
      <div className="grid-cols-1 px-4 -mx-4 border-b max-md:pt-8 md:border-t border-black/20 md:grid md:grid-cols-2">
        <div className="relative pb-8 md:p-10 max-md:border-b md:border-r border-black/20">
          {label && <div>{<p className="mb-4 whitespace-pre caption">{label}</p>}</div>}
          {content && (
            <div>
              <RichText data={content} enableGutter={false} />
            </div>
          )}
        </div>
        {questions && questions.length > 0 && (
          <div className="relative pt-4 pb-12 pl-4 md:pb-28 md:p-10 max-md:ml-10 max-md:border-l border-black/20">
            <Join
              verticalAlign="top"
              horizontalAlign="left"
              displayFrom="sm"
              className="-mt-px -mr-px"
            />
            <Join
              verticalAlign="bottom"
              horizontalAlign="left"
              rotated
              className="translate-y-px"
              displayFrom="sm"
            />
            <ul className="flex flex-col md:gap-4">
              {questions.map((question, index) => (
                <li
                  key={index}
                  onClick={() => setOpenedIndex(openedIndex === index ? -1 : index)}
                  className={cn('transition-all cursor-pointer p-4 rounded-2xl md:px-6', {
                    'bg-white py-6': openedIndex === index,
                    'md:py-4': openedIndex !== index,
                  })}
                >
                  {question.question && (
                    <div className="relative">
                      <p className="pr-10 body-m">
                        <strong>{question.question}</strong>
                      </p>
                      <div className="absolute w-8 h-8 rounded-full -top-1 -right-1 bg-black/10">
                        <span className="absolute w-4 h-px -translate-x-1/2 -translate-y-1/2 bg-black top-1/2 left-1/2"></span>
                        <span
                          className={cn(
                            'absolute w-px h-4 transition-all -translate-x-1/2 -translate-y-1/2 bg-black top-1/2 left-1/2',
                            {
                              'h-0': openedIndex === index,
                            },
                          )}
                        ></span>
                      </div>
                    </div>
                  )}
                  {question.answer && (
                    <div
                      className={cn('grid transition-all overflow-hidden', {
                        'grid-rows-[1fr] pt-3 md:pt-4': openedIndex === index,
                        'grid-rows-[0fr]': openedIndex !== index,
                      })}
                    >
                      <RichText
                        data={question.answer}
                        className="overflow-hidden opacity-60"
                        enableGutter={false}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  )
}
