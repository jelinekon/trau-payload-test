import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical'
import { sharedFields } from '../sharedFields'

export const TextImage: Block = {
  slug: 'textImage',
  interfaceName: 'TextImageBlock',
  labels: {
    singular: 'Text with Image',
    plural: 'Text with Image',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
            },
            {
              name: 'header',
              type: 'richText',
              label: 'Header',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Content',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    UnorderedListFeature(),
                    OrderedListFeature(),
                  ]
                },
              }),
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Image',
              relationTo: 'media',
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
