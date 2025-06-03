'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { SEOData } from '../types/sanity'

interface SEOContextType {
  seoData?: SEOData
  noFollowExternal: boolean
}

const SEOContext = createContext<SEOContextType>({
  noFollowExternal: false
})

interface SEOProviderProps {
  children: ReactNode
  seoData?: SEOData
}

export function SEOProvider({ children, seoData }: SEOProviderProps) {
  const contextValue: SEOContextType = {
    seoData,
    noFollowExternal: seoData?.noFollowExternal || false
  }

  return (
    <SEOContext.Provider value={contextValue}>
      {children}
    </SEOContext.Provider>
  )
}

export function useSEO() {
  return useContext(SEOContext)
} 