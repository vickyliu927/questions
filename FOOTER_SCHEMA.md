# Footer Schema Documentation

This document describes the Footer schema configuration in Sanity CMS for the CIE IGCSE Notes website.

## Overview

The Footer schema allows you to configure the website footer with customizable sections, links, and layout options. It includes adaptive spacing that automatically adjusts based on which optional sections are enabled.

## Schema Fields

### Document Management
- **Title** (required): Internal title for organizing footer configurations
- **Is Active** (boolean): Toggle to activate this footer configuration (only one should be active)

### Website Information
- **Website Title** (required): Main title displayed in footer (max 100 characters)
- **Website Description** (required): Brief description shown in footer (max 300 characters)

### Navigation Sections

#### Quick Links Section (Optional)
- **Section Title**: Title for the Quick Links section (e.g., "Quick Links")
- **Links**: Array of navigation links (max 10 links)
  - **Link Text**: Display text for the link
  - **Link URL**: URL or path (e.g., /subjects, #contact, https://example.com)

**Note**: This section is completely optional. Leave the links array empty to hide the entire Quick Links section. The footer layout will automatically adjust to distribute the remaining sections evenly.

#### Popular Subjects Section (Optional)
- **Section Title**: Title for the Popular Subjects section (e.g., "Popular Subjects")
- **Subject Links**: Array of subject links (max 15 links)
  - **Subject Name**: Name of the subject
  - **Subject URL**: URL or path to the subject page

**Note**: This section is completely optional. Leave the links array empty to hide the entire Popular Subjects section. The footer layout will automatically adjust to distribute the remaining sections evenly.

#### Support Section (Optional)
- **Section Title**: Title for the Support section (e.g., "Support", "Help")
- **Support Links**: Array of support and help links (max 10 links)
  - **Link Text**: Display text for the support link
  - **Link URL**: URL or path for the support link

**Note**: This section is completely optional. Leave empty to hide the entire support section. When hidden, Quick Links and Popular Subjects will expand to fill the available space.

### Social Media (Optional)
Configure social media links that appear as icons:
- **Facebook**: Facebook page URL
- **Twitter**: Twitter profile URL
- **Instagram**: Instagram profile URL
- **LinkedIn**: LinkedIn page URL
- **YouTube**: YouTube channel URL

**Note**: Only social platforms with URLs will display. Empty fields are automatically hidden.

### Layout Settings
- **Adaptive Spacing** (boolean): Enable automatic layout adjustment when optional sections are hidden
- **Show Copyright** (boolean): Toggle copyright notice display
- **Copyright Text** (optional): Custom copyright text (falls back to automatic generation)

## Layout Behavior

The footer uses a responsive grid system that automatically adapts based on which sections are present:

### Desktop Layout (lg screens and above):
- **All sections present (5 columns)**: Logo | Quick Links | Popular Subjects | Support | Get in Touch
- **4 sections present**: Evenly distributed across 4 columns
- **3 sections present**: Evenly distributed across 3 columns  
- **2 sections present (minimum)**: Logo | Get in Touch

### Mobile/Tablet Layout:
- **Medium screens**: 2 columns with sections wrapping
- **Small screens**: Single column stack

## Conditional Logic

### Quick Links Section Display
The Quick Links section displays when:
- The `quickLinks` object exists
- The `links` array is not empty
- The `sectionTitle` is provided

### Popular Subjects Section Display
The Popular Subjects section displays when:
- The `popularSubjects` object exists
- The `links` array is not empty
- The `sectionTitle` is provided

### Support Section Display
The Support section displays when:
- The `support` object exists
- The `links` array is not empty
- The `sectionTitle` is provided

### Adaptive Spacing
When `adaptiveSpacing` is enabled (default), the footer automatically:
- Adjusts column count based on visible sections
- Redistributes spacing evenly
- Maintains visual balance

## Best Practices

1. **Content Management**:
   - Keep only one footer configuration active at a time
   - Use descriptive internal titles for easy management
   - Keep descriptions concise but informative

2. **Navigation Structure**:
   - Group related links logically in appropriate sections
   - Use clear, descriptive link labels
   - Ensure all URLs are valid and functional

3. **Optional Sections**:
   - Quick Links: Use for important site navigation
   - Support: Use for help, contact, and legal links
   - Leave empty if not needed - layout will adapt automatically

4. **Social Media**:
   - Only add platforms you actively maintain
   - Use complete URLs (including https://)
   - Test links to ensure they work correctly

5. **Mobile Optimization**:
   - Keep section titles short for mobile display
   - Limit number of links per section for readability
   - Test on various screen sizes

## Example Configuration

### Minimal Footer (Logo + Contact Only)
- Quick Links: Empty
- Popular Subjects: Empty
- Support: Empty
- Result: Clean 2-column layout

### Subject-focused Footer (Logo + Popular Subjects + Contact)
- Quick Links: Empty  
- Popular Subjects: 5-8 subject links
- Support: Empty
- Result: Clean 3-column layout

### Navigation-focused Footer (Logo + Quick Links + Contact)
- Quick Links: 6 navigation links
- Popular Subjects: Empty
- Support: Empty  
- Result: Clean 3-column layout

### Balanced Footer (Logo + Quick Links + Popular Subjects + Contact)
- Quick Links: 4 main navigation links
- Popular Subjects: 6 subject links
- Support: Empty
- Result: Balanced 4-column layout

### Full Footer (All Sections)
- Quick Links: 6 navigation links
- Popular Subjects: 8 subject links  
- Support: 6 help/legal links
- Result: Comprehensive 5-column layout

The schema automatically handles validation, ensures data consistency, and provides helpful descriptions for content editors.

## TypeScript Types

The schema includes corresponding TypeScript types for frontend development:

```typescript
interface FooterData {
  _id: string
  title: string
  isActive: boolean
  websiteTitle: string
  websiteDescription: string
  quickLinks?: FooterSection | null
  popularSubjects?: FooterSection | null
  support?: FooterSection | null
  socialMedia?: FooterSocialMedia
  layoutSettings: FooterLayoutSettings
}
```

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
          <h3>{footerData.quickLinks?.sectionTitle}</h3>
          {/* render links */}
        </div>
        
        {/* Popular Subjects Section */}
        <div className="footer-section">
          <h3>{footerData.popularSubjects?.sectionTitle}</h3>
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