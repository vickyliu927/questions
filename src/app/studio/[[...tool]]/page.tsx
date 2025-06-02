'use client'

import { NextStudio } from 'next-sanity/studio'
import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import config from '../../../../sanity.config'

export default function StudioPage() {
  const router = useRouter()
  const params = useParams()
  const tool = params?.tool as string[] | undefined

  console.log('Loading studio with full config...')
  console.log('Studio config:', config)
  console.log('Tool params:', tool)

  useEffect(() => {
    // If no tool is specified (empty array or undefined), redirect to structure
    if (!tool || tool.length === 0) {
      console.log('No tool specified, redirecting to structure...')
      router.replace('/studio/structure')
      return
    }
  }, [tool, router])

  // Show loading while redirecting
  if (!tool || tool.length === 0) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading Sanity Studio...</h2>
          <p>Redirecting to studio interface...</p>
        </div>
      </div>
    )
  }
  
  try {
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <NextStudio config={config} />
      </div>
    )
  } catch (error) {
    console.error('Studio error:', error)
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Studio Loading Error</h1>
        <p>There was an error loading the Sanity Studio. Please check the console for details.</p>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
        <p>Try visiting <Link href="/studio/structure" target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>/studio/structure</Link> directly.</p>
      </div>
    )
  }
} 