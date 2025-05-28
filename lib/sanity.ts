import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id_here'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (projectId === 'your_project_id_here') {
  console.warn('⚠️  Please set NEXT_PUBLIC_SANITY_PROJECT_ID in your .env.local file')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-12-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Enhanced GROQ query to properly fetch logo data with asset URL
export const headerQuery = `*[_type == "header" && isActive == true][0]{
  _id,
  title,
  logo{
    asset->{
      _id,
      _ref,
      url
    },
    alt,
    hotspot,
    crop
  },
  navigation[]{
    label,
    href
  },
  ctaButton{
    text,
    href
  }
}`

// GROQ query to fetch hero section data
export const heroQuery = `*[_type == "hero" && isActive == true][0]{
  _id,
  title,
  premiumTag,
  sectionTitle,
  sectionTitleHighlighted,
  sectionTitleNoHighlight,
  description,
  ctaButtons{
    primaryButton{
      text,
      href
    },
    secondaryButton{
      text,
      href
    }
  },
  statistics{
    studentsHelped{
      text,
      stats
    },
    subjectsCovered{
      text,
      stats
    },
    successRate{
      text,
      stats
    }
  },
  floatingCards[]{
    title,
    description,
    maxCharactersPerLine
  }
}`

// GROQ query to fetch subject grid data
export const subjectGridQuery = `*[_type == "subjectGrid" && isActive == true][0]{
  _id,
  title,
  sectionTitle,
  sectionDescription,
  subjects[]{
    name,
    image{
      asset->{
        _id,
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
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
}`

// GROQ query to fetch why choose us data
export const whyChooseUsQuery = `*[_type == "whyChooseUs" && isActive == true][0]{
  _id,
  title,
  sectionTitle,
  sectionDescription,
  highlight1{
    title,
    description
  },
  highlight2{
    title,
    description
  },
  highlight3{
    title,
    description
  },
  highlight4{
    title,
    description
  }
}`

// GROQ query to fetch FAQ data
export const faqQuery = `*[_type == "faq" && isActive == true][0]{
  _id,
  title,
  sectionTitle,
  sectionDescription,
  faqs[]{
    question,
    answer
  },
  contactSupport{
    description,
    buttonText,
    buttonLink
  }
}`

// GROQ query to fetch footer data
export const footerQuery = `*[_type == "footer" && isActive == true][0]{
  _id,
  title,
  websiteTitle,
  websiteDescription,
  quickLinks{
    sectionTitle,
    links[]{
      label,
      href
    }
  },
  popularSubjects{
    sectionTitle,
    links[]{
      label,
      href
    }
  },
  support{
    sectionTitle,
    links[]{
      label,
      href
    }
  },
  socialMedia{
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube
  },
  layoutSettings{
    adaptiveSpacing,
    showCopyright,
    copyrightText
  }
}`

// GROQ query to fetch subjects page data
export const subjectsPageQuery = `*[_type == "subjectsPage" && isActive == true][0]{
  _id,
  title,
  pageTitle,
  pageDescription,
  subjectGridDisplayOrder,
  showAdditionalSubjects,
  additionalSubjects[]{
    name,
    image{
      asset->{
        _id,
        _ref,
        url
      },
      alt,
      hotspot,
      crop
    },
    description,
    color,
    dateUpdated,
    viewNotesButton{
      text,
      href
    },
    displayOrder
  },
  additionalSubjectRequestTitle,
  additionalSubjectRequestDescription,
  additionalSubjectRequestButton{
    text,
    href
  },
  seo{
    metaTitle,
    metaDescription,
    keywords
  }
}`

// GROQ query to fetch all published subject pages (for dynamic routing)
export const allSubjectPagesQuery = `*[_type == "subjectPage" && isPublished == true]{
  _id,
  title,
  subjectSlug,
  subjectName,
  pageTitle,
  pageDescription,
  heroBackgroundColor,
  topics[]{
    topicName,
    topicDescription,
    color,
    subtopics[]{
      subtopicName,
      subtopicUrl,
      isComingSoon,
      subSubtopics[]{
        subSubtopicName,
        subSubtopicUrl,
        isComingSoon
      }
    },
    displayOrder
  },
  isPublished,
  seo{
    metaTitle,
    metaDescription,
    keywords
  }
}`

// GROQ query to fetch a specific subject page by slug
export const subjectPageBySlugQuery = (slug: string) => `*[_type == "subjectPage" && subjectSlug.current == "${slug}" && isPublished == true][0]{
  _id,
  title,
  subjectSlug,
  subjectName,
  pageTitle,
  pageDescription,
  heroBackgroundColor,
  topics[]{
    topicName,
    topicDescription,
    color,
    subtopics[]{
      subtopicName,
      subtopicUrl,
      isComingSoon,
      subSubtopics[]{
        subSubtopicName,
        subSubtopicUrl,
        isComingSoon
      }
    },
    displayOrder
  },
  isPublished,
  seo{
    metaTitle,
    metaDescription,
    keywords
  }
}`

// GROQ query to fetch all subject page slugs (for static generation)
export const allSubjectSlugsQuery = `*[_type == "subjectPage" && isPublished == true].subjectSlug.current`

// Legacy GROQ query to fetch maths page data (for backward compatibility)
export const mathsPageQuery = `*[_type == "mathsPage"][0]{
  _id,
  title,
  pageTitle,
  pageDescription,
  topics[]{
    topicName,
    topicDescription,
    color,
    subtopics[]{
      subtopicName,
      subtopicUrl,
      isComingSoon,
      subSubtopics[]{
        subSubtopicName,
        subSubtopicUrl,
        isComingSoon
      }
    },
    displayOrder
  },
  seo{
    metaTitle,
    metaDescription,
    keywords
  }
}` 