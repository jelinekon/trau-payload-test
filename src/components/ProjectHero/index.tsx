'use client'

import { Project } from '@/payload-types'
import { Media } from '../Media'

import Bracket from '@/../public/ui/bracket.svg'
import { cn } from '@/utilities/ui'

import { Join } from '@/components/Join'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { AnimateText } from '../AnimateText'

export type ProjectHeroProps = Pick<
  Project,
  | 'title'
  | 'year'
  | 'featuredImage'
  | 'client'
  | 'projectCategories'
  | 'projectIndustries'
  | 'website'
>

export const ProjectHero: React.FC<{
  project: ProjectHeroProps
}> = ({ project }) => {
  const { title, year, featuredImage, client, projectCategories, projectIndustries, website } =
    project
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    gsap.fromTo(titleRef.current, { y: '110%' }, { y: '0%', duration: 0.75, ease: 'power3.out' })
  })
  return (
    <div className="container ">
      <div className="relative text-white flex flex-col items-center rounded-[2.5rem] md:rounded-[4rem] overflow-hidden justify-center h-[calc(100vh-4rem)] text-center">
        {typeof featuredImage === 'object' && (
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 opacity-60">
              <Media resource={featuredImage} fill />
            </div>
          </div>
        )}
        <div className="relative px-10 ">
          <span className="absolute left-0 z-10 w-4 -translate-y-1/2 md:w-5 top-1/2">
            <Bracket />
          </span>
          <div className="py-2 overflow-hidden">
            <h1 ref={titleRef} className="h0">
              {title}
            </h1>
          </div>
          <span className="absolute right-0 z-10 w-4 rotate-180 -translate-y-1/2 md:w-5 top-1/2">
            <Bracket />
          </span>
        </div>
        <p className="absolute whitespace-pre bottom-4 left-4 md:left-12 md:bottom-8 caption ">
          (&nbsp; Scroll &nbsp;)
        </p>
        {year && (
          <p className="absolute whitespace-pre right-4 bottom-4 md:bottom-8 md:right-12 caption">
            (&nbsp; {year} &nbsp;)
          </p>
        )}
      </div>
      {client && typeof client === 'object' && client.description && (
        <div
          className={cn(
            'border-b border-black/20 transition-colors -mx-4 px-4 pt-10 pb-20 md:pb-24',
            {},
          )}
        >
          <div className="relative lg:w-3/4 md:p-10">
            <div className="relative">
              <p className="whitespace-pre md:absolute caption md:top-1 max-md:mb-8">
                (&nbsp; the client &nbsp;)
              </p>
              {client.description && (
                <AnimateText animation="wordUp" indentClass="md:pl-28">
                  <p className="md:first-letter:ml-28 h2">{client.description}</p>
                </AnimateText>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={cn(
          'md:w-1/2 p-5 pb-10 border-black/20 md:p-10 relative transition-colors md:ml-auto max-md:ml-10 border-l',
          {},
        )}
      >
        <Join backgroundColor="white" displayFrom="sm" verticalAlign="top" horizontalAlign="left" />
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {projectIndustries && projectIndustries.length > 0 && (
            <div className="md:flex-1">
              <p className="mb-2 opacity-60 caption">(&nbsp; Industry &nbsp;)</p>
              <ul className="flex flex-col">
                {projectIndustries.map((industry, index) => {
                  if (typeof industry === 'number') return null
                  return <li key={index}>{typeof industry === 'object' && industry.title}</li>
                })}
              </ul>
            </div>
          )}
          {projectCategories && projectCategories.length > 0 && (
            <div className="md:flex-1">
              <p className="mb-2 opacity-60 caption">(&nbsp; Category &nbsp;)</p>
              <ul className="flex flex-col">
                {projectCategories.map((category, index) => {
                  if (typeof category === 'number') return null
                  return <li key={index}>{typeof category === 'object' && category.title}</li>
                })}
              </ul>
            </div>
          )}
          {website && (
            <div className="md:flex-1">
              <p className="mb-2 opacity-60 caption">(&nbsp; Website &nbsp;)</p>
              <p>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  {website.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
