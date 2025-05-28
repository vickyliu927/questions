import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subjectPage',
  title: 'Subject Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'Internal title for this subject page configuration',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subjectSlug',
      title: 'Subject Slug',
      type: 'slug',
      description: 'URL slug for this subject (e.g., "maths", "physics", "chemistry")',
      options: {
        source: 'subjectName',
        maxLength: 50,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 50)
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subjectName',
      title: 'Subject Name',
      type: 'string',
      description: 'Full name of the subject (e.g., "Mathematics", "Physics", "Chemistry")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'Main title displayed on the subject page',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      description: 'Description text below the page title',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroBackgroundColor',
      title: 'Hero Background Color',
      type: 'string',
      description: 'Background color for the hero section',
      options: {
        list: [
          { title: 'Blue Gradient', value: 'bg-gradient-to-br from-blue-50 to-indigo-100' },
          { title: 'Green Gradient', value: 'bg-gradient-to-br from-green-50 to-emerald-100' },
          { title: 'Purple Gradient', value: 'bg-gradient-to-br from-purple-50 to-violet-100' },
          { title: 'Pink Gradient', value: 'bg-gradient-to-br from-pink-50 to-rose-100' },
          { title: 'Orange Gradient', value: 'bg-gradient-to-br from-orange-50 to-amber-100' },
          { title: 'Teal Gradient', value: 'bg-gradient-to-br from-teal-50 to-cyan-100' },
          { title: 'Gray Gradient', value: 'bg-gradient-to-br from-gray-50 to-slate-100' }
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }),
    defineField({
      name: 'topics',
      title: 'Subject Topics',
      type: 'array',
      description: 'List of topics to display as grids for this subject',
      of: [
        {
          type: 'object',
          title: 'Topic',
          fields: [
            {
              name: 'topicName',
              title: 'Topic Name',
              type: 'string',
              description: 'Name of the topic (e.g., "Algebra", "Mechanics", "Organic Chemistry")',
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
                subtitle: `${subtitle} (Order: ${order})`
              }
            }
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      description: 'Whether this subject page is published and should appear on the website',
      initialValue: false
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
    })
  ],
  preview: {
    select: {
      title: 'subjectName',
      subtitle: 'pageTitle',
      slug: 'subjectSlug.current',
      isPublished: 'isPublished'
    },
    prepare(selection) {
      const { title, subtitle, slug, isPublished } = selection
      return {
        title: title,
        subtitle: `/${slug} - ${subtitle} ${isPublished ? '(Published)' : '(Draft)'}`,
        media: () => title ? title[0] : '📚'
      }
    }
  }
}) 