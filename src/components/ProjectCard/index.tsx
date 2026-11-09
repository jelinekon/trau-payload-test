'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'

import Parallax from 'parallax-js'

import { Project } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Media } from '../Media'
import { Join } from '../Join'
import ScrambleTextLink from '../ScrambleTextLink'

import Dot from '@/../public/ui/dot.svg'
import { slugify } from 'payload/shared'
import Bracket from '@/../public/ui/bracket.svg'
import Marquee from 'react-fast-marquee'
import { LinkAnimated } from '../LinkAnimated'

import styles from './styles.module.scss'

export type ProjectCardProps = Pick<
  Project,
  'title' | 'excerpt' | 'listImages' | 'projectCategories' | 'slug' | 'listLayout'
>

export const ProjectCard: React.FC<{
  project: ProjectCardProps
  order: number
}> = ({ project, order: orderRaw }) => {
  const order = orderRaw % 5
  const { title, excerpt, listImages, projectCategories, slug, listLayout } = project

  console.log('listLayout', listLayout)

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const titleInnerRef = useRef<HTMLHeadingElement>(null)
  const categoriesRef = useRef<HTMLUListElement>(null)
  const excerptRef = useRef<HTMLParagraphElement>(null)

  const [isActive, setIsActive] = useState<boolean>(false)

  const sceneEl = useRef(null)

  useEffect(() => {
    const parallaxInstance = new Parallax(sceneEl.current, {
      relativeInput: true,
      hoverOnly: true,
      // / clipRelativeInput: true,
    })

    parallaxInstance.enable()

    return () => parallaxInstance.disable()
  }, [])

  useGSAP(
    () => {
      if (isActive) {
        gsap.fromTo(
          titleInnerRef.current,
          { y: '110%' },
          { y: '0%', duration: 0.75, ease: 'power3.out' },
        )
        gsap.fromTo(
          categoriesRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' },
        )
        gsap.fromTo(
          excerptRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' },
        )
      } else {
        gsap.set(titleInnerRef.current, { y: '110%' })
        gsap.set([categoriesRef.current, excerptRef.current].filter(Boolean), { opacity: 0 })
      }
    },
    { dependencies: [isActive], revertOnUpdate: true },
  )

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
      // markers: true,
      onEnter: () => setIsActive(true),
      onEnterBack: () => setIsActive(true),
      onLeave: () => setIsActive(false),
      onLeaveBack: () => setIsActive(false),
    })

    imageRefs.current.filter(Boolean).forEach((image) => {
      if (!image) return

      const widthRatio = image.offsetWidth / window.innerWidth
      const maxBlur = Math.round(6 + (1 - widthRatio) * 12)
      gsap.fromTo(
        image,
        { filter: 'blur(0px)' },
        {
          filter: `blur(${maxBlur}px)`,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'center 20%',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
  })

  return (
    <div
      id={slugify(title)}
      ref={containerRef}
      className="relative h-screen lg:h-[125vh] text-center"
    >
      <div
        className={cn(
          'fixed inset-0 max-md:z-10 transition-opacity duration-300 overflow-hidden flex items-center justify-center',
          {
            'opacity-0 pointer-events-none': !isActive,
          },
        )}
      >
        <LinkAnimated href={`/projects/${slug}`} className="relative group">
          <Join
            verticalAlign="top"
            horizontalAlign="center"
            className="-translate-y-10"
            displayFrom="sm"
            rotated
          />
          <Join
            verticalAlign="bottom"
            horizontalAlign="center"
            className="ml-px translate-y-10"
            displayFrom="sm"
          />
          <span className="absolute w-px h-screen -translate-y-10 bg-black/20 bottom-full"></span>
          <span className="absolute w-px h-screen translate-y-10 bg-black/20 top-full"></span>
          <div className="relative max-md:mx-auto">
            {projectCategories && projectCategories.length > 0 && (
              <ul ref={categoriesRef} className="flex justify-center gap-2 mb-5 md:mb-6">
                {projectCategories.slice(0, 5).map((category, index) => {
                  if (typeof category === 'number' || !category) return null
                  const itemVisibilityClass =
                    index === 0 ? 'flex' : index <= 2 ? 'hidden md:flex' : 'hidden lg:flex'
                  const dotVisibilityClass = index <= 1 ? 'hidden md:flex' : 'hidden lg:flex'
                  return (
                    <li
                      key={index}
                      className={cn('items-center gap-2 caption', itemVisibilityClass)}
                    >
                      {typeof category !== 'number' && category.title}
                      {index < projectCategories.slice(0, 5).length - 1 && (
                        <span className={cn('w-1 opacity-30', dotVisibilityClass)}>
                          <Dot />
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
            <div className="relative px-10 mb-8 md:mb-20">
              <div
                className={cn(
                  'absolute z-10 left-[0.2rem] md:left-1 opacity-0 group-hover:opacity-100 transition-opacity right-[0.2rem] md:right-1 whitespace-pre py-1 text-center -translate-y-1/2 pointer-events-none top-1/2 play-label bg-orange',
                )}
              >
                <Marquee gradient={false} speed={30}>
                  <div className="flex">
                    {[...Array(10)].map((el, i) => (
                      <p key={i} className="px-16 whitespace-pre caption">
                        ( see project )
                      </p>
                    ))}
                  </div>
                </Marquee>
              </div>
              <span className="absolute left-0 z-10 w-4 -translate-y-1/2 md:w-5 top-1/2">
                <Bracket />
              </span>
              <div className="py-2 overflow-hidden">
                <h2 ref={titleInnerRef} className="h0">
                  {title}
                </h2>
              </div>
              <span className="absolute right-0 z-10 w-4 rotate-180 -translate-y-1/2 md:w-5 top-1/2">
                <Bracket />
              </span>
            </div>
            {excerpt && (
              <p
                ref={excerptRef}
                className="md:absolute top-full md:mt-6 w-[60vw] md:w-[50vw] lg:w-[30vw] md:left-1/2 md:-translate-x-1/2 max-md:mx-auto body-m"
              >
                {excerpt}
              </p>
            )}
          </div>
        </LinkAnimated>
      </div>
      <div ref={sceneEl} className="h-full">
        {listImages &&
          listImages.length > 0 &&
          listImages.map((image, index) => {
            if (typeof image === 'number') return null

            // const isPortrait =
            //   typeof image.image !== 'string' && image.image?.width && image.image?.height
            //     ? image.image.height > image.image.width
            //     : false

            const depths = [0.2, 0.4, 0.3]

            return (
              <div key={index} data-depth={depths[index] ?? 0.3} className="absolute inset-0">
                <div className="absolute inset-0 max-md:scale-150">
                  <div
                    ref={(el) => {
                      imageRefs.current[index] = el
                    }}
                    className={cn(
                      'absolute rounded-lg overflow-hidden',
                      styles.float,
                      {
                        [styles.floatDelay1]: index === 1,
                        [styles.floatDelay2]: index === 2,
                      },
                      {
                        // LAYOUT 1

                        'w-1/3 left-[4%] top-[10%]': index === 0 && listLayout === 'layout1',
                        'w-1/4 right-0 top-[20%]': index === 1 && listLayout === 'layout1',
                        'w-[15%] left-[30%] top-[60%]': index === 2 && listLayout === 'layout1',

                        // LAYOUT 2

                        'w-1/3 right-0 top-0': index === 0 && listLayout === 'layout2',
                        'w-1/6 left-0 top-[30%]': index === 1 && listLayout === 'layout2',
                        'w-1/5 right-[25%] top-[70%]': index === 2 && listLayout === 'layout2',

                        // LAYOUT 3

                        'w-[20%] left-1/3 top-0': index === 0 && listLayout === 'layout3',
                        'w-1/4 right-0 top-[10%]': index === 1 && listLayout === 'layout3',
                        'w-1/3 left-[5%] top-[60%]': index === 2 && listLayout === 'layout3',

                        // LAYOUT 4

                        'w-1/3 right-[10%] top-0': index === 0 && listLayout === 'layout4',
                        'w-1/4 left-0 top-[20%]': index === 1 && listLayout === 'layout4',
                        'w-1/4 right-0 top-[60%]': index === 2 && listLayout === 'layout4',

                        // LAYOUT 5

                        'w-1/5 right-[20%] top-0': index === 0 && listLayout === 'layout5',
                        'w-1/5 left-0 top-0': index === 1 && listLayout === 'layout5',
                        'w-1/4 right-0 top-[50%]': index === 2 && listLayout === 'layout5',

                        // LAYOUT 6

                        'w-[12.5%] right-[22.5%] top-0': index === 0 && listLayout === 'layout6',
                        'w-[17.5%] left-0 top-[17.5%]': index === 1 && listLayout === 'layout6',
                        'w-1/4 right-[2.5%] top-[40%]': index === 2 && listLayout === 'layout6',
                      },
                    )}
                  >
                    <Media resource={image.image} />
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
