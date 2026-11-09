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

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'FAQ',
    plural: 'FAQ',
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
              name: 'questions',
              type: 'array',
              label: 'Questions',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  label: 'Question',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'richText',
                  label: 'Answer',
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: [] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        UnorderedListFeature(),
                        OrderedListFeature(),
                      ]
                    },
                  }),
                },
              ],
              admin: {
                initCollapsed: true,
              },
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
