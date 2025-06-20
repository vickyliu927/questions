import { client, allSubjectSlugsQuery } from '../../../lib/sanity'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cie-igcse-notes.vercel.app'

export async function GET() {
  try {
    // Fetch all published subject slugs from Sanity
    const subjectSlugs: string[] = await client.fetch(allSubjectSlugsQuery)
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${subjectSlugs.map(slug => `  <url>
    <loc>${baseUrl}/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=60', // Cache for 60 seconds, consistent with page revalidation
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return a basic sitemap with just the homepage if there's an error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
} 