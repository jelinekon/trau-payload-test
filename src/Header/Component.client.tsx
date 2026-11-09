'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

import type { Contact, Header } from '@/payload-types'

// import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

import { cn } from '@/utilities/ui'
import { SocialLinks } from '@/components/SocialLinks'
import { ContactUs } from '@/components/ContactUs'

import Logo from '@/../public/ui/logo.svg'
import Hamburger from '@/../public/ui/hamburger.svg'
import Closer from '@/../public/ui/closer.svg'
import { slugify } from 'payload/shared'
import { Button } from '@/components/Button'
import { Media } from '@/components/Media'
import { Join } from '@/components/Join'
import { LinkAnimated } from '@/components/LinkAnimated'

interface HeaderClientProps {
  data: Header
  contact: Contact
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, contact }) => {
  const { email, phone, socialLinks, calendlyLink } = contact
  const { featuredProjects } = data

  const [openedMenu, setOpenedMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [fullyScrolled, setFullyScrolled] = useState(false)
  const [menuReady, setMenuReady] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const headerScrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const innerDivRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const menuWrapRef = useRef<HTMLDivElement>(null)
  const menuBackdropRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  // Keep a ref to the active menu timeline so we can kill it before reversing
  const menuTlRef = useRef<gsap.core.Timeline | null>(null)

  // Reset React state when navigating to a new page
  useEffect(() => {
    // Kill the timeline AND any standalone tweens it spawned (tl.add callbacks create orphan tweens)
    if (menuTlRef.current) {
      menuTlRef.current.kill()
      menuTlRef.current = null
    }
    gsap.killTweensOf([
      innerDivRef.current,
      headerRef.current,
      backdropRef.current,
      menuBackdropRef.current,
      menuWrapRef.current,
    ])
    setScrolled(false)
    setFullyScrolled(false)
    setOpenedMenu(false)
    setMenuReady(false)
    gsap.set(innerDivRef.current, { clearProps: 'width,marginLeft,marginRight' })
    gsap.set(headerRef.current, { clearProps: 'paddingLeft,paddingRight,marginTop' })
    gsap.set(backdropRef.current, { clearProps: 'height,opacity' })
    gsap.set(menuBackdropRef.current, { clearProps: 'opacity' })
    gsap.set(menuWrapRef.current, { clearProps: 'opacity' })
  }, [pathname])

  // After menu closes, clear GSAP's inline opacity so the nav is visible again
  useEffect(() => {
    if (!openedMenu && menuWrapRef.current) {
      gsap.set(menuWrapRef.current, { clearProps: 'opacity' })
    }
  }, [openedMenu])

  const handleMenuToggle = (open: boolean) => {
    // Kill any in-progress menu animation before starting the opposite
    if (menuTlRef.current) {
      menuTlRef.current.kill()
      menuTlRef.current = null
    }

    if (open) {
      // Hide menu content before React renders it, to prevent a flash
      gsap.set(menuWrapRef.current, { opacity: 0 })
      setOpenedMenu(true)

      const tl = gsap.timeline()
      menuTlRef.current = tl

      // Step 1: expand innerDivRef to full width — margins stay 'auto' so it grows from center
      tl.to(innerDivRef.current, {
        width: '100%',
        duration: 0.4,
        ease: 'power2.inOut',
        onStart: () => {
          // Pin backdrop at pill height during width expansion
          gsap.set(backdropRef.current, { height: '3rem' })
        },
      })
      // Animate header padding/margin in concurrently with width expansion
      tl.to(
        headerRef.current,
        {
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginTop: '0.5rem',
          duration: 0.4,
          ease: 'power2.inOut',
        },
        0,
      )

      // Step 2: fade in full-screen backdrop (starts halfway through step 1)
      tl.to(menuBackdropRef.current, { opacity: 1, duration: 0.3, ease: 'power1.inOut' }, '<0.2')

      // Step 3: expand backdropRef height to cover all content
      tl.add(() => {
        const targetHeight = innerDivRef.current?.scrollHeight ?? 0
        gsap.to(backdropRef.current, {
          height: targetHeight,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        })
      })
      tl.to({}, { duration: 0.4 }) // wait for height animation

      // Step 4: reveal menu content
      tl.add(() => {
        setMenuReady(true)
        gsap.to(menuWrapRef.current, { opacity: 1, duration: 0.3, ease: 'power1.inOut' })
      })
    } else {
      if (!openedMenu) return
      setMenuReady(false)

      const tl = gsap.timeline()
      menuTlRef.current = tl

      // Step 1: fade out menu content
      tl.to(menuWrapRef.current, { opacity: 0, duration: 0.3, ease: 'power1.inOut' })

      // Step 2: collapse backdropRef height back to pill
      tl.to(backdropRef.current, { height: '3rem', duration: 0.4, ease: 'power2.inOut' })

      // Step 3: narrow innerDivRef back to scroll-based width + animate padding/margin out
      tl.add(() => {
        const p = Math.min(window.scrollY / (window.innerHeight * (1 / 3)), 1)
        const w = window.innerWidth
        const targetWidth = w >= 1024 ? 100 / 3 : w >= 768 ? 50 : 100
        const currentWidth = 100 - (100 - targetWidth) * p
        gsap.to(innerDivRef.current, {
          width: `${currentWidth}%`,
          duration: 0.4,
          ease: 'power2.inOut',
        })
        gsap.to(headerRef.current, {
          paddingLeft: `${p}rem`,
          paddingRight: `${p}rem`,
          marginTop: `${0.5 * p}rem`,
          duration: 0.4,
          ease: 'power2.inOut',
        })
      })
      tl.to({}, { duration: 0.4 }) // wait for width/padding animation

      // Step 4: restore React state and fade out full-screen backdrop
      tl.add(() => {
        gsap.set(backdropRef.current, { clearProps: 'height' })
        const p = Math.min(window.scrollY / (window.innerHeight * (1 / 3)), 1)
        // Restore backdrop opacity to match scroll position (0 at top of page)
        gsap.to(backdropRef.current, { opacity: p, duration: 0.3, ease: 'power1.inOut' })
        setFullyScrolled(p >= 2 / 3)
        setOpenedMenu(false)
        gsap.to(menuBackdropRef.current, { opacity: 0, duration: 0.3, ease: 'power1.inOut' })
      })
    }
  }

  // Scroll-driven animations via ScrollTrigger
  useGSAP(
    () => {
      if (openedMenu) {
        // When menu is open, kill only the header scroll tracking and lock fullyScrolled on
        if (headerScrollTriggerRef.current) {
          headerScrollTriggerRef.current.kill()
          headerScrollTriggerRef.current = null
        }
        setFullyScrolled(true)
        gsap.set(navRef.current, { clearProps: 'opacity' })
        return
      }

      const w = window.innerWidth
      const targetWidth = w >= 1024 ? 100 / 3 : w >= 768 ? 50 : 100

      // Width + padding + margin scroll animation
      headerScrollTriggerRef.current = ScrollTrigger.create({
        start: 0,
        end: () => window.innerHeight * (1 / 3),
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          setScrolled(p > 0)
          setFullyScrolled(p >= 2 / 3)
          const currentWidth = 100 - (100 - targetWidth) * p
          gsap.set(innerDivRef.current, {
            width: `${currentWidth}%`,
            marginLeft: 'auto',
            marginRight: 'auto',
          })
          gsap.set(headerRef.current, {
            paddingLeft: `${p}rem`,
            paddingRight: `${p}rem`,
            marginTop: `${0.5 * p}rem`,
          })
          gsap.set(backdropRef.current, { opacity: p })
          // Nav fade: 1→0 between p=0.4 and p=2/3
          const navFadeStart = 0.4
          const navFadeEnd = 2 / 3
          const navOpacity =
            1 - Math.min(Math.max((p - navFadeStart) / (navFadeEnd - navFadeStart), 0), 1)
          gsap.set(navRef.current, { opacity: navOpacity })
        },
      })
    },
    { scope: headerRef, dependencies: [openedMenu, pathname] },
  )

  return (
    <header ref={headerRef} className="fixed top-0 left-0 z-20 w-full">
      <div
        ref={innerDivRef}
        className={cn('h-full relative px-4 transition-colors duration-300', {
          // 'mt-2 p-4 rounded-2xl': openedMenu,
          // 'bg-beige-very-dark': openedMenu && menuReady,
          // 'h-12': !openedMenu,
        })}
      >
        <div
          ref={backdropRef}
          className={cn(
            'overflow-hidden opacity-0 rounded-3xl absolute h-12 left-0 top-0 right-0 backdrop-blur-md',
            {
              // 'rounded-full': !openedMenu,
              // 'fixed z-[-1]': openedMenu,
            },
          )}
          style={{
            background:
              'linear-gradient(0deg, rgba(219, 213, 200, 0.70) 0%, rgba(219, 213, 200, 0.60) 100%), rgba(0, 0, 0, 0.10)',
          }}
        />
        <div
          ref={menuBackdropRef}
          className="fixed inset-0 z-[-1] bg-black/60 opacity-0 backdrop-blur-md pointer-events-none"
          // style={{
          //   opacity: 0,
          //   transition: 'opacity 0.3s ease',
          //   background:
          //     'linear-gradient(0deg, rgba(241, 239, 236, 0.50) 0%, rgba(241, 239, 236, 0.50) 100%), rgba(0, 0, 0, 0.10)',
          // }}
        />
        <div
          className={cn('relative', {
            'flex flex-wrap items-center justify-between h-full': !openedMenu,
          })}
        >
          <Link href="/" className="flex items-center h-12 gap-4">
            <span className="w-4">
              <Logo />
            </span>
            <p className="caption">trau.studio</p>
          </Link>
          <div
            className={cn({
              'menu-wrap md:mt-12 max-md:-mx-4 mt-8 md:-mx-4 border-t -mb-4 md:grid md:grid-cols-2 border-black/20':
                openedMenu,
            })}
            ref={menuWrapRef}
            // style={{ transition: 'opacity 0.3s ease' }}
          >
            <div
              className={cn({
                'md:px-8 md:py-6 pt-4 max-md:pl-5 max-md:ml-14 max-md:border-l md:border-r border-black/20':
                  openedMenu,
              })}
            >
              <div
                ref={navRef}
                className={cn({
                  'md:hidden': fullyScrolled && !openedMenu,
                  'max-md:hidden': !openedMenu,
                })}
              >
                <HeaderNav
                  openedMenu={openedMenu}
                  setOpenedMenu={(val) => (val ? setOpenedMenu(true) : handleMenuToggle(false))}
                  data={data}
                />
              </div>
              <div
                className={cn('max-md:hidden', {
                  'md:hidden': !openedMenu,
                })}
              >
                {(phone || email) && (
                  <div className="md:my-10">
                    <ContactUs phone={phone} email={email} background="light" />
                  </div>
                )}
                {socialLinks && socialLinks.length > 0 && (
                  <div className="md:my-10">
                    <SocialLinks socialLinks={socialLinks} background="light" />
                  </div>
                )}
              </div>
            </div>
            {featuredProjects && featuredProjects.length > 0 && (
              <div
                className={cn({
                  'md:px-8 md:py-6 max-md:pl-5 relative max-md:pt-20 max-md:pb-10 max-md:ml-14 max-md:border-l border-black/20':
                    openedMenu,
                  hidden: !openedMenu,
                })}
              >
                <Join horizontalAlign="left" />
                <p className="mb-6 whitespace-pre-line caption">(&nbsp; all projects &nbsp;)</p>
                <ul className="flex flex-col gap-1 group/list ">
                  {featuredProjects.map((project) => {
                    if (typeof project === 'string') return null
                    return (
                      <li
                        key={project.id}
                        className="h2 transition-opacity group/item group-hover/list:opacity-20 hover:!opacity-100"
                      >
                        <LinkAnimated
                          className="relative block transition-all duration-500 group hover:pl-10 md:hover:pl-14"
                          href={`/projects/${project.slug}`}
                          onClick={() => handleMenuToggle(false)}
                        >
                          {typeof project.client === 'object' &&
                            project.client !== null &&
                            typeof project.client.pill === 'object' &&
                            project.client.pill !== null && (
                              <span className="absolute left-0 w-8 transition-opacity duration-500 -translate-y-1/2 opacity-0 md:w-10 group-hover:opacity-100 top-1/2">
                                <img
                                  src={project.client.pill.url ?? undefined}
                                  alt={project.client.name ?? ''}
                                  className="w-full"
                                />
                              </span>
                            )}
                          {project.title}
                        </LinkAnimated>
                        {project.featuredImageHeader || project.featuredImage ? (
                          <div className="absolute hidden pointer-events-none w-64 opacity-0 duration-500 transition-opacity group-hover/item:opacity-100 -translate-x-6 top-6 lg:block right-full aspect-[1/1.25] rounded-2xl overflow-hidden">
                            <Media
                              resource={project.featuredImageHeader || project.featuredImage}
                              alt={project.title ?? ''}
                              fill
                            />
                          </div>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
          <button
            className={cn(
              'absolute md:left-1/2 top-2 overflow-hidden md:-translate-x-1/2 w-8 h-8',
              {
                // 'md:hidden': !fullyScrolled && !openedMenu,
                'md:pointer-events-none': !openedMenu && !fullyScrolled,
                'max-md:right-28': !openedMenu,
                'md:bg-black/10 rounded-full max-md:right-28': openedMenu,
              },
            )}
            onClick={() => handleMenuToggle(!openedMenu)}
          >
            <span
              className={cn('block transition-all w-8 h-8 p-1', {
                'md:mt-8': !openedMenu && !fullyScrolled,
                '-mt-8': openedMenu,
              })}
            >
              <Hamburger />
            </span>
            <span className="block w-8 h-8">
              <Closer />
            </span>
          </button>
          <span className="md:w-28"></span>
          {calendlyLink && (
            <div
              className={cn('absolute -right-2 top-[0.6rem]', {
                // : openedMenu,
              })}
            >
              <Button href={calendlyLink} label="Let’s talk" />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
