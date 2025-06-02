const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cie-igcse-notes.vercel.app'

export async function GET() {
  const robotsTxt = `Sitemap: ${baseUrl}/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 's-maxage=60', // Cache for 60 seconds, consistent with page revalidation
    },
  })
} 