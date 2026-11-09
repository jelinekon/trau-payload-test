import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Contact, Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 3)()
  const contactData: Contact = await getCachedGlobal('contact', 1)()

  let resolvedFeaturedProjects = headerData.featuredProjects

  if (headerData.projectSelectionType === 'automatic') {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'projects',
      sort: 'order',
      pagination: false,
      depth: 1,
      where: {
        _status: { equals: 'published' },
      },
    })

    resolvedFeaturedProjects = result.docs
  }

  return (
    <HeaderClient
      data={{
        ...headerData,
        featuredProjects: resolvedFeaturedProjects,
      }}
      contact={contactData}
    />
  )
}
