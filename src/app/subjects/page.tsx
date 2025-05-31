import { Header, Footer } from '@/components';
import { client, headerQuery, subjectGridQuery, subjectsPageQuery, footerQuery, allSubjectPagesQuery } from '../../../lib/sanity';
import { HeaderData, SubjectGridData, SubjectsPageData, FooterData, SubjectGridSubject, AdditionalSubject, SubjectPageData } from '../../../types/sanity';
import { urlFor } from '../../../lib/sanity';
import Image from 'next/image';
import { Metadata } from 'next';

// Revalidate on every request for immediate content updates
export const revalidate = 0;

async function getHeaderData(): Promise<HeaderData | undefined> {
  try {
    const headerData = await client.fetch(headerQuery);
    return headerData;
  } catch (error) {
    console.error('Error fetching header data:', error);
    return undefined;
  }
}

async function getSubjectGridData(): Promise<SubjectGridData | undefined> {
  try {
    const subjectGridData = await client.fetch(subjectGridQuery);
    return subjectGridData;
  } catch (error) {
    console.error('Error fetching subject grid data:', error);
    return undefined;
  }
}

async function getSubjectsPageData(): Promise<SubjectsPageData | undefined> {
  try {
    const subjectsPageData = await client.fetch(subjectsPageQuery);
    return subjectsPageData;
  } catch (error) {
    console.error('Error fetching subjects page data:', error);
    return undefined;
  }
}

async function getPublishedSubjects(): Promise<SubjectPageData[]> {
  try {
    const publishedSubjects = await client.fetch(allSubjectPagesQuery);
    return publishedSubjects || [];
  } catch (error) {
    console.error('Error fetching published subjects:', error);
    return [];
  }
}

async function getFooterData(): Promise<FooterData | undefined> {
  try {
    const footerData = await client.fetch(footerQuery);
    return footerData;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return undefined;
  }
}

// Helper function to create a slug from subject name
function createSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Helper function to get the correct URL for a subject
function getSubjectUrl(subject: SubjectGridSubject | AdditionalSubject, publishedSubjects: SubjectPageData[]): string {
  // Check if there's a published subject page that matches this subject
  const matchingSubject = publishedSubjects.find(pubSubject => {
    const subjectNameMatch = pubSubject.subjectName.toLowerCase() === subject.name.toLowerCase();
    const slugMatch = pubSubject.subjectSlug.current === createSlug(subject.name);
    return subjectNameMatch || slugMatch;
  });

  if (matchingSubject) {
    return `/${matchingSubject.subjectSlug.current}`;
  }

  // Fallback to original URL or create a dynamic URL
  const originalHref = subject.viewNotesButton.href || subject.viewNotesButton.url || '#';
  return originalHref.startsWith('/subjects/') 
    ? `/${createSlug(subject.name)}`
    : originalHref;
}

// Function to convert SubjectPageData to SubjectGridSubject format for display
function convertSubjectPageToGridSubject(subjectPage: SubjectPageData): SubjectGridSubject {
  return {
    name: subjectPage.subjectName,
    image: {
      _type: 'image',
      asset: {
        _ref: '',
        _type: 'reference',
        url: '/placeholder-subject.jpg'
      },
      alt: `${subjectPage.subjectName} illustration`
    },
    description: subjectPage.pageDescription.length > 100 
      ? subjectPage.pageDescription.substring(0, 100) + '...'
      : subjectPage.pageDescription,
    color: 'bg-blue-500', // Default color for dynamic subjects
    dateUpdated: new Date().toISOString().split('T')[0], // Current date as fallback
    viewNotesButton: {
      text: 'View Notes',
      href: `/${subjectPage.subjectSlug.current}`
    }
  };
}

// Function to sort subjects based on display order
const sortSubjects = (subjects: (SubjectGridSubject | AdditionalSubject)[], order: string) => {
  switch (order) {
    case 'alphabetical':
      return [...subjects].sort((a, b) => a.name.localeCompare(b.name));
    case 'reverse-alphabetical':
      return [...subjects].sort((a, b) => b.name.localeCompare(a.name));
    case 'recent-first':
      return [...subjects].sort((a, b) => {
        const dateA = a.dateUpdated ? new Date(a.dateUpdated).getTime() : 0;
        const dateB = b.dateUpdated ? new Date(b.dateUpdated).getTime() : 0;
        return dateB - dateA;
      });
    case 'oldest-first':
      return [...subjects].sort((a, b) => {
        const dateA = a.dateUpdated ? new Date(a.dateUpdated).getTime() : 0;
        const dateB = b.dateUpdated ? new Date(b.dateUpdated).getTime() : 0;
        return dateA - dateB;
      });
    case 'custom':
    default:
      return subjects;
  }
};

// Function to combine and sort all subjects including published subject pages
const getAllSubjects = (
  baseSubjects: SubjectGridSubject[], 
  additionalSubjects: AdditionalSubject[] | null = [], 
  publishedSubjects: SubjectPageData[],
  displayOrder: string,
  showAdditionalSubjects: boolean
): (SubjectGridSubject | AdditionalSubject)[] => {
  let allSubjects: (SubjectGridSubject | AdditionalSubject)[] = [...baseSubjects];
  
  if (showAdditionalSubjects && additionalSubjects && additionalSubjects.length > 0) {
    // Sort additional subjects by their display order first
    const sortedAdditional = [...additionalSubjects].sort((a, b) => a.displayOrder - b.displayOrder);
    allSubjects = [...allSubjects, ...sortedAdditional];
  }

  // Add published subjects that aren't already in the base or additional subjects
  const existingSubjectNames = allSubjects.map(s => s.name.toLowerCase());
  const newPublishedSubjects = publishedSubjects
    .filter(pubSubject => !existingSubjectNames.includes(pubSubject.subjectName.toLowerCase()))
    .map(convertSubjectPageToGridSubject);
  
  allSubjects = [...allSubjects, ...newPublishedSubjects];
  
  return sortSubjects(allSubjects, displayOrder);
};

interface SubjectsPageGridProps {
  subjects: (SubjectGridSubject | AdditionalSubject)[];
  pageData: SubjectsPageData;
  publishedSubjects: SubjectPageData[];
}

function SubjectsPageGrid({ subjects, pageData, publishedSubjects }: SubjectsPageGridProps) {
  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  // Helper function to get image URL
  const getImageUrl = (image?: SubjectGridSubject['image']) => {
    if (image?.asset) {
      try {
        // If we have a Sanity asset, use urlFor
        if (image.asset._ref || image.asset._id) {
          return urlFor(image)
            .width(400)
            .height(200)
            .fit('crop')
            .auto('format')
            .quality(90)
            .url();
        }
        // Fallback to direct URL if available
        if (image.asset.url) {
          return image.asset.url;
        }
      } catch (error) {
        console.warn('Error generating image URL:', error);
        return image.asset.url || null;
      }
    }
    return null;
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {pageData.pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {pageData.pageDescription}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject) => {
            const imageUrl = getImageUrl(subject.image);
            const subjectUrl = getSubjectUrl(subject, publishedSubjects);
            
            return (
              <div 
                key={subject.name} 
                className="card p-0 hover:shadow-medium transition-all hover:-translate-y-1 group overflow-hidden"
              >
                {/* Image Section */}
                <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
                  {imageUrl ? (
                    <Image 
                      src={imageUrl}
                      alt={subject.image?.alt || subject.name}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-full ${subject.color} flex items-center justify-center`}>
                      <span className="text-white font-bold text-4xl">{subject.name[0]}</span>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{subject.name}</h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">{subject.description}</p>
                  
                  <div className="flex items-center justify-end mb-4">
                    <div className="flex items-center text-xs text-success">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Updated {formatDate(subject.dateUpdated)}
                    </div>
                  </div>
                  
                  <a 
                    href={subjectUrl}
                    className="btn btn-outline w-full group-hover:btn-primary group-hover:text-primary-foreground transition-all block text-center"
                  >
                    {subject.viewNotesButton.text}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {pageData.additionalSubjectRequestTitle}
            </h2>
            <p className="text-muted-foreground mb-6">
              {pageData.additionalSubjectRequestDescription}
            </p>
            <a 
              href={pageData.additionalSubjectRequestButton.href}
              className="btn btn-primary"
            >
              {pageData.additionalSubjectRequestButton.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const subjectsPageData = await getSubjectsPageData();
  
  if (!subjectsPageData) {
    return {
      title: 'All Subjects - CIE IGCSE Notes',
      description: 'Explore our comprehensive collection of CIE IGCSE study materials across all subjects.'
    };
  }

  return {
    title: subjectsPageData.seo?.metaTitle || `${subjectsPageData.pageTitle} - CIE IGCSE Notes`,
    description: subjectsPageData.seo?.metaDescription || subjectsPageData.pageDescription,
    keywords: subjectsPageData.seo?.keywords?.join(', ') || 'IGCSE, CIE, subjects, notes, study materials'
  };
}

export default async function SubjectsPage() {
  const headerData = await getHeaderData();
  const subjectGridData = await getSubjectGridData();
  const subjectsPageData = await getSubjectsPageData();
  const publishedSubjects = await getPublishedSubjects();
  const footerData = await getFooterData();

  // Fallback subjects page data if no Sanity data
  const fallbackPageData: SubjectsPageData = {
    _id: 'fallback',
    title: 'Subjects Page Configuration',
    pageTitle: 'All Subjects',
    pageDescription: 'Explore our comprehensive collection of CIE IGCSE study materials. Each subject includes detailed notes, practice questions, past papers, and exam tips to help you excel in your studies.',
    subjectGridDisplayOrder: 'custom',
    showAdditionalSubjects: true,
    additionalSubjects: [
      {
        name: "Geography",
        color: "bg-blue-500",
        image: {
          _type: 'image',
          asset: {
            _ref: '',
            _type: 'reference',
            url: '/placeholder-geography.jpg'
          },
          alt: 'Geography illustration'
        },
        description: "Physical Geography, Human Geography, and Environmental Studies",
        dateUpdated: "2024-01-09",
        viewNotesButton: {
          text: "View Notes",
          href: "/geography"
        },
        displayOrder: 1
      },
      {
        name: "Economics",
        color: "bg-purple-500",
        image: {
          _type: 'image',
          asset: {
            _ref: '',
            _type: 'reference',
            url: '/placeholder-economics.jpg'
          },
          alt: 'Economics illustration'
        },
        description: "Microeconomics, Macroeconomics, and Economic Theory",
        dateUpdated: "2024-01-13",
        viewNotesButton: {
          text: "View Notes",
          href: "/economics"
        },
        displayOrder: 2
      },
    ],
    additionalSubjectRequestTitle: 'Can\'t find your subject?',
    additionalSubjectRequestDescription: 'We\'re constantly adding new subjects and updating our content. If you don\'t see your subject listed, let us know and we\'ll prioritize it.',
    additionalSubjectRequestButton: {
      text: 'Request a Subject',
      href: '/contact'
    },
    isActive: true
  };

  // Fallback subjects if no Sanity data
  const fallbackSubjects: SubjectGridSubject[] = [
    { 
      name: "Mathematics", 
      color: "bg-primary", 
      image: {
        _type: 'image',
        asset: {
          _ref: '',
          _type: 'reference',
          url: '/placeholder-math.jpg'
        },
        alt: 'Mathematics illustration'
      },
      description: "Algebra, Geometry, Statistics, and Calculus",
      dateUpdated: "2024-01-15",
      viewNotesButton: {
        text: "View Notes",
        href: "/maths"
      }
    },
    { 
      name: "Physics", 
      color: "bg-secondary", 
      image: {
        _type: 'image',
        asset: {
          _ref: '',
          _type: 'reference',
          url: '/placeholder-physics.jpg'
        },
        alt: 'Physics illustration'
      },
      description: "Mechanics, Waves, Electricity, and Modern Physics",
      dateUpdated: "2024-01-10",
      viewNotesButton: {
        text: "View Notes",
        href: "/physics"
      }
    },
    { 
      name: "Chemistry", 
      color: "bg-accent", 
      image: {
        _type: 'image',
        asset: {
          _ref: '',
          _type: 'reference',
          url: '/placeholder-chemistry.jpg'
        },
        alt: 'Chemistry illustration'
      },
      description: "Organic, Inorganic, and Physical Chemistry",
      dateUpdated: "2024-01-12",
      viewNotesButton: {
        text: "View Notes",
        href: "/chemistry"
      }
    },
    { 
      name: "Biology", 
      color: "bg-success", 
      image: {
        _type: 'image',
        asset: {
          _ref: '',
          _type: 'reference',
          url: '/placeholder-biology.jpg'
        },
        alt: 'Biology illustration'
      },
      description: "Cell Biology, Genetics, Ecology, and Human Biology",
      dateUpdated: "2024-01-08",
      viewNotesButton: {
        text: "View Notes",
        href: "/biology"
      }
    },
    { 
      name: "English", 
      color: "bg-warning", 
      image: {
        _type: 'image',
        asset: {
          _ref: '',
          _type: 'reference',
          url: '/placeholder-english.jpg'
        },
        alt: 'English illustration'
      },
      description: "Literature, Language, and Creative Writing",
      dateUpdated: "2024-01-14",
      viewNotesButton: {
        text: "View Notes",
        href: "/english"
      }
    },
    { 
      name: "History", 
      color: "bg-error", 
      image: {
        _type: 'image',
        asset: {
          _ref: '',
          _type: 'reference',
          url: '/placeholder-history.jpg'
        },
        alt: 'History illustration'
      },
      description: "World History, Modern History, and Historical Analysis",
      dateUpdated: "2024-01-11",
      viewNotesButton: {
        text: "View Notes",
        href: "/history"
      }
    }
  ];

  // Use Sanity data or fallbacks
  const pageData = subjectsPageData || fallbackPageData;
  const baseSubjects = subjectGridData?.subjects || fallbackSubjects;
  
  // Get all subjects including additional ones and published subject pages with proper sorting
  const allSubjects = getAllSubjects(
    baseSubjects, 
    pageData.additionalSubjects, 
    publishedSubjects,
    pageData.subjectGridDisplayOrder,
    pageData.showAdditionalSubjects
  );

  return (
    <div className="min-h-screen bg-white">
      <Header headerData={headerData} />
      <main>
        <SubjectsPageGrid subjects={allSubjects} pageData={pageData} publishedSubjects={publishedSubjects} />
      </main>
      <Footer footerData={footerData} />
    </div>
  );
} 