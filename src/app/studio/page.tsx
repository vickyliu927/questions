'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudioRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the structure tool by default
    router.replace('/studio/structure')
  }, [router])

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