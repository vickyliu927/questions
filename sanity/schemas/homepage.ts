import { defineField, defineType } from 'sanity'
import { seoFields } from './seo'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal title for this homepage configuration',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'The main title of the homepage',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      description: 'Brief description of the homepage content'
    }),
    ...seoFields,
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'object',
      description: 'Configure which sections to display on the homepage',
      fields: [
        {
          name: 'showHeader',
          title: 'Show Header',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showHero',
          title: 'Show Hero Section',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showSubjectGrid',
          title: 'Show Subject Grid',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showWhyChooseUs',
          title: 'Show Why Choose Us',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showFAQ',
          title: 'Show FAQ Section',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'showFooter',
          title: 'Show Footer',
          type: 'boolean',
          initialValue: true
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one homepage configuration should be active at a time',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      pageTitle: 'pageTitle',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, pageTitle, isActive } = selection
      return {
        title: title,
        subtitle: `${pageTitle}${isActive ? ' (Active)' : ''}`,
        media: () => '🏠'
      }
    }
  }
}) 