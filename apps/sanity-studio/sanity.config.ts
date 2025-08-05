import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema-types'

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_NAME || 'Sanity Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
