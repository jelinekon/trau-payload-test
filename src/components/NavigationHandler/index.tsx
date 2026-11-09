'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { usePathname } from 'next/navigation'

export const NavigationHandler: React.FC = () => {
  const pathname = usePathname()

  useGSAP(
    () => {
      gsap.to(document.body, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
    },
    { dependencies: [pathname], revertOnUpdate: false },
  )

  return null
}
