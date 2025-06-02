# Subject Request Section Implementation

## Overview
Added a new "Can't find your subject?" section that appears under the subject grid on the homepage. This section allows users to request subjects that aren't currently available.

## What Was Implemented

### 1. Sanity Schema
- **File**: `sanity/schemas/subjectRequest.ts`
- **Purpose**: Defines the content structure for the subject request section
- **Fields**:
  - `title`: Internal title for organization
  - `sectionTitle`: Main heading (e.g., "Can't find your subject?")
  - `sectionDescription`: Explanatory text
  - `requestButton`: Button text and URL for requesting subjects
  - `isActive`: Toggle to show/hide the section

### 2. React Component
- **File**: `src/components/SubjectRequest.tsx`
- **Purpose**: Renders the subject request section
- **Features**:
  - Responsive design matching the site's style
  - Fallback data if Sanity content isn't available
  - Clean, centered layout with call-to-action button

### 3. TypeScript Types
- **File**: `types/sanity.ts`
- **Added**: `SubjectRequestData` interface
- **Purpose**: Type safety for the subject request data structure

### 4. GROQ Query
- **File**: `lib/sanity.ts`
- **Added**: `subjectRequestQuery`
- **Purpose**: Fetches active subject request section data from Sanity

### 5. Homepage Integration
- **File**: `src/app/page.tsx`
- **Changes**:
  - Added data fetching for subject request section
  - Integrated component between SubjectGrid and WhyChooseUs sections
  - Added proper imports and type definitions

### 6. Sanity Studio Structure
- **File**: `sanity/structure.ts`
- **Added**: Subject Request Section to the homepage sections
- **Purpose**: Organized content management in Sanity Studio

## What Was Removed

### View All Subjects Button
- Removed from `SubjectGrid` component
- Removed from `subjectGrid` Sanity schema
- Removed from TypeScript interfaces
- Removed from GROQ queries

The "View All Subjects" button was replaced by the new Subject Request section, providing a more focused user experience.

## Usage in Sanity Studio

1. Navigate to **CIE IGCSE > Homepage > Subject Request Section**
2. Create or edit the subject request configuration
3. Set the section title, description, and button details
4. Toggle `isActive` to show/hide the section
5. Save and publish

## Default Content

If no Sanity content is configured, the section displays:
- **Title**: "Can't find your subject?"
- **Description**: "We're constantly adding new subjects and updating our content. If you don't see your subject listed, let us know and we'll prioritize it."
- **Button**: "Request a Subject" (links to "#" by default)

## Styling

The section uses the same design language as other homepage sections:
- Consistent typography and spacing
- Responsive design
- Hover effects and transitions
- Color scheme matching the site theme 