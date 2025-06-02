import { SubjectRequestData } from '../../types/sanity'

interface SubjectRequestProps {
  subjectRequestData?: SubjectRequestData
}

export default function SubjectRequest({ subjectRequestData }: SubjectRequestProps) {
  // Fallback data if no Sanity data is provided
  const fallbackData = {
    _id: 'fallback-subject-request',
    title: 'Subject Request Section',
    sectionTitle: "Can't find your subject?",
    sectionDescription: "We're constantly adding new subjects and updating our content. If you don't see your subject listed, let us know and we'll prioritize it.",
    requestButton: {
      text: 'Request a Subject',
      href: '#'
    }
  }

  // Use Sanity data if available, otherwise use fallback
  const data = subjectRequestData || fallbackData

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6" style={{color: '#486581'}}>
          {data.sectionTitle}
        </h2>
        <p className="text-lg mb-8 leading-relaxed font-sans max-w-3xl mx-auto" style={{color: '#64748b'}}>
          {data.sectionDescription}
        </p>
        <a
          href={data.requestButton.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium font-sans tracking-wide rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          style={{letterSpacing: '0.025em'}}
        >
          {data.requestButton.text}
        </a>
      </div>
    </section>
  )
} 