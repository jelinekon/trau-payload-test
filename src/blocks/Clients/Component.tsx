import { cn } from '@/utilities/ui'
import React, { Fragment } from 'react'

import Marquee from 'react-fast-marquee'

import type { ClientsBlock as ClientsBlockProps } from '@/payload-types'
import { Container } from '@/components/Container'

// import { Media } from '@/components/Media'

export const ClientsBlock: React.FC<ClientsBlockProps> = (props) => {
  const { clients, settings } = props

  return (
    <Container background={settings?.backgroundColor}>
      <div className="pt-8 pb-12 md:pt-12 md:pb-28">
        <p className="mb-4 text-center caption md:mb-10">(&nbsp; Clients &nbsp;)</p>
        {clients && clients.length > 0 && (
          <div className="grayscale opacity-60">
            <Marquee gradient={true} gradientColor="#e3dfd3" speed={30}>
              <div className="flex items-center gap-8 pr-8 md:gap-16 md:pr-16">
                {[...Array(3)].map((el, i) => (
                  <Fragment key={i}>
                    <ul className="flex items-center gap-8 md:gap-18">
                      {clients.map((client, index) => {
                        if (
                          !client ||
                          typeof client !== 'object' ||
                          !client.logo ||
                          typeof client.logo !== 'object'
                        )
                          return null
                        return (
                          <li key={index}>
                            <img
                              src={client.logo.url ?? undefined}
                              alt={client.name ?? ''}
                              width={client.logo.width ?? undefined}
                              height={client.logo.height ?? undefined}
                              style={{
                                width: client.logoWidth
                                  ? `${client.logoWidth / 16}rem`
                                  : client.logo.width
                                    ? `${client.logo.width / 16}rem`
                                    : undefined,
                              }}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </Fragment>
                ))}
              </div>
            </Marquee>
          </div>
        )}
      </div>
    </Container>
  )
}
