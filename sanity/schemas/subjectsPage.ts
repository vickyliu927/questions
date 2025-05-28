import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subjectsPage',
  title: 'Subjects Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal title for this subjects page configuration',
      validation: Rule => Rule.required(),
      initialValue: 'Subjects Page Configuration'
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Main title displayed on the subjects page (e.g., "All Subjects")',
      validation: Rule => Rule.required(),
      initialValue: 'All Subjects'
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      description: 'Description text below the page title',
      validation: Rule => Rule.required(),
      initialValue: 'Explore our comprehensive collection of CIE IGCSE study materials. Each subject includes detailed notes, practice questions, past papers, and exam tips to help you excel in your studies.'
    }),
    defineField({
      name: 'subjectGridDisplayOrder',
      title: 'Subject Grid Display Order',
      type: 'string',
      description: 'How subjects should be ordered on the page',
      options: {
        list: [
          { title: 'Alphabetical (A-Z)', value: 'alphabetical' },
          { title: 'Reverse Alphabetical (Z-A)', value: 'reverse-alphabetical' },
          { title: 'Most Recently Updated', value: 'recent-first' },
          { title: 'Oldest Updated First', value: 'oldest-first' },
          { title: 'Custom Order (as defined in Subject Grid)', value: 'custom' }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'custom'
    }),
    defineField({
      name: 'showAdditionalSubjects',
      title: 'Show Additional Subjects',
      type: 'boolean',
      description: 'Whether to show additional subjects beyond those in the main Subject Grid',
      initialValue: true
    }),
    defineField({
      name: 'additionalSubjects',
      title: 'Additional Subjects',
      type: 'array',
      description: 'Additional subjects to display beyond the main Subject Grid subjects',
      of: [
        {
          type: 'object',
          title: 'Additional Subject',
          fields: [
            {
              name: 'name',
              title: 'Subject Name',
              type: 'string',
              description: 'Name of the subject (e.g., "Geography", "Economics")',
              validation: Rule => Rule.required()
            },
            {
              name: 'image',
              title: 'Subject Image',
              type: 'image',
              description: 'Image to display for this subject',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: 'Alternative text for accessibility',
                  validation: Rule => Rule.required()
                }
              ]
            },
            {
              name: 'description',
              title: 'Subject Description',
              type: 'text',
              description: 'Brief description of what the subject covers',
              validation: Rule => Rule.required()
            },
            {
              name: 'color',
              title: 'Color Theme',
              type: 'string',
              description: 'Tailwind CSS color class for the subject icon',
              options: {
                list: [
                  { title: 'Primary', value: 'bg-primary' },
                  { title: 'Secondary', value: 'bg-secondary' },
                  { title: 'Accent', value: 'bg-accent' },
                  { title: 'Success', value: 'bg-success' },
                  { title: 'Warning', value: 'bg-warning' },
                  { title: 'Error', value: 'bg-error' },
                  { title: 'Blue', value: 'bg-blue-500' },
                  { title: 'Green', value: 'bg-green-500' },
                  { title: 'Purple', value: 'bg-purple-500' },
                  { title: 'Pink', value: 'bg-pink-500' },
                  { title: 'Indigo', value: 'bg-indigo-500' },
                  { title: 'Teal', value: 'bg-teal-500' },
                  { title: 'Orange', value: 'bg-orange-500' },
                  { title: 'Red', value: 'bg-red-500' },
                  { title: 'Yellow', value: 'bg-yellow-500' },
                  { title: 'Cyan', value: 'bg-cyan-500' }
                ]
              },
              validation: Rule => Rule.required(),
              initialValue: 'bg-blue-500'
            },
            {
              name: 'dateUpdated',
              title: 'Date Updated',
              type: 'date',
              description: 'Date when this subject content was last updated',
              validation: Rule => Rule.required()
            },
            {
              name: 'viewNotesButton',
              title: 'View Notes Button',
              type: 'object',
              description: 'Button text and URL for viewing notes',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                  description: 'Text displayed on the button (e.g., "View Notes")',
                  validation: Rule => Rule.required(),
                  initialValue: 'View Notes'
                },
                {
                  name: 'href',
                  title: 'Button URL',
                  type: 'string',
                  description: 'URL to navigate to when button is clicked (e.g., "/subjects/geography")',
                  validation: Rule => Rule.required()
                }
              ],
              validation: Rule => Rule.required()
            },
            {
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this subject should appear (lower numbers appear first)',
              validation: Rule => Rule.required().min(1)
            }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'description',
              displayOrder: 'displayOrder'
            },
            prepare(selection) {
              const { title, subtitle, displayOrder } = selection
              return {
                title: title,
                subtitle: `${subtitle} (Order: ${displayOrder})`,
                media: () => title ? title[0] : '?'
              }
            }
          }
        }
      ],
      hidden: ({ document }) => !document?.showAdditionalSubjects
    }),
    defineField({
      name: 'additionalSubjectRequestTitle',
      title: 'Additional Subject Request Title',
      type: 'string',
      description: 'Title for the "request a subject" section',
      validation: Rule => Rule.required(),
      initialValue: 'Can\'t find your subject?'
    }),
    defineField({
      name: 'additionalSubjectRequestDescription',
      title: 'Additional Subject Request Description',
      type: 'text',
      description: 'Description text for the "request a subject" section',
      validation: Rule => Rule.required(),
      initialValue: 'We\'re constantly adding new subjects and updating our content. If you don\'t see your subject listed, let us know and we\'ll prioritize it.'
    }),
    defineField({
      name: 'additionalSubjectRequestButton',
      title: 'Additional Subject Request Button',
      type: 'object',
      description: 'Button for requesting additional subjects',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'Text displayed on the button',
          validation: Rule => Rule.required(),
          initialValue: 'Request a Subject'
        },
        {
          name: 'href',
          title: 'Button URL',
          type: 'string',
          description: 'URL to navigate to when button is clicked (e.g., "/contact" or external URL)',
          validation: Rule => Rule.required(),
          initialValue: '/contact'
        }
      ],
      validation: Rule => Rule.required()
    }),
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
          description: 'Title that appears in search engine results and browser tabs',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description that appears in search engine results',
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          description: 'Keywords for search engine optimization',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ],
      options: {
        collapsible: true,
        collapsed: true
      }
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one subjects page configuration should be active at a time. This determines which configuration appears on the website.',
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
        subtitle: `${pageTitle} ${isActive ? '(Active)' : '(Inactive)'}`,
        media: () => '📚'
      }
    }
  }
}) 