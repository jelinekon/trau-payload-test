import React from 'react'

import type { ImageMosaicBlock as ImageMosaicBlockProps } from '@/payload-types'

import { Container } from '@/components/Container'
import { Media } from '@/components/Media'

export const ImageMosaicBlock: React.FC<ImageMosaicBlockProps> = (props) => {
  const { images, settings } = props

  return (
    <Container background={settings?.backgroundColor} withContainerClass={false}>
      <div className="grid md:grid-cols-2">
        {images?.map((img, index) => {
          return (
            <div key={index} className="overflow-hidden">
              <Media resource={img.image} className="h-full" pictureClassName="block h-full" />
            </div>
          )
        })}
      </div>
    </Container>
  )
}
