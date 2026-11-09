import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Contact, Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'

import Logo from '@/../public/ui/logo-brackets.svg'
import Planet from '@/../public/ui/planet.svg'
import LogoFooterLarge from '@/../public/ui/logo-footer-large.svg'

import RichText from '@/components/RichText'
import { ContactUs } from '@/components/ContactUs'
import { SocialLinks } from '@/components/SocialLinks'
import { CalendlyLink } from './CalendlyLink'
import ScrambleTextLink from '@/components/ScrambleTextLink'
import { Popup } from '@/components/Popup'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const contactData: Contact = await getCachedGlobal('contact', 1)()

  const navItems = footerData?.navItems || []

  const { address, email, phone, socialLinks, calendlyLink } = contactData

  return (
    <footer className="relative bg-gradient-to-t from-orange to-transparent">
      <div className="container pt-4">
        <div className="bg-black text-beige-very-dark rounded-[2rem] md:rounded-[4rem]">
          <p className="flex flex-col p-6 overflow-hidden font-medium leading-none border-b md:flex-row border-white/10 h0 md:flex md:justify-between">
            <span>
              <ScrambleTextLink
                linkText="Ready"
                animateOnLoad={{ enabled: false, delay: 0 }}
                periodic={{ enabled: true, minDelay: 4000, maxDelay: 9000 }}
              />
            </span>
            <span>
              <ScrambleTextLink
                linkText="for"
                animateOnLoad={{ enabled: false, delay: 0 }}
                periodic={{ enabled: true, minDelay: 5000, maxDelay: 11000 }}
              />
            </span>
            <span>
              <ScrambleTextLink
                linkText="lift-off?"
                animateOnLoad={{ enabled: false, delay: 0 }}
                periodic={{ enabled: true, minDelay: 3000, maxDelay: 8000 }}
              />
            </span>
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="gap-4 px-6 py-4 max-md:flex md:p-6 md:border-r border-white/10">
              <div className=" max-md:flex-1">
                <Link href="/" className="block w-8">
                  <Logo />
                </Link>
              </div>
              {address && (
                <div className="opacity-50 max-md:flex-1 md:mt-5">
                  <RichText data={address} enableGutter={false} />
                </div>
              )}
            </div>
            <div className="flex gap-4 px-6 py-4 md:p-6">
              {navItems.length > 0 && (
                <div className="hidden md:block md:flex-1">
                  <p className="mb-2 opacity-50 caption md:mb-4">Site</p>
                  <nav>
                    <ul className="flex flex-col gap-2">
                      {navItems.map(({ link }, i) => {
                        return (
                          <li className="leading-none" key={i}>
                            <CMSLink
                              className="transition-colors text-white/70 hover:text-white"
                              {...link}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </nav>
                </div>
              )}
              {socialLinks && socialLinks.length > 0 && (
                <div className="flex-1">
                  <SocialLinks socialLinks={socialLinks} background="dark" />
                </div>
              )}
              {(phone || email) && (
                <div className="flex-1">
                  <ContactUs phone={phone} email={email} background="dark" />
                </div>
              )}
            </div>
          </div>
          <div className="relative md:mt-18">
            <div className="lg:w-1/2 lg:mx-auto">
              <Planet />
            </div>
            {calendlyLink && (
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <CalendlyLink href={calendlyLink} />
              </div>
            )}
          </div>
        </div>
        <div className="py-1 md:flex md:py-2 md:justify-between">
          <p className="ml-auto">&copy; {new Date().getFullYear()} TRAU</p>
        </div>
        <div>
          <LogoFooterLarge />
        </div>
      </div>
      <Popup />
    </footer>
  )
}
