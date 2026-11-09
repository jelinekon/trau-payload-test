'use client'

import gsap from 'gsap'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type LinkAnimatedProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children?: React.ReactNode
  }

export const LinkAnimated: React.FC<LinkAnimatedProps> = ({
  href,
  children,
  onClick,
  target,
  ...rest
}) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let external / new-tab links behave normally
    if (target === '_blank') {
      onClick?.(e)
      return
    }
    e.preventDefault()
    onClick?.(e)
    const destination = typeof href === 'string' ? href : (href.pathname ?? '/')
    gsap.to(document.body, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => router.push(destination),
    })
  }

  return (
    <Link href={href} onClick={handleClick} target={target} {...rest}>
      {children}
    </Link>
  )
}
