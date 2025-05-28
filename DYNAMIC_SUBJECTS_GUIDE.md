# Dynamic Subject Pages System

This guide explains how to use the new dynamic subject pages system that allows you to create subject pages through Sanity CMS that automatically appear on your website with URLs like `/maths`, `/physics`, `/chemistry`, etc.

## Overview

The dynamic subject system allows you to:
- Create subject pages through Sanity CMS with custom URLs
- Automatically display them on the homepage subject grid
- Include them in the `/subjects` page
- Generate SEO-optimized pages with custom metadata
- Use a hierarchical topic structure (Topic → Subtopic → Sub-Subtopic)

## How It Works

### 1. Subject Page Schema

The system uses a new `subjectPage` schema in Sanity that includes:
- **Subject Slug**: URL-friendly identifier (e.g., "maths", "physics")
- **Subject Name**: Full display name (e.g., "Mathematics", "Physics")
- **Page Content**: Title, description, hero background color
- **Topics**: Hierarchical structure with subtopics and sub-subtopics
- **SEO Settings**: Meta title, description, keywords
- **Publishing Status**: Control whether the page is live

### 2. Dynamic Routing

- Pages are automatically generated at `/{subject-slug}`
- URLs are determined by the "Subject Slug" field in Sanity
- Static generation ensures fast loading times
- 404 pages for unpublished or non-existent subjects

### 3. Automatic Integration

- Published subjects automatically appear in the homepage subject grid
- They're included in the `/subjects` page listing
- Links are automatically updated to use the dynamic URLs
- Existing static subjects (like the legacy `/maths` page) continue to work

## Creating a New Subject Page

### Step 1: Access Sanity Studio

1. Go to your Sanity Studio (usually at `/studio`)
2. Navigate to "Subject Page" in the content types

### Step 2: Create New Subject Page

1. Click "Create new Subject Page"
2. Fill in the required fields:

#### Basic Information
- **Internal Title**: For organization (e.g., "Physics Page Configuration")
- **Subject Slug**: URL identifier (e.g., "physics" → `/physics`)
- **Subject Name**: Display name (e.g., "Physics")
- **Page Title**: Main heading on the page
- **Page Description**: Subtitle/description text

#### Visual Settings
- **Hero Background Color**: Choose from predefined gradient options

#### Content Structure
- **Topics**: Add topics with subtopics and sub-subtopics
  - Each topic has a name, description, color, and display order
  - Subtopics can have direct URLs or contain sub-subtopics
  - Mark items as "Coming Soon" to disable links

#### Publishing
- **Is Published**: Toggle to make the page live on the website

#### SEO (Optional)
- **Meta Title**: Custom title for search engines
- **Meta Description**: Description for search results
- **Keywords**: SEO keywords

### Step 3: Configure Topics

For each topic:

1. **Topic Name**: e.g., "Mechanics"
2. **Topic Description**: Brief explanation
3. **Color Theme**: Visual color for the topic card
4. **Display Order**: Numerical order (1, 2, 3...)
5. **Subtopics**: Add subtopics with either:
   - Direct URL links
   - Sub-subtopics for deeper hierarchy

### Step 4: Publish

1. Set "Is Published" to `true`
2. Save the document
3. The page will automatically appear on your website

## URL Structure Examples

```
/maths           → Mathematics subject page
/physics         → Physics subject page
/chemistry       → Chemistry subject page
/biology         → Biology subject page
/english         → English subject page
/history         → History subject page
/geography       → Geography subject page
/economics       → Economics subject page
```

## Topic Hierarchy Example

```
Physics
├── Mechanics
│   ├── Forces and Motion
│   │   ├── Newton's Laws
│   │   ├── Momentum
│   │   └── Energy
│   └── Circular Motion
├── Waves
│   ├── Wave Properties
│   ├── Sound Waves
│   └── Light Waves
└── Electricity
    ├── Current and Voltage
    ├── Resistance
    └── Circuits
```

## Integration with Existing System

### Homepage Subject Grid
- Automatically includes published subject pages
- Updates links to use dynamic URLs
- Maintains existing styling and functionality

### Subjects Page
- Merges published subjects with existing subject grid data
- Respects sorting preferences (alphabetical, recent, custom)
- Maintains all existing features

### Legacy Support
- Existing `/maths` page continues to work
- Can gradually migrate to the new system
- Both systems can coexist

## Technical Details

### File Structure
```
src/
├── app/
│   ├── [subject]/
│   │   ├── page.tsx          # Dynamic subject page
│   │   └── not-found.tsx     # 404 for invalid subjects
│   ├── maths/
│   │   └── page.tsx          # Legacy maths page (still works)
│   └── subjects/
│       └── page.tsx          # Updated to include dynamic subjects
├── components/
│   ├── SubjectTopicGrid.tsx  # Generic topic grid component
│   └── MathsTopicGrid.tsx    # Legacy component (still works)
└── types/
    └── sanity.ts             # Updated with new types
```

### Sanity Schemas
```
sanity/schemas/
├── subjectPage.ts            # New dynamic subject schema
├── mathsPage.ts              # Legacy schema (still works)
└── index.ts                  # Updated to include new schema
```

## Best Practices

### URL Slugs
- Use lowercase letters and hyphens only
- Keep them short and descriptive
- Examples: "maths", "physics", "computer-science"

### Content Organization
- Limit topics to 6-8 per subject for optimal display
- Use clear, descriptive topic names
- Order topics logically (basic to advanced)

### SEO Optimization
- Write unique meta titles and descriptions
- Include relevant keywords
- Keep meta descriptions under 160 characters

### Topic Structure
- Use 2-3 levels maximum (Topic → Subtopic → Sub-Subtopic)
- Group related content logically
- Use "Coming Soon" for planned but unavailable content

## Troubleshooting

### Subject Not Appearing
1. Check "Is Published" is set to `true`
2. Verify the subject slug is unique
3. Ensure all required fields are filled

### 404 Errors
1. Check the subject slug matches the URL
2. Verify the subject is published
3. Clear any caching if using a CDN

### Links Not Working
1. Ensure subtopic URLs are valid
2. Check for typos in URL fields
3. Verify external links include `http://` or `https://`

## Migration from Legacy System

To migrate from the legacy maths page to the new system:

1. Create a new Subject Page in Sanity
2. Set the slug to "maths"
3. Copy content from the legacy page
4. Set "Is Published" to `true`
5. The new page will take precedence

## Support

For technical issues or questions about the dynamic subject system, refer to:
- Sanity documentation for content management
- Next.js documentation for routing
- This project's README for setup instructions 