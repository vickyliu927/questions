import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

// Temporarily hardcode for testing - replace with your actual project ID
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8udeaunz'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (projectId === 'your_project_id_here') {
  console.warn('⚠️  Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file')
}

export default defineConfig({
  name: 'default',
  title: 'CIE IGCSE Notes',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
}) 