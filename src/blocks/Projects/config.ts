import type { Block, Field } from 'payload'
import { sharedFields } from '../sharedFields'

export const Projects: Block = {
  slug: 'projects',
  interfaceName: 'ProjectsBlock',
  labels: {
    singular: 'Projects',
    plural: 'Projects',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'projects',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: true,
              label: 'Projects',
              admin: {
                condition: (data, siblingData) => {
                  return siblingData?.selectionType === 'manual'
                },
              },
            } as Field,
            {
              name: 'selectionType',
              type: 'select',
              label: 'Selection Type',
              options: [
                {
                  label: 'Manual',
                  value: 'manual',
                },
                {
                  label: 'Automatic',
                  value: 'automatic',
                },
              ],
              defaultValue: 'manual',
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
