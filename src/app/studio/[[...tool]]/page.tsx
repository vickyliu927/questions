'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  console.log('Loading studio with full config...')
  console.log('Studio config:', config)
  
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
        <p>Try visiting <a href="/studio/structure">/studio/structure</a> directly.</p>
      </div>
    )
  }
} 