import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

const projectId = '8udeaunz'
const dataset = 'question-bank'

console.log('Sanity config - Project ID:', projectId)
console.log('Sanity config - Dataset:', dataset)

export default defineConfig({
  name: 'default',
  title: 'Notes Website',

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