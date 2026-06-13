import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { buildConfig } from 'payload'
import { Projects } from './src/collections/Projects'
import { Testimonials } from './src/collections/Testimonials'
import { Media } from './src/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname, 'app/(payload)'),
    },
  },
  editor: lexicalEditor(),
  collections: [Projects, Testimonials, Media],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
  }),
  // Used for admin emails (password resets). Reuses the contact form's
  // Resend account; without RESEND_API_KEY sends fail but the app runs.
  email: resendAdapter({
    defaultFromAddress: 'onboarding@resend.dev',
    defaultFromName: 'Portfolio CMS',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
})
