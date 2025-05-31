import { Metadata } from 'next'
import { SEOData } from '../types/sanity'

interface SEOHeadProps {
  title?: string
  description?: string
  seoData?: SEOData
}

export function generateSEOMetadata({
  title,
  description,
  seoData,
}: SEOHeadProps): Metadata {
  // Use SEO data if available, otherwise fall back to props
  const metaTitle = seoData?.metaTitle || title || 'CIE IGCSE Notes'
  const metaDescription = seoData?.metaDescription || description || 'Comprehensive IGCSE study notes and resources'
  
  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    robots: {
      index: true,
      follow: !seoData?.noFollow,
    },
  }

  return metadata
} 