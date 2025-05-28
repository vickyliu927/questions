# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for the CIE IGCSE Notes website.

## Prerequisites

- A Sanity account (sign up at https://sanity.io)
- Node.js installed on your machine

## Setup Steps

### 1. Create a Sanity Project

1. Go to https://sanity.io/manage
2. Click "Create new project"
3. Choose a project name (e.g., "CIE IGCSE Notes")
4. Select a dataset name (use "production" for live data)
5. Note down your Project ID

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id_here` with the actual Project ID from step 1.

### 3. Start the Sanity Studio

Run the following command to start the Sanity Studio:

```bash
npm run sanity:dev
```

This will start the studio at http://localhost:3333

### 4. Create Header Content

1. Open the Sanity Studio in your browser
2. Click on "Header" in the sidebar
3. Click "Create new Header"
4. Fill in the following fields:
   - **Title**: "Main Header" (internal reference)
   - **Logo**: **REQUIRED** - Upload your logo image (recommended: 200x64px)
     - The uploaded logo will completely override the hardcoded logo
     - Add alt text for accessibility (e.g., "CIE IGCSE Notes Logo")
   - **Navigation Links**: Add your navigation items:
     - Subjects (#)
     - Past Papers (#)
     - Resources (#)
     - About (#)
     - Contact (#)
   - **CTA Button**:
     - Text: "View all CIE IGCSE Study Notes on TutorChase"
     - Link: "#" (or your desired URL)
   - **Is Active**: Toggle this to true (only one header should be active)
5. Click "Publish"

### 5. Deploy the Studio (Optional)

To deploy your studio to Sanity's hosted platform:

```bash
npm run sanity:deploy
```

## Schema Overview

The header schema includes:

- **Logo**: **REQUIRED** Image field with alt text
  - Automatically optimized for web (200x64px max)
  - Includes error handling and fallback to default logo
  - Alt text for accessibility
- **Navigation**: Array of navigation links (label + href)
- **CTA Button**: Object with text and href
- **Is Active**: Boolean to control which header configuration is live

## Logo Functionality

### ✨ **Enhanced Logo Features:**
- **Sanity Override**: Uploaded logos completely replace the hardcoded logo
- **Auto-Optimization**: Images are automatically resized and optimized
- **Error Handling**: Falls back to default logo if Sanity image fails
- **Accessibility**: Alt text support for screen readers
- **Responsive**: Maintains aspect ratio and fits within header constraints

### **Logo Requirements:**
- **Format**: Any image format (PNG, JPG, SVG, WebP)
- **Recommended Size**: 200x64px or similar aspect ratio
- **Max Display Size**: 200px width, 64px height
- **Alt Text**: Required for accessibility

## Development Workflow

1. Make changes in the Sanity Studio
2. The Next.js app will automatically fetch the latest data
3. Logo changes are reflected immediately on the website
4. All text content is editable through the CMS

## Troubleshooting

### Common Issues

1. **Environment variables not loaded**: Make sure `.env.local` is in the root directory and restart your development server.

2. **CORS errors**: Add your domain to the CORS origins in your Sanity project settings.

3. **Schema not found**: Make sure you've published your content in the Sanity Studio.

4. **Logo not displaying**: 
   - Check that the logo field is filled in Sanity
   - Verify the image uploaded successfully
   - Check browser console for image loading errors
   - Ensure alt text is provided

### Support

For more help, check the [Sanity documentation](https://www.sanity.io/docs) or contact support. 