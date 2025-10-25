import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import Users from './collections/Users'

export default buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  
  // Admin panel configuration
  admin: {
    bundler: webpackBundler(),
    user: Users.slug,
    meta: {
      titleSuffix: '- Waste Tracking Platform',
      favicon: '/assets/favicon.ico',
    },
  },

  // Editor for rich text fields
  editor: slateEditor({}),

  // Collections - add your waste tracking collections here
  collections: [
    Users,
    // TODO: Add WasteBatches collection
    // TODO: Add ProcessingSteps collection
    // TODO: Add OutputMaterials collection
  ],

  // Database adapter
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://interview:interview123@localhost:5432/waste_tracking',
    },
  }),

  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.ts'),
  },

  // GraphQL configuration
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, '../generated-schema.graphql'),
  },
})

