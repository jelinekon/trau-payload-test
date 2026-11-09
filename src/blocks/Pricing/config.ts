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

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
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
              name: 'pricingModels',
              type: 'array',
              label: 'Pricing Models',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                },
                {
                  name: 'type',
                  type: 'text',
                  label: 'Type',
                },
                {
                  name: 'description',
                  type: 'richText',
                  label: 'Description',
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
                {
                  name: 'price',
                  type: 'group',
                  label: 'Price',
                  fields: [
                    {
                      name: 'amount',
                      type: 'number',
                      label: 'Amount',
                    },
                    {
                      name: 'period',
                      type: 'text',
                      label: 'Period',
                    },
                  ],
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
