import { defineField, defineType } from 'sanity'

export const seoFields = [
  defineField({
    name: 'seo',
    title: 'SEO & Meta Tags',
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
        name: 'metaKeywords',
        title: 'Meta Keywords',
        type: 'string',
        description: 'Comma-separated keywords relevant to this page (optional)'
      },
      {
        name: 'ogTitle',
        title: 'Open Graph Title',
        type: 'string',
        description: 'Title for social media sharing (falls back to Meta Title if not set)'
      },
      {
        name: 'ogDescription',
        title: 'Open Graph Description',
        type: 'text',
        description: 'Description for social media sharing (falls back to Meta Description if not set)'
      },
      {
        name: 'ogImage',
        title: 'Open Graph Image',
        type: 'image',
        description: 'Image for social media sharing (1200x630px recommended)',
        options: {
          hotspot: true
        },
        fields: [
          {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Alternative text for the image'
          }
        ]
      },
      {
        name: 'twitterTitle',
        title: 'Twitter Title',
        type: 'string',
        description: 'Title for Twitter cards (falls back to OG Title if not set)'
      },
      {
        name: 'twitterDescription',
        title: 'Twitter Description',
        type: 'text',
        description: 'Description for Twitter cards (falls back to OG Description if not set)'
      },
      {
        name: 'twitterImage',
        title: 'Twitter Image',
        type: 'image',
        description: 'Image for Twitter cards (1024x512px recommended)',
        options: {
          hotspot: true
        },
        fields: [
          {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            description: 'Alternative text for the image'
          }
        ]
      },
      {
        name: 'canonicalUrl',
        title: 'Canonical URL',
        type: 'url',
        description: 'Canonical URL for this page (optional, auto-generated if not set)'
      },
      {
        name: 'noIndex',
        title: 'No Index',
        type: 'boolean',
        description: 'Prevent search engines from indexing this page',
        initialValue: false
      },
      {
        name: 'noFollow',
        title: 'No Follow',
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
  title: 'SEO Settings',
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
      title: 'Global SEO Settings',
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
        subtitle: `${metaTitle || 'No meta title set'}${isGlobal ? ' (Global)' : ''}`,
        media: () => '🔍'
      }
    }
  }
}) 