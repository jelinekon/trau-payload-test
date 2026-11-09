import type { Block, Field } from 'payload'

import { sharedFields } from '../sharedFields'

export const HorizontalGallery: Block = {
  slug: 'horizontalGallery',
  interfaceName: 'HorizontalGalleryBlock',
  labels: {
    singular: 'Horizontal Gallery',
    plural: 'Horizontal Gallery',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'gallery',
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
