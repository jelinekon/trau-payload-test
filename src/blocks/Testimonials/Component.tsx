import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import Carousel from '@/components/Carousel'
import { Container } from '@/components/Container'
import { cn } from '@/utilities/ui'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = async (props) => {
  const { testimonials, settings } = props

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const payload = await getPayload({ config: configPromise })

  // Populate all testimonials with company data in one go
  const populatedTestimonials = await Promise.all(
    testimonials.map(async (item) => {
      if (typeof item !== 'object' || !item.company) {
        return item
      }

      // If company is just an ID, fetch the full company with logo
      if (typeof item.company === 'string') {
        const company = await payload.findByID({
          collection: 'clients',
          id: item.company,
          depth: 1, // This will populate the logo relationship
        })
        return { ...item, company }
      }

      // If company is already an object but logo is an ID, fetch the logo
      if (
        typeof item.company === 'object' &&
        item.company.pill &&
        typeof item.company.pill === 'string'
      ) {
        const pill = await payload.findByID({
          collection: 'media',
          id: item.company.pill,
        })
        return { ...item, company: { ...item.company, pill } }
      }

      return item
    }),
  )

  return (
    <Container background={settings?.backgroundColor}>
      <div className="py-12 md:py-20 md:px-10">
        <div className="relative">
          <p className="mb-10 whitespace-pre caption md:mb-12">(&nbsp; Testimonials &nbsp; )</p>
          <div className="-mx-4 md:-mx-14">
            <Carousel
              effect="slide"
              autoPlay={true}
              loop={false}
              slidesPerView="auto"
              slideClassName="max-md:!w-[90%] md:!w-[46.5%] pr-4"
              withNavigation={true}
            >
              {populatedTestimonials.map((item, i) => {
                if (typeof item !== 'object') return null

                const { testimonial, author, role, photo, company } = item

                // const companyData = typeof company === 'object' ? company : null
                // const logo =
                //   companyData?.logo && typeof companyData.logo === 'object'
                //     ? companyData.logo
                //     : null

                return (
                  <div
                    key={i}
                    className={cn(
                      'flex flex-col gap-5 p-4 border border-white bg-beige-light md:gap-10 rounded-2xl md:p-6 lg:flex-row lg:gap-20',
                      {
                        'ml-4 md:ml-14': i === 0,
                      },
                    )}
                  >
                    {photo && typeof photo === 'object' && (
                      <div className="relative overflow-hidden rounded-lg md:w-20 h-18 w-18 md:h-20">
                        {/* <Image alt={author || ''} src={photo.sizes.square.url} fill sizes="80px" /> */}
                        <img
                          src={photo.url ?? undefined}
                          alt={author ?? ''}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="md:flex-1">
                      <p className="h4">{testimonial}</p>
                      <div className="flex items-end justify-between gap-4 mt-20 md:gap-8">
                        <div className="md:w-2/3">
                          <p>{author}</p>
                          <p className="leading-tight opacity-60 caption">{role}</p>
                        </div>
                        {company &&
                          typeof company === 'object' &&
                          company.pill &&
                          typeof company.pill === 'object' && (
                            <div className="flex items-end justify-end flex-shrink-0 whitespace-nowrap">
                              <div className="flex items-center gap-2 p-1 border border-white rounded-lg bg-white/50">
                                <img
                                  src={company.pill.url ?? undefined}
                                  alt={company.name ?? ''}
                                  className="w-8"
                                  width={company.pill.width ?? 40}
                                  height={company.pill.height ?? 40}
                                />
                                <p className="pr-2">{company.name}</p>
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </Container>
  )
}
