# Footer Schema Documentation

## Overview

The Footer schema provides a comprehensive and flexible structure for managing website footer content through Sanity CMS. It includes editable text fields, navigation links, social media icons, and adaptive layout settings.

## Schema Structure

### Core Fields

#### Document Management
- **Document Title**: Internal title for organizing multiple footer configurations
- **Is Active**: Toggle to activate/deactivate footer configurations (only one should be active)

#### Website Information
- **Website Title**: Main title displayed in the footer (max 100 characters)
- **Website Description**: Brief description of the website (max 300 characters)

### Navigation Sections

#### Quick Links Section (Required)
- **Section Title**: Customizable title (default: "Quick Links", max 50 characters)
- **Links**: Array of navigation links (max 10 links)
  - **Link Text**: Display text for the link
  - **Link URL**: URL or path for the link

#### Popular Subjects Section (Required)
- **Section Title**: Customizable title (default: "Popular Subjects", max 50 characters)
- **Subject Links**: Array of subject links (max 15 links)
  - **Subject Name**: Name of the subject (e.g., "Mathematics", "Physics")
  - **Subject URL**: URL or path to the subject page

#### Support Section (Optional)
- **Section Title**: Customizable title (default: "Support")
- **Support Links**: Array of support links (max 10 links)
  - **Link Text**: Display text for the support link
  - **Link URL**: URL or path for the support link

### Optional Features

#### Social Media Icons (Optional)
- **Facebook URL**: Facebook page URL
- **Twitter/X URL**: Twitter/X profile URL
- **Instagram URL**: Instagram profile URL
- **LinkedIn URL**: LinkedIn profile URL
- **YouTube URL**: YouTube channel URL

All social media URLs are validated to ensure proper URL format.

#### Layout Settings
- **Adaptive Spacing**: When enabled, Quick Links and Popular Subjects distribute space evenly when Support section is empty
- **Show Copyright**: Toggle to display copyright notice
- **Copyright Text**: Custom copyright text (leave empty for auto-generated)

## Layout Behavior

### Fixed Positioning
When all three sections (Quick Links, Popular Subjects, Support) have content:
- All sections maintain fixed positions
- Equal spacing between sections
- Consistent layout structure

### Adaptive Positioning
When the Support section is empty and Adaptive Spacing is enabled:
- Quick Links and Popular Subjects sections distribute available space evenly
- Balanced visual appearance
- Responsive spacing adjustment

## Usage Examples

### Basic Footer Configuration
```typescript
{
  title: "Main Footer",
  isActive: true,
  websiteTitle: "CIE IGCSE Notes",
  websiteDescription: "Comprehensive study notes and resources for CIE IGCSE examinations",
  quickLinks: {
    sectionTitle: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ]
  },
  popularSubjects: {
    sectionTitle: "Popular Subjects",
    links: [
      { label: "Mathematics", href: "/subjects/mathematics" },
      { label: "Physics", href: "/subjects/physics" },
      { label: "Chemistry", href: "/subjects/chemistry" }
    ]
  }
}
```

### Footer with Support Section
```typescript
{
  // ... basic configuration
  support: {
    sectionTitle: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Support", href: "/support" }
    ]
  }
}
```

### Footer with Social Media
```typescript
{
  // ... basic configuration
  socialMedia: {
    facebook: "https://facebook.com/yourpage",
    twitter: "https://twitter.com/yourhandle",
    instagram: "https://instagram.com/yourprofile"
  }
}
```

## TypeScript Types

The schema includes corresponding TypeScript types for frontend development:

```typescript
interface FooterData {
  _id: string
  title: string
  isActive: boolean
  websiteTitle: string
  websiteDescription: string
  quickLinks: FooterSection
  popularSubjects: FooterSection
  support?: FooterSection
  socialMedia?: FooterSocialMedia
  layoutSettings: FooterLayoutSettings
}
```

## Best Practices

### Content Guidelines
1. Keep website title concise and memorable
2. Write clear, informative descriptions
3. Use descriptive link labels
4. Organize links logically within sections
5. Limit the number of links to avoid clutter

### Layout Considerations
1. Enable adaptive spacing for better visual balance when support section is empty
2. Use consistent naming for section titles
3. Test footer appearance with and without optional sections
4. Consider mobile responsiveness when designing link layouts

### SEO and Accessibility
1. Use descriptive link text for better accessibility
2. Ensure all URLs are valid and functional
3. Include relevant internal links for better site navigation
4. Consider adding structured data for organization information

## Implementation Notes

### Frontend Integration
1. Fetch footer data using Sanity client
2. Check `isActive` field to determine which footer to display
3. Handle optional sections gracefully in your components
4. Implement adaptive spacing logic based on `layoutSettings.adaptiveSpacing`
5. Validate social media URLs before rendering icons

### Handling Empty Support Section
The support section should only be displayed when it has both a title and links. Use this logic in your frontend:

```typescript
// Check if support section should be displayed
const shouldShowSupport = (support?: FooterSection | null) => {
  return support && support.links && support.links.length > 0 && support.sectionTitle
}

// Example usage in React component
const Footer = ({ footerData }: { footerData: FooterData }) => {
  const showSupport = shouldShowSupport(footerData.support)
  const adaptiveSpacing = footerData.layoutSettings.adaptiveSpacing && !showSupport
  
  return (
    <footer>
      <div className={`footer-sections ${adaptiveSpacing ? 'adaptive-spacing' : 'fixed-spacing'}`}>
        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>{footerData.quickLinks.sectionTitle}</h3>
          {/* render links */}
        </div>
        
        {/* Popular Subjects Section */}
        <div className="footer-section">
          <h3>{footerData.popularSubjects.sectionTitle}</h3>
          {/* render links */}
        </div>
        
        {/* Support Section - only render if it has content */}
        {showSupport && (
          <div className="footer-section">
            <h3>{footerData.support!.sectionTitle}</h3>
            {/* render links */}
          </div>
        )}
      </div>
    </footer>
  )
}
```

### CSS for Adaptive Spacing
```css
.footer-sections.adaptive-spacing {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns when support is hidden */
  gap: 2rem;
}

.footer-sections.fixed-spacing {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Three equal columns when all sections visible */
  gap: 2rem;
}
```

### Content Management
1. Only one footer configuration should be active at a time
2. Use descriptive document titles for easy identification
3. Regularly review and update links for accuracy
4. Test footer appearance after content changes

## Validation Rules

- Website title: Required, max 100 characters
- Website description: Required, max 300 characters
- Section titles: Required for Quick Links and Popular Subjects, max 50 characters
- Links: All link text and URLs are required
- Social media URLs: Must be valid HTTP/HTTPS URLs
- Link limits: Quick Links (10), Popular Subjects (15), Support (10)

## Schema File Location

The footer schema is located at: `sanity/schemas/footer.ts`

Type definitions are available at: `types/sanity.ts`

## Troubleshooting

### Support Section Still Appearing When Empty

If the support section is still appearing on your website even when left blank, check the following:

1. **Frontend Implementation**: Ensure your frontend code checks if the support section has content before rendering it:
   ```typescript
   const shouldShowSupport = footerData.support && 
                            footerData.support.links && 
                            footerData.support.links.length > 0
   ```

2. **Sanity Data**: In Sanity Studio, make sure the Support Links array is completely empty (no items added).

3. **Cache Issues**: Clear your browser cache and any CDN cache if the old data is still being served.

4. **Data Fetching**: Verify that your data fetching logic properly handles the optional support field.

### Adaptive Spacing Not Working

If the adaptive spacing isn't working when the support section is empty:

1. Check that `layoutSettings.adaptiveSpacing` is set to `true` in Sanity
2. Ensure your CSS properly handles the adaptive spacing classes
3. Verify that your frontend logic correctly detects when support section is empty

### Links Not Displaying Correctly

1. Ensure all required fields (label and href) are filled in Sanity
2. Check that URLs are properly formatted (include http:// or https:// for external links)
3. Verify that your frontend component properly maps over the links array 