import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subjectRequest',
  title: 'Subject Request Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal title for this subject request section configuration',
      validation: Rule => Rule.required(),
      initialValue: 'Subject Request Section'
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Main title of the section (e.g., "Can\'t find your subject?")',
      validation: Rule => Rule.required(),
      initialValue: "Can't find your subject?"
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      description: 'Description text explaining what to do if subject is not found',
      validation: Rule => Rule.required(),
      initialValue: "We're constantly adding new subjects and updating our content. If you don't see your subject listed, let us know and we'll prioritize it."
    }),
    defineField({
      name: 'requestButton',
      title: 'Request Button',
      type: 'object',
      description: 'Button to request a new subject',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Request a Subject'
        }),
        defineField({
          name: 'href',
          title: 'Button URL',
          type: 'url',
          description: 'URL for the request form or contact page',
          validation: Rule => Rule.required()
        })
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this section on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      sectionTitle: 'sectionTitle',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, sectionTitle, isActive } = selection
      return {
        title: title,
        subtitle: `${sectionTitle}${isActive ? ' (Active)' : ' (Inactive)'}`,
        media: () => '❓'
      }
    }
  }
}) 