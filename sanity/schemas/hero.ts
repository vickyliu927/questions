import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this hero section configuration',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'premiumTag',
      title: 'Premium Tag Text',
      type: 'string',
      description: 'Text for the premium badge (e.g., "Premium IGCSE Tutoring")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Main title text (e.g., "Master Your")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sectionTitleHighlighted',
      title: 'Section Title (Highlighted Part)',
      type: 'string',
      description: 'Highlighted part of the title (e.g., "IGCSE Journey")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sectionTitleNoHighlight',
      title: 'Section Title (No Highlights)',
      type: 'string',
      description: 'Text displayed after the highlighted part (e.g., "with Confidence")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Hero section description text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'object',
      description: 'Call-to-action buttons in the hero section',
      fields: [
        {
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'href',
              title: 'Button URL',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        },
        {
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'href',
              title: 'Button URL',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'object',
      description: 'Statistics displayed in the hero section',
      fields: [
        {
          name: 'studentsHelped',
          title: 'Students Helped',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Label Text',
              type: 'string',
              description: 'e.g., "Students Helped"',
              validation: Rule => Rule.required()
            },
            {
              name: 'stats',
              title: 'Statistics Number',
              type: 'string',
              description: 'e.g., "500+"',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        },
        {
          name: 'subjectsCovered',
          title: 'Subjects Covered',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Label Text',
              type: 'string',
              description: 'e.g., "Subjects Covered"',
              validation: Rule => Rule.required()
            },
            {
              name: 'stats',
              title: 'Statistics Number',
              type: 'string',
              description: 'e.g., "15+"',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        },
        {
          name: 'successRate',
          title: 'Success Rate',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Label Text',
              type: 'string',
              description: 'e.g., "Success Rate"',
              validation: Rule => Rule.required()
            },
            {
              name: 'stats',
              title: 'Statistics Number',
              type: 'string',
              description: 'e.g., "98%"',
              validation: Rule => Rule.required()
            }
          ],
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'floatingCards',
      title: 'Floating Subject Cards',
      type: 'array',
      description: 'Three floating subject cards displayed on the right side',
      of: [
        {
          type: 'object',
          title: 'Subject Card',
          fields: [
            {
              name: 'title',
              title: 'Subject Title',
              type: 'string',
              description: 'e.g., "Physics", "Mathematics", "Chemistry"',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Short description for the subject',
              validation: Rule => Rule.required()
            },
            {
              name: 'maxCharactersPerLine',
              title: 'Max Characters Per Line',
              type: 'number',
              description: 'Maximum number of characters to display per line in the description (for text wrapping control)',
              validation: Rule => Rule.required().min(10).max(100),
              initialValue: 30
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description'
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(3).max(3).error('Exactly 3 subject cards are required')
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one hero section configuration should be active at a time. This determines which hero appears on the website.',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      sectionTitle: 'sectionTitle',
      highlighted: 'sectionTitleHighlighted',
      noHighlight: 'sectionTitleNoHighlight'
    },
    prepare(selection) {
      const { title, isActive, sectionTitle, highlighted, noHighlight } = selection
      return {
        title: title,
        subtitle: isActive ? `Active - ${sectionTitle} ${highlighted} ${noHighlight}` : `Inactive - ${sectionTitle} ${highlighted} ${noHighlight}`
      }
    }
  }
}) 