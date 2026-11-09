'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { usePathname } from 'next/navigation'
import ScrambleTextLink from '@/components/ScrambleTextLink'

type NavItemLink = NonNullable<HeaderType['navItems']>[number]['link']

const NavItem: React.FC<{
  link: NavItemLink
  openedMenu: boolean
  onClick: () => void
}> = ({ link, openedMenu, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <CMSLink
      {...link}
      onClick={() => {
        setIsHovered(false)
        onClick()
      }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <ScrambleTextLink
        linkText={link.label ?? ''}
        duration={300}
        intervalsBetween={30}
        animateOnLoad={{ enabled: false, delay: 0 }}
        externalTrigger={{ onEnter: isHovered, onLeave: !isHovered }}
      />
    </CMSLink>
  )
}

export const HeaderNav: React.FC<{
  data: HeaderType
  openedMenu: boolean
  setOpenedMenu: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ data, openedMenu, setOpenedMenu }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  const handleClick = () => {
    setOpenedMenu(false)
  }

  return (
    <nav>
      <ul
        className={cn({
          'md:flex md:items-center md:gap-3 lg:gap-6': !openedMenu,
        })}
      >
        {navItems.map(({ link }, i) => {
          const resolvedLink =
            !isHomepage && link.url?.startsWith('#') ? { ...link, url: `/${link.url}` } : link

          return (
            <li
              key={i}
              className={cn('', {
                h4: openedMenu,
                'text-15': !openedMenu,
              })}
            >
              <NavItem link={resolvedLink} openedMenu={openedMenu} onClick={handleClick} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
