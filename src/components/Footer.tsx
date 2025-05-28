import { FooterData } from '../../types/sanity'

// Fallback data for when Sanity data is not available
const fallbackFooterData: FooterData = {
  _id: 'fallback',
  title: 'Fallback Footer',
  isActive: true,
  websiteTitle: 'CIE IGCSE Study Notes',
  websiteDescription: 'Empowering students to achieve excellence in their IGCSE examinations through comprehensive study materials and expert guidance.',
  quickLinks: {
    sectionTitle: 'Quick Links',
    links: [
      { label: 'All Subjects', href: '#' },
      { label: 'Past Papers', href: '#' },
      { label: 'Revision Guides', href: '#' },
      { label: 'Practice Tests', href: '#' },
      { label: 'Study Tips', href: '#' }
    ]
  },
  popularSubjects: {
    sectionTitle: 'Popular Subjects',
    links: [
      { label: 'Mathematics', href: '#' },
      { label: 'Physics', href: '#' },
      { label: 'Chemistry', href: '#' },
      { label: 'Biology', href: '#' },
      { label: 'English', href: '#' }
    ]
  },
  layoutSettings: {
    adaptiveSpacing: true,
    showCopyright: true,
    copyrightText: ''
  }
}

// Social media icons components
const SocialIcons = {
  Facebook: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  Twitter: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  ),
  Instagram: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.897-.875-1.387-2.026-1.387-3.323s.49-2.448 1.297-3.323c.875-.897 2.026-1.387 3.323-1.387s2.448.49 3.323 1.297c.897.875 1.387 2.026 1.387 3.323s-.49 2.448-1.297 3.323c-.875.897-2.026 1.387-3.323 1.387z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  YouTube: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

interface FooterProps {
  footerData?: FooterData
}

export default function Footer({ footerData }: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Use provided data or fallback data
  const data = footerData || fallbackFooterData

  // Check if support section should be displayed with proper null checks
  const shouldShowSupport = data.support && 
                           data.support.links && 
                           Array.isArray(data.support.links) &&
                           data.support.links.length > 0 && 
                           data.support.sectionTitle

  // Determine if adaptive spacing should be used
  const useAdaptiveSpacing = data.layoutSettings?.adaptiveSpacing && !shouldShowSupport

  // Determine grid columns based on sections
  const getGridClasses = () => {
    if (useAdaptiveSpacing) {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // 3 columns: company info + 2 sections
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" // 4 columns: company info + 3 sections
  }

  return (
    <footer className="bg-muted/50 border-t">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={getGridClasses()}>
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              {data.websiteTitle || 'CIE IGCSE Study Notes'}
            </h4>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {data.websiteDescription || 'Empowering students to achieve excellence in their IGCSE examinations through comprehensive study materials and expert guidance.'}
            </p>
            
            {/* Social Media Links */}
            {data.socialMedia && (
              <div className="flex space-x-4">
                {data.socialMedia.facebook && (
                  <a 
                    href={data.socialMedia.facebook}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcons.Facebook />
                  </a>
                )}
                {data.socialMedia.twitter && (
                  <a 
                    href={data.socialMedia.twitter}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcons.Twitter />
                  </a>
                )}
                {data.socialMedia.instagram && (
                  <a 
                    href={data.socialMedia.instagram}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcons.Instagram />
                  </a>
                )}
                {data.socialMedia.linkedin && (
                  <a 
                    href={data.socialMedia.linkedin}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcons.LinkedIn />
                  </a>
                )}
                {data.socialMedia.youtube && (
                  <a 
                    href={data.socialMedia.youtube}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcons.YouTube />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {data.quickLinks?.sectionTitle || 'Quick Links'}
            </h5>
            <ul className="space-y-3">
              {data.quickLinks?.links?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              )) || []}
            </ul>
          </div>

          {/* Popular Subjects */}
          <div>
            <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              {data.popularSubjects?.sectionTitle || 'Popular Subjects'}
            </h5>
            <ul className="space-y-3">
              {data.popularSubjects?.links?.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              )) || []}
            </ul>
          </div>

          {/* Support - Only render if it has content */}
          {shouldShowSupport && (
            <div>
              <h5 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {data.support!.sectionTitle}
              </h5>
              <ul className="space-y-3">
                {data.support!.links?.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                )) || []}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      {data.layoutSettings?.showCopyright && (
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                {data.layoutSettings?.copyrightText || 
                 `© ${currentYear} ${data.websiteTitle || 'CIE IGCSE Study Notes'}. All rights reserved.`}
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
} 