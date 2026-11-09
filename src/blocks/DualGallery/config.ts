import type { Block, Field } from 'payload'

import { sharedFields } from '../sharedFields'

export const DualGallery: Block = {
  slug: 'dualGallery',
  interfaceName: 'DualGalleryBlock',
  labels: {
    singular: 'Dual Gallery',
    plural: 'Dual Gallery',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'desktopColumnGallery',
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
            {
              name: 'mobileColumnGallery',
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
            {
              name: 'order',
              type: 'select',
              defaultValue: 'desktopLeft',
              options: [
                {
                  label: 'Desktop Left',
                  value: 'desktopLeft',
                },
                {
                  label: 'Desktop Right',
                  value: 'desktopRight',
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
