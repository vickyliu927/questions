'use client'

import { useState, useEffect } from 'react'
import { ContactFormData, ContactFormSectionData } from '../../types/sanity'

type FormData = Omit<ContactFormData, '_id' | '_type' | 'submissionDate'>

interface ContactFormProps {
  contactFormData?: ContactFormSectionData
}

export default function ContactForm({ contactFormData }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    country: '',
    phone: '',
    email: '',
    tutoringDetails: '',
    hourlyBudget: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add useEffect to handle URL parameter
  useEffect(() => {
    // Check if we should scroll to the form
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('contact') === 'true') {
      // Remove the parameter from URL without refreshing
      window.history.replaceState({}, '', window.location.pathname);
      // Scroll to form
      const contactFormElement = document.getElementById('contact-form-section');
      if (contactFormElement) {
        contactFormElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Default values if no Sanity data is provided
  const sectionTitle = contactFormData?.sectionTitle || 'Hire a tutor'
  const sectionDescription = contactFormData?.sectionDescription || 'Please fill out the form and an academic consultant from TutorChase will find a tutor for you'
  const tutorChaseLink = contactFormData?.tutorChaseLink || 'https://tutorchase.com'
  const gradientFrom = contactFormData?.backgroundStyle?.gradientFrom || 'blue-600'
  const gradientTo = contactFormData?.backgroundStyle?.gradientTo || 'purple-700'
  const successTitle = contactFormData?.formSettings?.successMessage?.title || 'Thank you!'
  const successDescription = contactFormData?.formSettings?.successMessage?.description || 'Your request has been submitted successfully. An academic consultant from TutorChase will contact you soon.'
  const submitButtonText = contactFormData?.formSettings?.submitButtonText || 'SUBMIT'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSubmitted(true)
      setFormData({
        fullName: '',
        country: '',
        phone: '',
        email: '',
        tutoringDetails: '',
        hourlyBudget: ''
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact-form-section" className={`py-16 bg-gradient-to-br from-${gradientFrom} to-${gradientTo}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{successTitle}</h2>
              <p className="text-gray-600">
                {successDescription}
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-form-section" className={`py-16 bg-gradient-to-br from-${gradientFrom} to-${gradientTo}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="font-semibold font-serif mb-4" style={{ color: '#243b53', fontSize: '42px' }}>{sectionTitle}</h2>
          <p className="text-xl font-sans" style={{ color: '#486581' }}>
            {sectionDescription.includes('TutorChase') ? (
              <>
                {sectionDescription.split('TutorChase')[0]}
                <a 
                  href={tutorChaseLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80 transition-opacity"
                  style={{ color: '#486581' }}
                >
                  TutorChase
                </a>
                {sectionDescription.split('TutorChase')[1]}
              </>
            ) : (
              sectionDescription
            )}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your country"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Your phone (with country code)<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tutoringDetails" className="block text-sm font-medium text-gray-700 mb-2">
                Details of tutoring request (e.g. exams, subjects, how long for etc.)<span className="text-red-500">*</span>
              </label>
              <textarea
                id="tutoringDetails"
                name="tutoringDetails"
                value={formData.tutoringDetails}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Please provide details about your tutoring needs, including subjects, exam preparation requirements, duration, and any specific goals..."
              />
            </div>

            <div>
              <label htmlFor="hourlyBudget" className="block text-sm font-medium text-gray-700 mb-2">
                Hourly budget (including currency)<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="hourlyBudget"
                name="hourlyBudget"
                value={formData.hourlyBudget}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g. $50/hour, £40/hour, €45/hour"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                submitButtonText
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
} 