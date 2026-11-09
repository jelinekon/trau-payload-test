import { cn } from '@/utilities/ui'
import React, { Fragment } from 'react'
import RichText from '@/components/RichText'

import type { HomepageHeaderBlock as HomepageHeaderBlockProps } from '@/payload-types'

import LogoLarge from '@/../public/ui/logo-large.svg'
import { Media } from '@/components/Media'
import { Container } from '@/components/Container'
import { Join } from '@/components/Join'
import { AnimateText } from '@/components/AnimateText'
import Marquee from 'react-fast-marquee'

export const HomepageHeaderBlock: React.FC<HomepageHeaderBlockProps> = (props) => {
  const { leftColumn, rightColumn, logos, settings } = props

  return (
    <Container background={settings?.backgroundColor}>
      <div className="py-4 md:border-b md:-mx-4 md:px-4 border-black/20 md:py-5">
        <LogoLarge />
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-2">
        {leftColumn && (
          <div className="relative">
            <Join verticalAlign="top" horizontalAlign="right" />
            <div className="h-full md:p-10 max-md:mb-40 md:border-r border-black/20">
              <AnimateText animation="wordUp">
                <RichText data={leftColumn} enableGutter={false} />
              </AnimateText>
            </div>
          </div>
        )}
        {(rightColumn || (logos && logos.length > 0)) && (
          <div className="md:p-10">
            {rightColumn && (
              <div className="max-md:border-b max-md:pb-5 max-md:mb-5 lg:w-1/2 border-black/20">
                <RichText data={rightColumn} enableGutter={false} />
              </div>
            )}
            {logos && logos.length > 0 && (
              <div className="md:mt-64 max-md:pb-5">
                <p className="mb-4 caption md:mb-6">our clients are backed by</p>
                <div className="relative -mx-4 md:-ml-10 md:-mr-14">
                  <Marquee gradient={false} gradientColor="#e3dfd3" speed={30}>
                    <div className="flex items-center gap-4 pr-4 md:gap-6 lg:gap-12">
                      {[...Array(3)].map((el, i) => (
                        <Fragment key={i}>
                          <ul className="flex flex-wrap items-center gap-4 max-md:justify-between md:gap-6 lg:gap-12">
                            {logos.map((logo, index) => (
                              <li
                                key={index}
                                className={cn({
                                  'max-md:hidden': index > 2,
                                })}
                              >
                                {logo && typeof logo === 'object' && (
                                  <img
                                    src={logo.url ?? undefined}
                                    alt={logo.alt ?? ''}
                                    style={{
                                      width: logo.width ? `${logo.width / 16}rem` : undefined,
                                    }}
                                  />
                                )}
                              </li>
                            ))}
                          </ul>
                        </Fragment>
                      ))}
                    </div>
                  </Marquee>
                  <span className="absolute top-0 left-0 z-10 w-10 h-full bg-gradient-to-r from-beige-dark" />
                  <span className="absolute top-0 right-0 z-10 w-10 h-full bg-gradient-to-l from-beige-dark" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  )
}
