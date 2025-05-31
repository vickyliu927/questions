import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageSEO',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal title for this SEO configuration',
      validation: Rule => Rule.required(),
      initialValue: 'Homepage SEO Settings'
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title that appears in search engine results and browser tabs (recommended: 50-60 characters)',
      validation: Rule => Rule.max(60).warning('Meta titles longer than 60 characters may be truncated in search results')
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description that appears in search engine results (recommended: 150-160 characters)',
      validation: Rule => Rule.max(160).warning('Meta descriptions longer than 160 characters may be truncated in search results')
    }),
    defineField({
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      description: 'When enabled, tells search engines not to follow links on this page',
      initialValue: false
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one SEO configuration should be active at a time',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      metaTitle: 'metaTitle',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, metaTitle, isActive } = selection
      return {
        title: title,
        subtitle: `${metaTitle || 'No meta title set'}${isActive ? ' (Active)' : ''}`,
        media: () => '🔍'
      }
    }
  }
}) 