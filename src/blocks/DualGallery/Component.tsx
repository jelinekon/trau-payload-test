'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

import React from 'react'

import type { DualGalleryBlock as DualGalleryBlockProps } from '@/payload-types'

import { Container } from '@/components/Container'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

gsap.registerPlugin(ScrollTrigger)

const STICKY_CLASSES = ['sticky', 'top-0', 'h-screen', 'flex', 'flex-col', 'justify-center']

export const DualGalleryBlock: React.FC<DualGalleryBlockProps> = (props) => {
  const { desktopColumnGallery, mobileColumnGallery, order, settings } = props

  const sectionRef = useRef<HTMLDivElement>(null)
  const desktopColRef = useRef<HTMLDivElement>(null)
  const mobileColRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    const desktopCol = desktopColRef.current
    const mobileCol = mobileColRef.current
    if (!section || !desktopCol || !mobileCol) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      // Height the column takes with its content laid out normally. Measured from
      // the inner wrapper, because in sticky mode the column itself is h-screen.
      const getNaturalHeight = (col: HTMLDivElement) => {
        const inner = col.firstElementChild as HTMLElement | null
        const { paddingTop, paddingBottom } = getComputedStyle(col)
        return (inner?.offsetHeight ?? 0) + parseFloat(paddingTop) + parseFloat(paddingBottom)
      }

      let shortCol: HTMLDivElement | null = null
      let isSticky = false
      let tween: gsap.core.Tween | null = null

      const teardown = () => {
        if (!shortCol) return
        tween?.scrollTrigger?.kill()
        tween?.kill()
        tween = null
        shortCol.classList.remove(...STICKY_CLASSES)
        gsap.set(shortCol, { clearProps: 'transform,willChange' })
      }

      const setup = () => {
        const isDesktopTaller = getNaturalHeight(desktopCol) >= getNaturalHeight(mobileCol)
        const nextShortCol = isDesktopTaller ? mobileCol : desktopCol
        const tallCol = isDesktopTaller ? desktopCol : mobileCol
        const nextIsSticky = getNaturalHeight(nextShortCol) <= window.innerHeight

        if (nextShortCol === shortCol && nextIsSticky === isSticky) return

        teardown()
        shortCol = nextShortCol
        isSticky = nextIsSticky

        // Short column fits in the viewport: let the browser pin it natively
        // (no scroll lag), as a full-height panel with its content centered.
        if (isSticky) {
          shortCol.classList.add(...STICKY_CLASSES)
          return
        }

        // Short column is taller than the viewport, so it can't be pinned without
        // hiding part of it. Translate it downward as the section scrolls through.
        // At 'bottom bottom' (section bottom = viewport bottom):
        //   shortCol bottom = shortHeight + delta = tallHeight = section bottom  ✓
        const col = shortCol
        const getDelta = () => Math.max(0, tallCol.offsetHeight - col.offsetHeight)

        // Pre-promote the animated column to its own compositor layer so the
        // browser doesn't need to repaint on every scroll tick.
        gsap.set(col, { willChange: 'transform', z: 0 })

        tween = gsap.fromTo(
          col,
          { y: 0 },
          {
            y: getDelta,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.75,
              invalidateOnRefresh: true,
            },
          },
        )
      }

      // Re-evaluate when content (e.g. images loading) or the viewport changes size.
      const observer = new ResizeObserver(setup)
      ;[desktopCol, mobileCol].forEach((col) => {
        if (col.firstElementChild) observer.observe(col.firstElementChild)
      })
      window.addEventListener('resize', setup)

      setup()

      return () => {
        observer.disconnect()
        window.removeEventListener('resize', setup)
        teardown()
      }
    })

    return () => mm.revert()
  })

  return (
    <div ref={sectionRef} className="overflow-clip">
      <Container background={settings?.backgroundColor} withContainerClass={false}>
        {/* items-start keeps each column at its natural height so the shorter one can
            stick / translate. Each column's inner div is measured for its content height.
            overflow-clip (not hidden) on the section so native sticky still works. */}
        <div className="md:flex md:items-start">
          {desktopColumnGallery && (
            <div
              ref={desktopColRef}
              className="px-8 py-8 will-change-transform md:w-2/3 md:py-24 md:px-18"
            >
              <div>
                {desktopColumnGallery.map((item, index) => {
                  return (
                    <div
                      key={item.id ?? index}
                      className="mb-8 overflow-hidden md:mb-20 md:last:mb-0"
                    >
                      <Media resource={item.image} pictureClassName="block h-full" />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          {mobileColumnGallery && (
            <div
              ref={mobileColRef}
              className={cn('will-change-transform md:w-1/3 md:py-24 md:px-28 py-8 px-24', {
                'order-first': order !== 'desktopLeft',
              })}
            >
              <div>
                {mobileColumnGallery.map((item, index) => {
                  return (
                    <div key={item.id ?? index} className="mb-8 overflow-hidden md:mb-20 last:mb-0">
                      <Media resource={item.image} pictureClassName="block h-full" />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
