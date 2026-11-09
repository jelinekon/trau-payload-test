import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
// import { slugField } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  defaultPopulate: {
    name: true,
    logo: true,
    pill: true,
    description: true,
    logoWidth: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoWidth',
      type: 'number',
      defaultValue: 100,
    },
    {
      name: 'pill',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'projects',
      type: 'join',
      collection: 'projects',
      on: 'client',
      hasMany: true,
    },
    // slugField({
    //   position: undefined,
    // }),
  ],
}
