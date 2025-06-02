const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cie-igcse-notes.vercel.app'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /studio/
Disallow: /api/

# Disallow sensitive or irrelevant directories
Disallow: /_next/
Disallow: /.*

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional, helps with server load)
Crawl-delay: 1`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=86400', // Cache for 24 hours
    },
  })
} 