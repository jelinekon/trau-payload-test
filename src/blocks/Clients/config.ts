import type { Block, Field } from 'payload'
import { sharedFields } from '../sharedFields'

export const Clients: Block = {
  slug: 'clients',
  interfaceName: 'ClientsBlock',
  labels: {
    singular: 'Clients',
    plural: 'Clients',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'clients',
              type: 'relationship',
              label: 'Clients',
              relationTo: 'clients',
              hasMany: true,
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
