import { Metadata } from 'next'
import { SEOData } from '../types/sanity'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonicalUrl?: string
  seoData?: SEOData
  fallbackImage?: string
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  seoData,
  fallbackImage = '/images/default-og-image.jpg'
}: SEOHeadProps): Metadata {
  // Use SEO data if available, otherwise fall back to props
  const metaTitle = seoData?.metaTitle || title || 'CIE IGCSE Notes'
  const metaDescription = seoData?.metaDescription || description || 'Comprehensive IGCSE study notes and resources'
  const metaKeywords = seoData?.metaKeywords || keywords
  const ogTitle = seoData?.ogTitle || metaTitle
  const ogDescription = seoData?.ogDescription || metaDescription
  const twitterTitle = seoData?.twitterTitle || ogTitle
  const twitterDescription = seoData?.twitterDescription || ogDescription
  
  // Get image URLs - check both url property and asset.url
  const ogImageUrl = seoData?.ogImage?.url || seoData?.ogImage?.asset?.url || fallbackImage
  const twitterImageUrl = seoData?.twitterImage?.url || seoData?.twitterImage?.asset?.url || ogImageUrl
  
  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seoData?.ogImage?.alt || ogTitle,
        },
      ],
      type: 'website',
      siteName: 'CIE IGCSE Notes',
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: [
        {
          url: twitterImageUrl,
          alt: seoData?.twitterImage?.alt || twitterTitle,
        },
      ],
    },
    robots: {
      index: !seoData?.noIndex,
      follow: !seoData?.noFollow,
    },
  }

  // Add canonical URL if provided
  if (canonicalUrl || seoData?.canonicalUrl) {
    metadata.alternates = {
      canonical: seoData?.canonicalUrl || canonicalUrl,
    }
  }

  return metadata
} 