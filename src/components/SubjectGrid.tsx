"use client";

import { SubjectGridData, SubjectGridSubject } from '../../types/sanity';
import { urlFor } from '../../lib/sanity';
import { SubjectPageData } from '../../types/sanity';
import Image from "next/image";

interface SubjectGridProps {
  subjectGridData?: SubjectGridData;
  publishedSubjects?: SubjectPageData[];
}

// Helper function to create a slug from subject name
function createSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function SubjectGrid({ subjectGridData, publishedSubjects }: SubjectGridProps) {
  // Fallback data if no Sanity data is provided
  const fallbackData: SubjectGridData = {
    _id: 'fallback',
    title: 'Default Subject Grid',
    sectionTitle: 'Popular Subjects',
    sectionDescription: 'Explore our comprehensive study materials across all major CIE IGCSE subjects. Each subject includes detailed notes, practice questions, and exam tips.',
    subjects: [
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
      },
    ],
    viewAllButton: {
      text: "View All Subjects",
      href: "/subjects"
    }
  };

  // Use Sanity data if available, otherwise use fallback
  const data = subjectGridData || fallbackData;

  // Helper function to get the correct URL for a subject
  const getSubjectUrl = (subject: SubjectGridSubject): string => {
    if (!publishedSubjects) {
      return subject.viewNotesButton.href || subject.viewNotesButton.url || '#';
    }

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
    const originalUrl = subject.viewNotesButton.href || subject.viewNotesButton.url || '#';
    return originalUrl.startsWith('/subjects/') 
      ? `/${createSlug(subject.name)}`
      : originalUrl;
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
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
  const getImageUrl = (image: SubjectGridSubject['image']) => {
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
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {data.sectionTitle}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.sectionDescription}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.subjects.map((subject) => {
            const imageUrl = getImageUrl(subject.image);
            const subjectUrl = getSubjectUrl(subject);
            
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
                      alt={subject.image.alt || subject.name}
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
                  <h4 className="text-lg font-semibold text-foreground mb-2">{subject.name}</h4>
                  
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
        
        <div className="text-center mt-12">
          <a 
            href={data.viewAllButton.href}
            className="btn btn-primary px-8 py-3"
          >
            {data.viewAllButton.text}
          </a>
        </div>
      </div>
    </section>
  );
} 