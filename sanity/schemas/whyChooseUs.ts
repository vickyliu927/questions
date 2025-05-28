export default {
  name: 'whyChooseUs',
  title: 'Why Choose Us Section',
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
      description: 'Main heading for the Why Choose Us section',
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
      name: 'highlight1',
      title: 'Highlight 1',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required().max(50)
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule: any) => Rule.required().max(200)
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'highlight2',
      title: 'Highlight 2',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required().max(50)
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule: any) => Rule.required().max(200)
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'highlight3',
      title: 'Highlight 3',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required().max(50)
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule: any) => Rule.required().max(200)
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'highlight4',
      title: 'Highlight 4',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule: any) => Rule.required().max(50)
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (Rule: any) => Rule.required().max(200)
        }
      ],
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'sectionDescription',
      active: 'isActive'
    },
    prepare(selection: any) {
      const { title, subtitle, active } = selection
      return {
        title: title || 'Why Choose Us Section',
        subtitle: active ? subtitle : '(Inactive) ' + subtitle
      }
    }
  }
} 