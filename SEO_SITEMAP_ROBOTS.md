# SEO: Sitemap and Robots.txt Implementation

This document explains the implementation of dynamic sitemap.xml and robots.txt files for the CIE IGCSE Notes website.

## Overview

The website uses Next.js 13+ App Router to generate dynamic SEO files that automatically update when new subjects are added to the Sanity CMS.

## Files Created

### 1. Dynamic Sitemap (`/src/app/sitemap.xml/route.ts`)

**Purpose**: Generates an XML sitemap that includes all published subject pages from Sanity CMS.

**Features**:
- Fetches all published subject slugs from Sanity using `allSubjectSlugsQuery`
- Includes homepage with priority 1.0
- Includes all subject pages with priority 0.8
- Sets appropriate `lastmod`, `changefreq`, and `priority` values
- Implements caching headers for performance
- Includes error handling with fallback sitemap

**URL**: `https://your-domain.com/sitemap.xml`

**Example Output**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cie-igcse-notes.vercel.app</loc>
    <lastmod>2025-06-02T16:41:44.249Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://cie-igcse-notes.vercel.app/maths</loc>
    <lastmod>2025-06-02T16:41:44.249Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Additional subject pages... -->
</urlset>
```

### 2. Dynamic Robots.txt (`/src/app/robots.txt/route.ts`)

**Purpose**: Generates a robots.txt file with appropriate crawling directives.

**Features**:
- Allows all crawlers to access the site
- Disallows access to admin areas (`/studio/`, `/api/`)
- Disallows access to Next.js internal directories
- References the dynamic sitemap
- Includes crawl delay for server load management
- Implements caching headers

**URL**: `https://your-domain.com/robots.txt`

**Output**:
```
User-agent: *
Allow: /

# Disallow admin areas
Disallow: /studio/
Disallow: /api/

# Disallow sensitive or irrelevant directories
Disallow: /_next/
Disallow: /.*

# Sitemap
Sitemap: https://cie-igcse-notes.vercel.app/sitemap.xml

# Crawl delay (optional, helps with server load)
Crawl-delay: 1
```

## Configuration

### Environment Variables

The files use the `NEXT_PUBLIC_SITE_URL` environment variable for the base URL:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If not set, it defaults to `https://cie-igcse-notes.vercel.app`.

### Sanity Integration

The sitemap automatically fetches published subjects using the existing Sanity query:

```typescript
export const allSubjectSlugsQuery = `*[_type == "subjectPage" && isPublished == true].subjectSlug.current`
```

## Benefits

1. **Dynamic Updates**: Sitemap automatically updates when new subjects are published in Sanity
2. **SEO Optimization**: Proper priority and frequency settings for search engines
3. **Performance**: Caching headers reduce server load
4. **Error Handling**: Fallback sitemap ensures functionality even if Sanity is unavailable
5. **Security**: Robots.txt properly blocks access to sensitive areas

## Testing

You can test the endpoints locally:

```bash
# Test robots.txt
curl http://localhost:3000/robots.txt

# Test sitemap.xml
curl http://localhost:3000/sitemap.xml
```

## Deployment Notes

- These routes work automatically in production
- No additional configuration needed for Vercel deployment
- Search engines will automatically discover the sitemap via robots.txt
- Consider submitting the sitemap directly to Google Search Console for faster indexing

## Maintenance

- No manual maintenance required
- Sitemap updates automatically when subjects are added/removed in Sanity
- Monitor server logs for any errors in sitemap generation
- Update the base URL in environment variables when changing domains 