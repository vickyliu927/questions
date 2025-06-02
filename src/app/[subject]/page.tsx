import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header, Footer, SubjectTopicGrid } from '@/components'
import { client, headerQuery, footerQuery, getSubjectPageData, getGlobalSEOSettings, allSubjectSlugsQuery } from '../../../lib/sanity'
import { HeaderData, FooterData } from '../../../types/sanity'
import { generateSEOMetadata } from '../../../components/SEOHead'

interface SubjectPageProps {
  params: Promise<{
    subject: string
  }>
}

async function getHeaderData(): Promise<HeaderData | undefined> {
  try {
    const headerData = await client.fetch(headerQuery)
    return headerData
  } catch (error) {
    console.error('Error fetching header data:', error)
    return undefined
  }
}

async function getFooterData(): Promise<FooterData | undefined> {
  try {
    const footerData = await client.fetch(footerQuery)
    return footerData
  } catch (error) {
    console.error('Error fetching footer data:', error)
    return undefined
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(allSubjectSlugsQuery)
    return slugs.map((slug: string) => ({
      subject: slug,
    }))
  } catch (error) {
    console.error('Error fetching subject slugs:', error)
    return []
  }
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  try {
  const { subject } = await params
  const subjectPageData = await getSubjectPageData(subject)
  
  if (!subjectPageData) {
      return generateSEOMetadata({
      title: 'Subject Not Found - CIE IGCSE Notes',
      description: 'The requested subject page could not be found.'
      })
    }

    // Get global SEO settings as fallback
    const globalSEO = await getGlobalSEOSettings()
    
    // Use subject page SEO data if available, otherwise fall back to global SEO
    const seoData = subjectPageData.seo || globalSEO

    return generateSEOMetadata({
      title: `${subjectPageData.pageTitle} - CIE IGCSE Notes`,
      description: subjectPageData.pageDescription,
      seoData,
    })
  } catch (error) {
    console.error('Error generating subject page metadata:', error)
    
    // Return basic metadata if there's an error
    return generateSEOMetadata({
      title: 'IGCSE Notes - CIE Study Materials',
      description: 'Access comprehensive IGCSE study notes and revision materials.',
    })
  }
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subject } = await params
  const headerData = await getHeaderData()
  const footerData = await getFooterData()
  const subjectPageData = await getSubjectPageData(subject)

  if (!subjectPageData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header headerData={headerData} />
      <main>
        {/* Hero Section */}
        <section className={`${subjectPageData.heroBackgroundColor} py-16`}>
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {subjectPageData.pageTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {subjectPageData.pageDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Topics Grid Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <SubjectTopicGrid topics={subjectPageData.topics} />
          </div>
        </section>
      </main>
      <Footer footerData={footerData} />
    </div>
  )
} 