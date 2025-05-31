# SEO Implementation Guide

This guide explains the simplified SEO implementation for the CIE IGCSE Notes website, covering the homepage and all subject pages.

## Overview

The SEO system provides:
- ✅ Meta titles and descriptions
- ✅ No follow link control
- ✅ Simple and easy-to-manage settings

## Schema Structure

### SEO Fields Schema (`sanity/schemas/seo.ts`)

The simplified SEO schema includes only three essential fields:
- **Meta Title** (50-60 characters recommended)
- **Meta Description** (150-160 characters recommended)  
- **No Follow Links** (toggle to prevent search engines from following links)

### Global SEO Settings (`seoSettings` document type)

Create global SEO defaults that apply to all pages unless overridden:
- Set `isGlobal: true` for default settings
- Used as fallback when page-specific SEO is not configured

### Homepage SEO (`homepage` document type)

Homepage-specific SEO configuration:
- Page title and description
- Dedicated SEO section with the three fields

### Subject Page SEO (`subjectPage` document type)

Subject-specific SEO configuration:
- Subject-specific meta tags
- Individual SEO control per subject

## Implementation Details

### SEO Component (`components/SEOHead.tsx`)

```typescript
export function generateSEOMetadata({
  title,
  description,
  seoData,
}: SEOHeadProps): Metadata
```

Features:
- Simple three-field configuration
- Automatic fallbacks for missing data
- Robots meta tag for no-follow control

### Homepage SEO (`src/app/page.tsx`)

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

### Subject Page SEO (`src/app/[subject]/page.tsx`)

```typescript
export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const subjectPageData = await getSubjectPageData(subject);
  const globalSEO = await getGlobalSEOSettings();
  
  const seoData = subjectPageData.seo || globalSEO;
  
  return generateSEOMetadata({
    title: `${subjectPageData.pageTitle} - CIE IGCSE Notes`,
    description: subjectPageData.pageDescription,
    seoData,
  });
}
```

## Sanity Studio Configuration

### 1. Create Global SEO Settings

1. Go to Sanity Studio → Global SEO Settings
2. Create a new document
3. Set `Use as Global Default: true`
4. Configure:
   - Meta Title (default site title)
   - Meta Description (default site description)
   - No Follow Links (usually false for global settings)

### 2. Configure Homepage SEO

1. Go to Sanity Studio → Homepage
2. Create/edit homepage configuration
3. Fill in page title and description
4. Configure SEO Settings section:
   - Meta Title (specific to homepage)
   - Meta Description (homepage-specific description)
   - No Follow Links (toggle as needed)

### 3. Configure Subject Page SEO

1. Go to Sanity Studio → Subject Page
2. For each subject, configure:
   - Meta Title (subject-specific title)
   - Meta Description (subject-specific description)
   - No Follow Links (per subject control)

## SEO Fields Explained

### Meta Title
- Appears in search results and browser tabs
- Keep between 50-60 characters
- Should be descriptive and include relevant keywords
- Example: "Mathematics IGCSE Notes - CIE Study Materials"

### Meta Description
- Appears in search results below the title
- Keep between 150-160 characters
- Should be compelling and describe the page content
- Example: "Comprehensive mathematics notes covering algebra, geometry, and statistics for CIE IGCSE students."

### No Follow Links
- When enabled, tells search engines not to follow links on this page
- Useful for pages you don't want to pass link equity
- Generally keep disabled (false) for most content pages
- Consider enabling for contact forms or temporary pages

## Testing SEO Implementation

### 1. Meta Tags Testing
- View page source to verify meta tags
- Use browser dev tools to inspect `<head>` section
- Check that titles and descriptions appear correctly

### 2. Search Console
- Submit your sitemap to Google Search Console
- Monitor how your pages appear in search results
- Check for any crawling issues

## Best Practices

### Title Optimization
- Homepage: "CIE IGCSE Notes - Comprehensive Study Resources"
- Subject pages: "{Subject Name} - CIE IGCSE Notes"
- Keep titles unique and descriptive

### Description Optimization
- Write compelling, action-oriented descriptions
- Include relevant keywords naturally
- Stay within character limits
- Make each description unique

### No Follow Usage
- Generally keep disabled for content pages
- Enable for non-content pages (contact, privacy policy)
- Use sparingly to avoid reducing site authority

## Maintenance

1. **Regular Reviews**
   - Check meta titles and descriptions monthly
   - Update descriptions to improve click-through rates
   - Ensure all new subjects have SEO configured

2. **Performance Monitoring**
   - Monitor search rankings for key terms
   - Track click-through rates in Search Console
   - Update content based on search performance

The simplified SEO system makes it easy to manage essential SEO settings without complexity, while ensuring all pages have proper search engine optimization. 