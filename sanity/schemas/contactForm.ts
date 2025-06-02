export default {
  name: 'contactForm',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'phone',
      title: 'Phone (with country code)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'tutoringDetails',
      title: 'Details of tutoring request',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'hourlyBudget',
      title: 'Hourly budget (including currency)',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'submissionDate',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
      date: 'submissionDate'
    },
    prepare(selection: any) {
      const { title, subtitle, date } = selection
      return {
        title: title,
        subtitle: `${subtitle} - ${new Date(date).toLocaleDateString()}`
      }
    }
  }
} 