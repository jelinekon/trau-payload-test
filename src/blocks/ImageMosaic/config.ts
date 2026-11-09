import type { Block, Field } from 'payload'

import { sharedFields } from '../sharedFields'

export const ImageMosaic: Block = {
  slug: 'imageMosaic',
  interfaceName: 'ImageMosaicBlock',
  labels: {
    singular: 'Image Mosaic',
    plural: 'Image Mosaic',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Settings',
          name: 'settings',
          fields: [...sharedFields],
        },
      ],
    },
  ],
}
