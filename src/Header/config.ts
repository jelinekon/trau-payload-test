import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'featuredProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        condition: (data, siblingData) => {
          return siblingData?.projectSelectionType === 'manual'
        },
      },
    },
    {
      name: 'projectSelectionType',
      type: 'select',
      label: 'Project Selection Type',
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
  hooks: {
    afterChange: [revalidateHeader],
  },
}
