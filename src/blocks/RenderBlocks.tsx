import React, { Fragment } from 'react'

import type { Page, Project } from '@/payload-types'

import { HomepageHeaderBlock } from './HomepageHeader/Component'
import { VideoPlayerBlock } from './VideoPlayer/Component'
import { AboutUsBlock } from './AboutUs/Component'
import { ProjectsBlock } from './Projects/Component'
import { ServicesBlock } from './Services/Component'
import { PricingBlock } from './Pricing/Component'
import { TextImageBlock } from './TextImage/Component'
import { TestimonialsBlock } from './Testimonials/Component'
import { ClientsBlock } from './Clients/Component'
import { FAQBlock } from './FAQ/Component'
import { ImageBlock } from './ImageBlock/Component'
import { TextBlock } from './Text/Component'
import { HorizontalGalleryBlock } from './HorizontalGallery/Component'
import { DualGalleryBlock } from './DualGallery/Component'
import { ImageMosaicBlock } from './ImageMosaic/Component'

const blockComponents = {
  homepageHeader: HomepageHeaderBlock,
  videoPlayer: VideoPlayerBlock,
  aboutUs: AboutUsBlock,
  projects: ProjectsBlock,
  services: ServicesBlock,
  pricing: PricingBlock,
  textImage: TextImageBlock,
  clients: ClientsBlock,
  testimonials: TestimonialsBlock,
  faq: FAQBlock,
  image: ImageBlock,
  text: TextBlock,
  horizontalGallery: HorizontalGalleryBlock,
  dualGallery: DualGalleryBlock,
  imageMosaic: ImageMosaicBlock,
}

type PageBlock = Page['layout'][0]
type ProjectBlock = Project['layout'][0]
type AnyBlock = PageBlock | ProjectBlock

export const RenderBlocks: React.FC<{
  blocks: AnyBlock[]
  context?: 'page' | 'project'
}> = async (props) => {
  const { blocks, context = 'page' } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index} id={block.settings.moduleId || undefined}>
                  {/* @ts-expect-error Async Server Component */}
                  <Block {...block} context={context} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
