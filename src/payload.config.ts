import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

// import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
// import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Projects } from './collections/Projects'
import { ProjectCategories } from './collections/ProjectCategories'
import { People } from './collections/People'
import { Clients } from './collections/Clients'
import { Testimonials } from './collections/Testimonials'
import { Contact } from './Contact/config'
import { ProjectIndustries } from './collections/ProjectIndustries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      // beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'matous.barnat@gmail.com',
            password: 'num667',
          }
        : false,
    autoRefresh: true,
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // db: vercelPostgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URL || '',
  //   },
  // }),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL || '',
    // Keep per-instance pools small: every Vercel function instance opens its own pool,
    // and bursts of parallel requests can exhaust the Atlas connection limit.
    connectOptions: {
      maxPoolSize: 5,
      maxIdleTimeMS: 10000,
    },
  }),
  collections: [
    Pages,
    Projects,
    ProjectCategories,
    ProjectIndustries,
    People,
    Clients,
    Testimonials,
    Media,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Contact, Header, Footer],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        // Serve files straight from the Blob CDN instead of proxying every request
        // through /api/media/file (which hits MongoDB for each image)
        media: { disablePayloadAccessControl: true },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  upload: {
    limits: {
      fileSize: 64 * 1024 * 1024, // 64MB
    },
    debug: true,
    // useTempFiles: true,
  },
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
