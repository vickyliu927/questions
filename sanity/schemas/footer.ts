import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      description: 'Internal title for this footer configuration',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one footer configuration should be active at a time. This determines which footer appears on the website.',
      initialValue: false
    }),
    defineField({
      name: 'websiteTitle',
      title: 'Website Title',
      type: 'string',
      description: 'The main title displayed in the footer',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'websiteDescription',
      title: 'Website Description',
      type: 'text',
      description: 'Brief description of the website displayed in the footer',
      validation: Rule => Rule.required().max(300)
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links Section',
      type: 'object',
      description: 'Quick Links section with title and links',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          description: 'Title for the Quick Links section (e.g., "Quick Links")',
          initialValue: 'Quick Links',
          validation: Rule => Rule.required().max(50)
        },
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          description: 'List of quick navigation links',
          of: [
            {
              type: 'object',
              title: 'Link',
              fields: [
                {
                  name: 'label',
                  title: 'Link Text',
                  type: 'string',
                  description: 'Text that appears for the link',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'href',
                  title: 'Link URL',
                  type: 'string',
                  description: 'URL or path (e.g., /subjects, #contact, https://example.com)',
                  validation: Rule => Rule.required()
                }
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'href'
                }
              }
            }
          ],
          validation: Rule => Rule.max(10).error('Maximum 10 quick links allowed')
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'popularSubjects',
      title: 'Popular Subjects Section',
      type: 'object',
      description: 'Popular Subjects section with title and links',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          description: 'Title for the Popular Subjects section (e.g., "Popular Subjects")',
          initialValue: 'Popular Subjects',
          validation: Rule => Rule.required().max(50)
        },
        {
          name: 'links',
          title: 'Subject Links',
          type: 'array',
          description: 'List of popular subject links',
          of: [
            {
              type: 'object',
              title: 'Subject Link',
              fields: [
                {
                  name: 'label',
                  title: 'Subject Name',
                  type: 'string',
                  description: 'Name of the subject (e.g., "Mathematics", "Physics")',
                  validation: Rule => Rule.required()
                },
                {
                  name: 'href',
                  title: 'Subject URL',
                  type: 'string',
                  description: 'URL or path to the subject page',
                  validation: Rule => Rule.required()
                }
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'href'
                }
              }
            }
          ],
          validation: Rule => Rule.max(15).error('Maximum 15 subject links allowed')
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'support',
      title: 'Support Section (Optional)',
      type: 'object',
      description: 'Support section with title and links - this section is optional. Leave empty to hide the entire section.',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          description: 'Title for the Support section (e.g., "Support", "Help"). Required if you add support links.',
          initialValue: 'Support',
          validation: (Rule: any) => Rule.custom((title: string, context: any) => {
            const links = context.parent?.links
            if (links && links.length > 0 && !title) {
              return 'Section title is required when support links are provided'
            }
            return true
          })
        },
        {
          name: 'links',
          title: 'Support Links',
          type: 'array',
          description: 'List of support and help links. Leave empty to hide the entire support section.',
          of: [
            {
              type: 'object',
              title: 'Support Link',
              fields: [
                {
                  name: 'label',
                  title: 'Link Text',
                  type: 'string',
                  description: 'Text that appears for the support link',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'href',
                  title: 'Link URL',
                  type: 'string',
                  description: 'URL or path for the support link',
                  validation: (Rule: any) => Rule.required()
                }
              ],
              preview: {
                select: {
                  title: 'label',
                  subtitle: 'href'
                }
              }
            }
          ],
          validation: (Rule: any) => Rule.max(10).error('Maximum 10 support links allowed')
        }
      ],
      validation: (Rule: any) => Rule.custom((support: any) => {
        // If support object exists but has no links or empty links array, it's valid (hidden section)
        if (!support || !support.links || support.links.length === 0) {
          return true
        }
        // If there are links, ensure there's a section title
        if (support.links.length > 0 && !support.sectionTitle) {
          return 'Section title is required when support links are provided'
        }
        return true
      })
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Icons (Optional)',
      type: 'object',
      description: 'Social media links and icons - this section is optional',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'string',
          description: 'Facebook page URL (optional)',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          }).error('Please enter a valid URL')
        },
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'string',
          description: 'Twitter/X profile URL (optional)',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          }).error('Please enter a valid URL')
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'string',
          description: 'Instagram profile URL (optional)',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          }).error('Please enter a valid URL')
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'string',
          description: 'LinkedIn profile URL (optional)',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          }).error('Please enter a valid URL')
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'string',
          description: 'YouTube channel URL (optional)',
          validation: Rule => Rule.uri({
            scheme: ['http', 'https']
          }).error('Please enter a valid URL')
        }
      ]
    }),
    defineField({
      name: 'layoutSettings',
      title: 'Layout Settings',
      type: 'object',
      description: 'Settings for footer layout and spacing',
      fields: [
        {
          name: 'adaptiveSpacing',
          title: 'Adaptive Spacing',
          type: 'boolean',
          description: 'When enabled, Quick Links and Popular Subjects will distribute space evenly when Support section is empty',
          initialValue: true
        },
        {
          name: 'showCopyright',
          title: 'Show Copyright',
          type: 'boolean',
          description: 'Display copyright notice in footer',
          initialValue: true
        },
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: 'Custom copyright text (leave empty for auto-generated)',
          placeholder: '© 2024 Your Website Name. All rights reserved.'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'websiteTitle',
      subtitle: 'websiteDescription',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, subtitle, isActive } = selection
      return {
        title: title || 'Footer Configuration',
        subtitle: isActive ? subtitle : `(Inactive) ${subtitle || 'Footer configuration'}`
      }
    }
  }
}) 