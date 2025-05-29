import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

// Temporarily hardcode for testing - replace with your actual project ID
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8udeaunz'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (projectId === 'your_project_id_here') {
  console.warn('⚠️  Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file')
}

console.log('Sanity config - Project ID:', projectId)
console.log('Sanity config - Dataset:', dataset)

export default defineConfig({
  name: 'default',
  title: 'CIE IGCSE Notes',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: '/studio',
}) 