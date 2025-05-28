export default {
  name: 'faq',
  title: 'FAQ Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
      type: 'string',
      description: 'Internal title for this document (not displayed on website)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to activate/deactivate this section',
      initialValue: true
    },
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Main heading for the FAQ section',
      validation: (Rule: any) => Rule.required().max(100)
    },
    {
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      description: 'Description text below the section title',
      validation: (Rule: any) => Rule.required().max(300)
    },
    {
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      description: 'List of frequently asked questions and their answers',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              description: 'The frequently asked question',
              validation: (Rule: any) => Rule.required().max(200)
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
              description: 'The answer to the question',
              validation: (Rule: any) => Rule.required().max(1000)
            }
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer'
            },
            prepare(selection: any) {
              const { title, subtitle } = selection
              return {
                title: title || 'Untitled Question',
                subtitle: subtitle ? subtitle.substring(0, 60) + '...' : 'No answer provided'
              }
            }
          }
        }
      ],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'contactSupport',
      title: 'Contact Support Section',
      type: 'object',
      description: 'Optional contact support button and information',
      fields: [
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          description: 'Text description above the contact button (optional)',
          validation: (Rule: any) => Rule.max(200)
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: 'Text displayed on the contact button (optional)',
          validation: (Rule: any) => Rule.max(50)
        },
        {
          name: 'buttonLink',
          title: 'Button Link',
          type: 'url',
          description: 'URL for the contact button (optional)',
          validation: (Rule: any) => Rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel']
          })
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'sectionDescription',
      active: 'isActive',
      faqCount: 'faqs'
    },
    prepare(selection: any) {
      const { title, subtitle, active, faqCount } = selection
      const count = faqCount ? faqCount.length : 0
      return {
        title: title || 'FAQ Section',
        subtitle: active ? `${count} FAQ${count !== 1 ? 's' : ''} - ${subtitle}` : `(Inactive) ${count} FAQ${count !== 1 ? 's' : ''}`
      }
    }
  }
} 