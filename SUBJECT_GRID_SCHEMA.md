# Subject Grid Schema Documentation

## Overview

The Subject Grid schema allows you to manage the "Popular Subjects" section of your website through Sanity CMS. This schema makes all text content, URLs, and dates editable through the Sanity Studio interface.

## Schema Features

### Editable Fields

1. **Section Title** - The main heading (e.g., "Popular Subjects")
2. **Section Description** - The paragraph text below the title
3. **Individual Subjects** - Each subject card with:
   - Subject name (e.g., "Mathematics", "Physics")
   - Subject description (e.g., "Algebra, Geometry, Statistics, and Calculus")
   - Color theme (dropdown selection)
   - Date updated (date picker)
   - View Notes button text and URL

4. **View All Button** - The bottom button text and URL

### Removed Fields

- **Students count** - As requested, this field has been removed from the schema

### New Features

- **Date Updated** - Each subject now has an editable date field that displays when the content was last updated
- **Clickable Buttons** - Both individual "View Notes" buttons and the "View All" button are now proper links with editable URLs

## How to Use

### 1. Access Sanity Studio

Run the following command to start Sanity Studio:

```bash
npx sanity dev
```

Then navigate to `http://localhost:3333` in your browser.

### 2. Create a Subject Grid Document

1. In Sanity Studio, click "Create" or the "+" button
2. Select "Subject Grid Section" from the document types
3. Fill in the required fields:
   - **Internal Title**: A name for this configuration (e.g., "Main Subject Grid")
   - **Section Title**: The heading that appears on the website
   - **Section Description**: The descriptive text below the heading

### 3. Add Subjects

1. In the "Subjects" field, click "Add item"
2. For each subject, fill in:
   - **Subject Name**: The name of the subject
   - **Subject Description**: Brief description of what the subject covers
   - **Color Theme**: Choose from the dropdown (Primary, Secondary, Accent, etc.)
   - **Date Updated**: Select when this subject was last updated
   - **View Notes Button**: 
     - Text: What the button should say (e.g., "View Notes")
     - URL: Where the button should link to

### 4. Configure the View All Button

Set the text and URL for the main "View All Subjects" button at the bottom of the section.

### 5. Activate the Configuration

Set "Is Active" to `true` for the configuration you want to display on the website. Only one Subject Grid configuration should be active at a time.

## Color Options

The schema includes predefined color options:
- Primary (Blue)
- Secondary (Gray)
- Accent (Purple)
- Success (Green)
- Warning (Yellow/Orange)
- Error (Red)
- Blue-500
- Green-500
- Purple-500
- Pink-500
- Indigo-500
- Teal-500

## Technical Implementation

### Files Modified/Created

1. **`sanity/schemas/subjectGrid.ts`** - New schema definition
2. **`sanity/schemas/index.ts`** - Updated to include the new schema
3. **`lib/sanity.ts`** - Added GROQ query for fetching subject grid data
4. **`types/sanity.ts`** - Added TypeScript interfaces
5. **`src/components/SubjectGrid.tsx`** - Updated to use Sanity data
6. **`src/app/page.tsx`** - Updated to fetch and pass subject grid data

### GROQ Query

The following GROQ query is used to fetch the active subject grid data:

```groq
*[_type == "subjectGrid" && isActive == true][0]{
  _id,
  title,
  sectionTitle,
  sectionDescription,
  subjects[]{
    name,
    description,
    color,
    dateUpdated,
    viewNotesButton{
      text,
      url
    }
  },
  viewAllButton{
    text,
    url
  }
}
```

## Fallback Behavior

If no active Subject Grid document is found in Sanity, the component will display fallback content with sample subjects to ensure the website continues to function properly.

## Best Practices

1. **Keep descriptions concise** - Subject descriptions should be brief and informative
2. **Use consistent URLs** - Ensure all "View Notes" buttons link to actual subject pages
3. **Update dates regularly** - Keep the "Date Updated" fields current to show fresh content
4. **Test links** - Verify that all button URLs work correctly
5. **Only one active** - Ensure only one Subject Grid configuration is marked as active

## Troubleshooting

- **Schema not appearing**: Make sure you've restarted the Sanity Studio after adding the schema
- **Data not showing**: Check that your Subject Grid document is marked as "Is Active"
- **Styling issues**: Verify that the color classes match your Tailwind CSS configuration
- **Build errors**: Ensure all TypeScript types are properly imported and used 