import type { Block } from 'payload'
import { sharedFields } from '../sharedFields'

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
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
