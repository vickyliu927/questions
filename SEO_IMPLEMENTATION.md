# SEO Implementation Guide

This guide explains the comprehensive SEO implementation for the CIE IGCSE Notes website, covering all pages including the homepage and subject pages.

## Overview

The SEO system provides:
- ✅ Meta titles and descriptions
- ✅ Open Graph tags for social media
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Keywords optimization
- ✅ Robots meta tags (noindex/nofollow)
- ✅ Custom images for social sharing
- ✅ Global SEO fallbacks
- ✅ Page-specific SEO overrides

## Schema Structure

### 1. SEO Fields Schema (`sanity/schemas/seo.ts`)

The reusable SEO schema includes:
- **Meta Title** (50-60 characters recommended)
- **Meta Description** (150-160 characters recommended)
- **Meta Keywords** (comma-separated)
- **Open Graph Title/Description/Image**
- **Twitter Title/Description/Image**
- **Canonical URL**
- **No Index/No Follow flags**

### 2. Global SEO Settings (`seoSettings` document type)

Create global SEO defaults that apply to all pages unless overridden:
- Set `isGlobal: true` for default settings
- Used as fallback when page-specific SEO is not configured

### 3. Homepage SEO (`homepage` document type)

Homepage-specific SEO configuration:
- Page title and description
- Complete SEO meta tags
- Section visibility controls

### 4. Subject Page SEO (`subjectPage` document type)

Subject-specific SEO configuration:
- Subject-specific meta tags
- Custom social sharing images
- Subject-focused keywords

## Implementation Details

### 1. SEO Component (`components/SEOHead.tsx`)

```typescript
// Generate metadata for Next.js 13+ app router
export function generateSEOMetadata({
  title,
  description,
  keywords,
  canonicalUrl,
  seoData,
  fallbackImage
}: SEOHeadProps): Metadata
```

Features:
- Automatic fallbacks for missing data
- Image URL handling for Sanity images
- Proper Open Graph and Twitter Card generation
- Robots meta tag configuration

### 2. Homepage SEO (`src/app/page.tsx`)

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const homepageData = await getHomepageData();
  const globalSEO = await getGlobalSEOSettings();
  
  const seoData = homepageData?.seo || globalSEO;
  
  return generateSEOMetadata({
    title: homepageData?.pageTitle || 'Default Title',
    description: homepageData?.pageDescription || 'Default Description',
    seoData,
  });
}
```

### 3. Subject Page SEO (`src/app/[subject]/page.tsx`)

```typescript
export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const subjectPageData = await getSubjectPageData(subject);
  const globalSEO = await getGlobalSEOSettings();
  
  const seoData = subjectPageData.seo || globalSEO;
  
  return generateSEOMetadata({
    title: `${subjectPageData.pageTitle} - CIE IGCSE Notes`,
    description: subjectPageData.pageDescription,
    canonicalUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/${subject}`,
    seoData,
  });
}
```

## Sanity Studio Configuration

### 1. Create Global SEO Settings

1. Go to Sanity Studio → SEO Settings
2. Create a new document
3. Set `isGlobal: true`
4. Configure default meta tags, images, and settings

### 2. Configure Homepage SEO

1. Go to Sanity Studio → Homepage
2. Create/edit homepage configuration
3. Fill in page title and description
4. Configure SEO section with:
   - Custom meta title/description
   - Social sharing images
   - Keywords

### 3. Configure Subject Page SEO

1. Go to Sanity Studio → Subject Page
2. For each subject, configure:
   - Subject-specific meta tags
   - Custom social sharing images
   - Subject-focused keywords
   - Canonical URLs

## Environment Variables

Add to your `.env.local`:

```bash
# Site Configuration (for SEO)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token
```

## SEO Best Practices Implemented

### 1. Title Optimization
- Homepage: "CIE IGCSE Notes - Comprehensive Study Resources"
- Subject pages: "{Subject Name} - CIE IGCSE Notes"
- Fallbacks for missing data

### 2. Description Optimization
- Descriptive, action-oriented descriptions
- Include relevant keywords naturally
- Stay within 150-160 character limit

### 3. Keywords Strategy
- Homepage: General IGCSE terms
- Subject pages: Subject-specific terms
- Include: "IGCSE", "CIE", "notes", "study materials", "exam preparation"

### 4. Social Media Optimization
- Open Graph tags for Facebook, LinkedIn
- Twitter Card tags for Twitter
- Custom images (1200x630px for OG, 1024x512px for Twitter)
- Fallback images when custom images not set

### 5. Technical SEO
- Canonical URLs to prevent duplicate content
- Robots meta tags for indexing control
- Proper image alt text
- Structured metadata

## Testing SEO Implementation

### 1. Meta Tags Testing
- View page source to verify meta tags
- Use browser dev tools to inspect `<head>` section

### 2. Social Media Testing
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### 3. SEO Tools
- Google Search Console
- SEMrush Site Audit
- Ahrefs Site Explorer
- Screaming Frog SEO Spider

## Troubleshooting

### 1. Missing Meta Tags
- Check if SEO data is properly fetched from Sanity
- Verify environment variables are set
- Check for JavaScript errors in browser console

### 2. Images Not Loading
- Verify Sanity image URLs are correct
- Check image permissions in Sanity
- Ensure fallback images exist in `/public/images/`

### 3. Canonical URLs
- Verify `NEXT_PUBLIC_SITE_URL` is set correctly
- Check canonical URL format in generated HTML

## Future Enhancements

1. **JSON-LD Structured Data**
   - Add schema.org markup for better search results
   - Implement breadcrumb structured data

2. **Advanced SEO Features**
   - XML sitemap generation
   - Robots.txt optimization
   - Meta robots advanced directives

3. **Performance SEO**
   - Image optimization for social sharing
   - Core Web Vitals optimization
   - Page speed improvements

## Maintenance

1. **Regular SEO Audits**
   - Monthly review of meta tags
   - Check for missing or duplicate content
   - Monitor search console for issues

2. **Content Updates**
   - Update meta descriptions for better CTR
   - Refresh keywords based on search trends
   - Add new social sharing images

3. **Technical Monitoring**
   - Monitor canonical URL changes
   - Check for broken social media previews
   - Verify robots meta tag configurations 