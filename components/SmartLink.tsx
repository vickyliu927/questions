'use client'

import React from 'react'
import Link from 'next/link'
import { useSEO } from '../contexts/SEOContext'
import { generateLinkRel, shouldOpenInNewTab } from '../lib/seo-utils'

// Define allowed HTML attributes for links
type HTMLLinkAttributes = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'className'>

interface SmartLinkProps extends HTMLLinkAttributes {
  href: string
  children: React.ReactNode
  className?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}

export function SmartLink({ 
  href, 
  children, 
  className, 
  target,
  rel,
  ...otherProps 
}: SmartLinkProps) {
  const { noFollowExternal } = useSEO()
  
  // Generate the appropriate rel attribute
  const autoRel = generateLinkRel(href, noFollowExternal)
  
  // Use provided rel or auto-generated rel
  const finalRel = rel || autoRel
  
  // Determine target automatically if not provided
  const autoTarget = target || (shouldOpenInNewTab(href) ? '_blank' : undefined)
  
  return (
    <Link
      href={href}
      target={autoTarget}
      rel={finalRel || undefined}
      className={className}
      {...otherProps}
    >
      {children}
    </Link>
  )
}

// For cases where you need a regular anchor tag instead of Next.js Link
interface SmartAnchorProps extends HTMLLinkAttributes {
  href: string
  children: React.ReactNode
  className?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
}

export function SmartAnchor({ 
  href, 
  children, 
  className, 
  target,
  rel,
  ...otherProps 
}: SmartAnchorProps) {
  const { noFollowExternal } = useSEO()
  
  // Generate the appropriate rel attribute
  const autoRel = generateLinkRel(href, noFollowExternal)
  
  // Use provided rel or auto-generated rel
  const finalRel = rel || autoRel
  
  // Determine target automatically if not provided
  const autoTarget = target || (shouldOpenInNewTab(href) ? '_blank' : undefined)
  
  return (
    <a
      href={href}
      target={autoTarget}
      rel={finalRel || undefined}
      className={className}
      {...otherProps}
    >
      {children}
    </a>
  )
} 