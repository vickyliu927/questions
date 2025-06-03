import { Metadata } from 'next'
import ContactForm from '../../components/ContactForm'
import { client, contactFormSectionQuery } from '../../../lib/sanity'
import { ContactFormSectionData } from '../../../types/sanity'

export const metadata: Metadata = {
  title: 'Contact Us | CIE IGCSE Notes',
  description: 'Get in touch with us to hire a tutor or ask questions about our CIE IGCSE study materials and tutoring services.',
  openGraph: {
    title: 'Contact Us | CIE IGCSE Notes',
    description: 'Get in touch with us to hire a tutor or ask questions about our CIE IGCSE study materials and tutoring services.',
    type: 'website',
  },
}

async function getContactFormSectionData(): Promise<ContactFormSectionData | undefined> {
  try {
    console.log('Fetching contact form section data from Sanity...');
    
    const contactFormSectionData = await client.fetch(contactFormSectionQuery);
    console.log('Fetched contact form section data:', contactFormSectionData);
    return contactFormSectionData;
  } catch (error) {
    console.error('Error fetching contact form section data:', error);
    return undefined;
  }
}

export default async function ContactPage() {
  const contactFormSectionData = await getContactFormSectionData();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header spacing */}
      <div className="pt-20">
        {/* Page title section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ready to excel in your CIE IGCSE studies? Get in touch with us to hire a qualified tutor 
                or ask any questions about our study materials and tutoring services.
              </p>
            </div>
          </div>
        </div>

        {/* Contact form section */}
        <div className="py-12">
          {contactFormSectionData ? (
            <ContactForm contactFormData={contactFormSectionData} />
          ) : (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact form is currently unavailable
                </h2>
                <p className="text-gray-600">
                  Please try again later or contact us directly at{' '}
                  <a href="mailto:info@tutorchase.com" className="text-blue-600 hover:text-blue-800">
                    info@tutorchase.com
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 