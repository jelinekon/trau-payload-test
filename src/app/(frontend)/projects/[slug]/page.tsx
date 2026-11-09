import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
// import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ProjectHero } from '@/components/ProjectHero'
import { ProjectFooter } from '@/components/ProjectFooter'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = projects.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const url = '/' + slug

  if (!slug) return <PayloadRedirects url={url} />

  const project = await queryProjectBySlug({
    slug,
    draft,
  })

  if (!project) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = project

  return (
    <div className="pt-12">
      {/* <PageClient /> */}
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* <RenderHero {...hero} /> */}

      <ProjectHero project={project} />

      <RenderBlocks blocks={layout} context="project" />

      <ProjectFooter project={project} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  if (!slug) return {}
  const project = await queryProjectBySlug({
    slug,
    draft: false,
  })

  return generateMeta({ doc: project })
}

const queryProjectBySlug = cache(async ({ slug, draft }: { slug: string; draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
