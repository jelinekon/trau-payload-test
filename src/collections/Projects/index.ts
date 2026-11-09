import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
// import { Archive } from '../../blocks/ArchiveBlock/config'
// import { CallToAction } from '../../blocks/CallToAction/config'
// import { Content } from '../../blocks/Content/config'
// import { FormBlock } from '../../blocks/Form/config'
// import { MediaBlock } from '../../blocks/MediaBlock/config'
// import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateProject } from './hooks/revalidateProject'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
// import { HomepageHeader } from '@/blocks/HomepageHeader/config'
import { VideoPlayer } from '@/blocks/VideoPlayer/config'
// import { AboutUs } from '@/blocks/AboutUs/config'
import { ImageBlock } from '@/blocks/ImageBlock/config'
import { TextBlock } from '@/blocks/Text/config'
import { HorizontalGallery } from '@/blocks/HorizontalGallery/config'
import { TextImage } from '@/blocks/TextImage/config'
import { DualGallery } from '@/blocks/DualGallery/config'
import { ImageMosaic } from '@/blocks/ImageMosaic/config'

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
    listImages: true,
    listLayout: true,
    excerpt: true,
    projectCategories: true,
    projectIndustries: true,
    client: true,
    featuredImage: true,
    featuredImageHeader: true,
  },
  defaultSort: 'order',
  admin: {
    defaultColumns: ['title', 'projectCategories', 'projectIndustries'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'projects',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'projects',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        // {
        //   fields: [hero],
        //   label: 'Hero',
        // },
        {
          fields: [
            {
              name: 'projectCategories',
              type: 'relationship',
              relationTo: 'project-categories',
              hasMany: true,
            },
            {
              name: 'projectIndustries',
              type: 'relationship',
              relationTo: 'project-industries',
              hasMany: true,
            },
            {
              name: 'client',
              type: 'relationship',
              relationTo: 'clients',
            },
            {
              name: 'website',
              type: 'text',
            },
            {
              name: 'year',
              type: 'number',
              defaultValue: new Date().getFullYear(),
            },
            {
              name: 'excerpt',
              type: 'text',
              required: true,
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'featuredImageHeader',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'listImages',
              type: 'array',
              label: 'List Images',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
              admin: {
                initCollapsed: true,
              },
            },
            {
              name: 'listLayout',
              type: 'select',
              label: 'List Layout',
              options: [
                {
                  label: 'Layout 1',
                  value: 'layout1',
                },
                {
                  label: 'Layout 2',
                  value: 'layout2',
                },
                {
                  label: 'Layout 3',
                  value: 'layout3',
                },
                {
                  label: 'Layout 4',
                  value: 'layout4',
                },
                {
                  label: 'Layout 5',
                  value: 'layout5',
                },
                {
                  label: 'Layout 6',
                  value: 'layout6',
                },
              ],
              defaultValue: 'layout1',
            },
          ],
          label: 'General',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                VideoPlayer,
                ImageBlock,
                TextBlock,
                HorizontalGallery,
                DualGallery,
                ImageMosaic,
                TextImage,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'credits',
          label: 'Credits',
          fields: [
            {
              name: 'roles',
              type: 'array',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'role',
                  type: 'text',
                },
                {
                  name: 'people',
                  type: 'relationship',
                  relationTo: 'people',
                  hasMany: true,
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateProject],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
