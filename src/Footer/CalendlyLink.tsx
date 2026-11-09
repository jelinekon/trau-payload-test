'use client'

import { useState } from 'react'
import ScrambleTextLink from '@/components/ScrambleTextLink'

export const CalendlyLink = ({ href }: { href: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      className="block p-3 tracking-wider text-center text-black uppercase rounded-full font-caption md:text-18 md:p-5 lg:px-10 lg:py-8 bg-orange-light"
      target="_blank"
      rel="noreferrer noopener"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <ScrambleTextLink
        linkText="Start a mission"
        duration={300}
        intervalsBetween={30}
        animateOnLoad={{ enabled: false, delay: 0 }}
        externalTrigger={{ onEnter: isHovered, onLeave: !isHovered }}
      />
    </a>
  )
}
