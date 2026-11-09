import type { Block, Field } from 'payload'
import { sharedFields } from '../sharedFields'

export const VideoPlayer: Block = {
  slug: 'videoPlayer',
  interfaceName: 'VideoPlayerBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'videoPreview',
              type: 'upload',
              label: 'Video Preview',
              relationTo: 'media',
            },
            {
              name: 'video',
              type: 'upload',
              label: 'Video',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'playLabel',
              type: 'text',
              label: 'Play Label',
            },
            {
              name: 'autoplay',
              type: 'checkbox',
              label: 'Autoplay',
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
