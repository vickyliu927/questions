import { defineField, defineType } from 'sanity'

export const seoFields = [
  defineField({
    name: 'seo',
    title: 'SEO Settings',
    type: 'object',
    description: 'Search engine optimization settings',
    fields: [
      {
        name: 'metaTitle',
        title: 'Meta Title',
        type: 'string',
        description: 'Title that appears in search results and browser tabs (50-60 characters recommended)',
        validation: Rule => Rule.max(60).warning('Titles longer than 60 characters may be truncated in search results')
      },
      {
        name: 'metaDescription',
        title: 'Meta Description',
        type: 'text',
        description: 'Brief description that appears in search results (150-160 characters recommended)',
        validation: Rule => Rule.max(160).warning('Descriptions longer than 160 characters may be truncated in search results')
      },
      {
        name: 'noFollow',
        title: 'No Follow Links',
        type: 'boolean',
        description: 'Prevent search engines from following links on this page',
        initialValue: false
      }
    ],
    options: {
      collapsible: true,
      collapsed: false
    }
  })
]

export default defineType({
  name: 'seoSettings',
  title: 'Global SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal reference name for these SEO settings',
      validation: Rule => Rule.required()
    }),
    ...seoFields,
    defineField({
      name: 'isGlobal',
      title: 'Use as Global Default',
      type: 'boolean',
      description: 'Use as default SEO settings for pages without specific SEO configuration',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      metaTitle: 'seo.metaTitle',
      isGlobal: 'isGlobal'
    },
    prepare(selection) {
      const { title, metaTitle, isGlobal } = selection
      return {
        title: title,
        subtitle: `${metaTitle || 'No meta title set'}${isGlobal ? ' (Global Default)' : ''}`,
        media: () => '🔍'
      }
    }
  }
}) 