import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
// import { slugField } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    testimonial: true,
    author: true,
    role: true,
    photo: true,
    company: {
      name: true,
      logo: true,
      pill: true,
    },
  },
  admin: {
    useAsTitle: 'author',
  },
  fields: [
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
    },
    {
      label: 'Author',
      type: 'group',
      fields: [
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'company',
          type: 'relationship',
          relationTo: 'clients',
          maxDepth: 2,
        },
      ],
    },
    // slugField({
    //   position: undefined,
    // }),
  ],
}
