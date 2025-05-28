import Link from 'next/link'

export default function SubjectNotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Subject Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The subject you're looking for doesn't exist or hasn't been published yet.
        </p>
        <div className="space-x-4">
          <Link
            href="/subjects"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Subjects
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
} 