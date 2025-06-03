/**
 * SEO utility functions for link handling and robots directives
 */

/**
 * Determines if a URL is an internal link (same domain) or external
 * @param url - The URL to check
 * @param currentDomain - The current domain (optional, will try to detect from window.location)
 * @returns boolean - true if internal, false if external
 */
export function isInternalLink(url: string, currentDomain?: string): boolean {
  try {
    // Handle relative URLs (always internal)
    if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) {
      return true;
    }
    
    // Handle protocol-relative URLs
    if (url.startsWith('//')) {
      url = 'https:' + url;
    }
    
    // If no protocol, assume it's a relative link
    if (!url.includes('://')) {
      return true;
    }
    
    const urlObj = new URL(url);
    
    // If we're in a browser environment, use window.location
    if (typeof window !== 'undefined' && !currentDomain) {
      currentDomain = window.location.hostname;
    }
    
    // If we still don't have a current domain, assume external for safety
    if (!currentDomain) {
      return false;
    }
    
    // Remove www. prefix for comparison
    const cleanCurrentDomain = currentDomain.replace(/^www\./, '');
    const cleanUrlDomain = urlObj.hostname.replace(/^www\./, '');
    
    return cleanUrlDomain === cleanCurrentDomain;
  } catch (error) {
    // If URL parsing fails, assume external for safety
    return false;
  }
}

/**
 * Generates the appropriate rel attribute for a link based on SEO settings
 * @param url - The URL of the link
 * @param noFollowExternal - Whether to add nofollow to external links
 * @param currentDomain - The current domain (optional)
 * @returns string - The rel attribute value
 */
export function generateLinkRel(
  url: string, 
  noFollowExternal: boolean = false, 
  currentDomain?: string
): string {
  const isInternal = isInternalLink(url, currentDomain);
  const relParts: string[] = [];
  
  // Always add noopener noreferrer for external links that open in new tab
  if (!isInternal) {
    relParts.push('noopener', 'noreferrer');
    
    // Add nofollow to external links if the setting is enabled
    if (noFollowExternal) {
      relParts.push('nofollow');
    }
  }
  
  return relParts.join(' ');
}

/**
 * Determines if a link should open in a new tab
 * External links typically should open in new tabs to keep users on your site
 * @param url - The URL to check
 * @param currentDomain - The current domain (optional)
 * @returns boolean - true if should open in new tab
 */
export function shouldOpenInNewTab(url: string, currentDomain?: string): boolean {
  return !isInternalLink(url, currentDomain);
} 