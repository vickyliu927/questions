# Mathematics Page Guide

## Overview

The mathematics page (`/maths`) is a dynamic page that displays mathematics topics in an interactive grid format. Each topic contains a dropdown menu with subtopics, and subtopics can have their own sub-subtopics for deeper hierarchical organization.

## Features

- **Topic Grids**: Clean cards displaying mathematics topics with colored headers and descriptions
- **Hierarchical Dropdowns**: Multi-level dropdown menus showing subtopics and sub-subtopics
- **Clickable Links**: Both subtopics and sub-subtopics can link to specific URLs
- **Coming Soon Support**: Any level can be marked as "Coming Soon" to disable links
- **Fully Editable**: All content is managed through Sanity CMS
- **SEO Optimized**: Meta titles, descriptions, and keywords configurable
- **Responsive Design**: Works on all device sizes

## Sanity CMS Configuration

### Accessing the Maths Page Settings

1. Log into your Sanity Studio
2. Navigate to "Maths Page" in the document types
3. Create a new maths page configuration or edit the existing one

### Setting Up Topics

Each topic requires:

- **Topic Name**: The main topic title (e.g., "Algebra", "Geometry")
- **Topic Description**: Brief description of what the topic covers
- **Color Theme**: Choose from predefined color options for the topic header
- **Display Order**: Number determining the order topics appear (lower numbers first)
- **Subtopics**: Array of subtopics within this topic

### Setting Up Subtopics

Each subtopic can have:

- **Subtopic Name**: The name of the subtopic (e.g., "Linear Equations", "Quadratic Functions")
- **Subtopic URL**: Direct URL (optional if has sub-subtopics)
- **Coming Soon**: Toggle to mark subtopic as coming soon
- **Sub-Subtopics**: Array of more specific topics within this subtopic

### Setting Up Sub-Subtopics

Each sub-subtopic requires:

- **Sub-Subtopic Name**: The specific topic name (e.g., "Solving Linear Equations", "Graphing Linear Functions")
- **Sub-Subtopic URL**: The URL to navigate to when clicked (required)
- **Coming Soon**: Toggle to mark sub-subtopic as coming soon

### Example Hierarchical Structure

```
Topic: Algebra
├── Linear Equations
│   ├── Solving Linear Equations (/maths/algebra/linear-equations/solving)
│   ├── Graphing Linear Functions (/maths/algebra/linear-equations/graphing)
│   └── Systems of Linear Equations (/maths/algebra/linear-equations/systems)
├── Quadratic Functions
│   ├── Factoring Quadratics (/maths/algebra/quadratics/factoring)
│   ├── Quadratic Formula (/maths/algebra/quadratics/formula)
│   └── Graphing Parabolas (/maths/algebra/quadratics/graphing)
└── Polynomials (/maths/algebra/polynomials) [Direct link, no sub-subtopics]

Topic: Geometry
├── Triangles
│   ├── Types of Triangles (/maths/geometry/triangles/types)
│   ├── Triangle Congruence (/maths/geometry/triangles/congruence)
│   └── Pythagorean Theorem (/maths/geometry/triangles/pythagorean)
└── Circles (/maths/geometry/circles) [Direct link]
```

## Technical Implementation

### File Structure

```
src/
├── app/
│   └── maths/
│       └── page.tsx                 # Main maths page
├── components/
│   ├── MathsTopicGrid.tsx          # Topic grid component with nested dropdowns
│   └── index.ts                    # Component exports
├── types/
│   └── sanity.ts                   # TypeScript interfaces
├── lib/
│   └── sanity.ts                   # Sanity queries
└── sanity/
    └── schemas/
        ├── mathsPage.ts            # Sanity schema with hierarchical structure
        └── index.ts                # Schema exports
```

### Key Components

1. **MathsTopicGrid**: Main component that renders the topic cards
2. **TopicCard**: Individual topic card with colored header and dropdown functionality
3. **SubtopicItem**: Handles both direct links and nested sub-subtopics
4. **Nested Dropdowns**: Multi-level expandable menus

### Data Flow

1. Page loads and fetches hierarchical data from Sanity using `mathsPageQuery`
2. Data is passed to `MathsTopicGrid` component
3. Component renders topic cards with colored headers
4. Users can expand dropdowns to see subtopics
5. Users can further expand subtopics to see sub-subtopics
6. All levels support direct navigation and "Coming Soon" states

## Customization Options

### Adding New Color Themes

Edit `sanity/schemas/mathsPage.ts` and add new color options:

```typescript
{
  name: 'color',
  title: 'Color Theme',
  type: 'string',
  options: {
    list: [
      // ... existing colors
      { title: 'Custom Color', value: 'bg-custom-500' }
    ]
  }
}
```

### Modifying Topic Card Layout

Edit `src/components/MathsTopicGrid.tsx` to customize:

- Card dimensions
- Header styling
- Typography
- Spacing
- Animations
- Dropdown behavior

### SEO Configuration

In Sanity, configure:

- **Meta Title**: Page title for search engines
- **Meta Description**: Page description for search results
- **Keywords**: SEO keywords for better discoverability

## Best Practices

### Content Organization

1. **Logical Hierarchy**: Organize content from general to specific
   - Topic → Subtopic → Sub-Subtopic
2. **Clear Naming**: Use descriptive names at all levels
3. **Consistent URLs**: Follow a consistent URL structure
4. **Progressive Disclosure**: Use sub-subtopics for detailed breakdowns

### URL Structure Recommendations

```
# Direct subtopic links (no sub-subtopics)
/maths/algebra/polynomials
/maths/geometry/circles

# Sub-subtopic structure
/maths/algebra/linear-equations/solving
/maths/algebra/linear-equations/graphing
/maths/algebra/quadratics/factoring
/maths/geometry/triangles/types
/maths/geometry/triangles/congruence
```

### Content Strategy

1. **Use Sub-Subtopics When**: 
   - A subtopic has multiple distinct concepts
   - Content is extensive and needs breakdown
   - Different skill levels or approaches exist

2. **Use Direct Links When**:
   - Content is concise and focused
   - No natural subdivisions exist
   - Simple, standalone topics

## User Experience Features

### Visual Hierarchy

- **Topic Level**: Colored header with topic name and description
- **Subtopic Level**: Standard dropdown items with right arrow for expandable items
- **Sub-Subtopic Level**: Indented items with left border for visual hierarchy

### Interactive Elements

- **Expandable Dropdowns**: Click to expand/collapse at any level
- **Visual Indicators**: Different icons for expandable vs. direct links
- **Coming Soon States**: Disabled styling for unavailable content
- **Hover Effects**: Smooth transitions and color changes

### Responsive Design

- **Mobile**: Single column layout with touch-friendly buttons
- **Tablet**: Two-column grid with optimized spacing
- **Desktop**: Three-column grid with hover effects

## Troubleshooting

### Common Issues

1. **Topics not displaying**: Check if maths page is marked as "Active" in Sanity
2. **Dropdown not working**: Ensure JavaScript is enabled and no console errors
3. **Broken links**: Verify all URLs are valid and accessible
4. **Missing sub-subtopics**: Check that sub-subtopic arrays are properly configured

### Development Tips

1. **Local Testing**: Use Sanity's preview mode to test changes before publishing
2. **Content Validation**: Schema includes validation rules to prevent errors
3. **Responsive Testing**: Test dropdown behavior on various screen sizes
4. **Performance**: Monitor page load times with nested data structures

## Future Enhancements

Potential improvements to consider:

1. **Search Functionality**: Add search/filter across all levels
2. **Breadcrumb Navigation**: Show current location in hierarchy
3. **Progress Tracking**: Track completion at sub-subtopic level
4. **Bookmarking**: Allow users to save specific sub-subtopics
5. **Related Content**: Show related topics across different subjects
6. **Difficulty Indicators**: Add complexity levels to sub-subtopics

## Support

For technical issues or questions about the maths page implementation, refer to:

1. Sanity documentation for CMS-related questions
2. Next.js documentation for routing and page structure
3. Tailwind CSS documentation for styling modifications
4. Component source code for detailed implementation understanding 