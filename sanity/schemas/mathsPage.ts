import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mathsPage',
  title: 'Maths Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal title for this maths page configuration',
      validation: Rule => Rule.required(),
      initialValue: 'Maths Page Configuration'
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Main title displayed on the maths page',
      validation: Rule => Rule.required(),
      initialValue: 'Mathematics'
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      description: 'Description text below the page title',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'topics',
      title: 'Math Topics',
      type: 'array',
      description: 'List of mathematics topics to display as grids',
      of: [
        {
          type: 'object',
          title: 'Topic',
          fields: [
            {
              name: 'topicName',
              title: 'Topic Name',
              type: 'string',
              description: 'Name of the mathematics topic (e.g., "Algebra", "Geometry")',
              validation: Rule => Rule.required()
            },
            {
              name: 'topicDescription',
              title: 'Topic Description',
              type: 'text',
              description: 'Brief description of the topic',
              validation: Rule => Rule.required()
            },
            {
              name: 'color',
              title: 'Color Theme',
              type: 'string',
              description: 'Tailwind CSS color class for the topic card',
              options: {
                list: [
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
              name: 'subtopics',
              title: 'Subtopics',
              type: 'array',
              description: 'List of subtopics within this topic',
              of: [
                {
                  type: 'object',
                  title: 'Subtopic',
                  fields: [
                    {
                      name: 'subtopicName',
                      title: 'Subtopic Name',
                      type: 'string',
                      description: 'Name of the subtopic',
                      validation: Rule => Rule.required()
                    },
                    {
                      name: 'subtopicUrl',
                      title: 'Subtopic URL',
                      type: 'url',
                      description: 'URL to navigate to when subtopic is clicked (optional if has sub-subtopics)'
                    },
                    {
                      name: 'isComingSoon',
                      title: 'Coming Soon',
                      type: 'boolean',
                      description: 'Mark this subtopic as coming soon (will disable the link)',
                      initialValue: false
                    },
                    {
                      name: 'subSubtopics',
                      title: 'Sub-Subtopics',
                      type: 'array',
                      description: 'List of sub-subtopics within this subtopic (optional)',
                      of: [
                        {
                          type: 'object',
                          title: 'Sub-Subtopic',
                          fields: [
                            {
                              name: 'subSubtopicName',
                              title: 'Sub-Subtopic Name',
                              type: 'string',
                              description: 'Name of the sub-subtopic',
                              validation: Rule => Rule.required()
                            },
                            {
                              name: 'subSubtopicUrl',
                              title: 'Sub-Subtopic URL',
                              type: 'url',
                              description: 'URL to navigate to when sub-subtopic is clicked',
                              validation: Rule => Rule.required()
                            },
                            {
                              name: 'isComingSoon',
                              title: 'Coming Soon',
                              type: 'boolean',
                              description: 'Mark this sub-subtopic as coming soon (will disable the link)',
                              initialValue: false
                            }
                          ],
                          preview: {
                            select: {
                              title: 'subSubtopicName',
                              subtitle: 'subSubtopicUrl',
                              isComingSoon: 'isComingSoon'
                            },
                            prepare(selection) {
                              const { title, subtitle, isComingSoon } = selection
                              return {
                                title: title,
                                subtitle: isComingSoon ? 'Coming Soon' : subtitle
                              }
                            }
                          }
                        }
                      ]
                    }
                  ],
                  preview: {
                    select: {
                      title: 'subtopicName',
                      subtitle: 'subtopicUrl',
                      isComingSoon: 'isComingSoon',
                      subSubtopics: 'subSubtopics'
                    },
                    prepare(selection) {
                      const { title, subtitle, isComingSoon, subSubtopics } = selection
                      const hasSubSubtopics = subSubtopics && subSubtopics.length > 0
                      const displaySubtitle = isComingSoon 
                        ? 'Coming Soon' 
                        : hasSubSubtopics 
                          ? `${subSubtopics.length} sub-subtopics`
                          : subtitle
                      return {
                        title: title,
                        subtitle: displaySubtitle
                      }
                    }
                  }
                }
              ],
              validation: Rule => Rule.required().min(1)
            },
            {
              name: 'displayOrder',
              title: 'Display Order',
              type: 'number',
              description: 'Order in which this topic should appear (lower numbers appear first)',
              validation: Rule => Rule.required().min(1),
              initialValue: 1
            }
          ],
          preview: {
            select: {
              title: 'topicName',
              subtitle: 'topicDescription',
              order: 'displayOrder'
            },
            prepare(selection) {
              const { title, subtitle, order } = selection
              return {
                title: title,
                subtitle: `Order: ${order} - ${subtitle}`
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
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
          description: 'Title tag for search engines (recommended: 50-60 characters)',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for search engines (recommended: 150-160 characters)',
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          description: 'SEO keywords for this page',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        }
      ]
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Only one maths page configuration should be active at a time',
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
        subtitle: `${pageTitle} ${isActive ? '(Active)' : '(Inactive)'}`
      }
    }
  }
}) 