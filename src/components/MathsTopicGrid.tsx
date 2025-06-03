'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { MathsTopic, MathsSubtopic } from '../../types/sanity'

interface MathsTopicGridProps {
  topics: MathsTopic[]
}

interface TopicCardProps {
  topic: MathsTopic
}

interface SubtopicItemProps {
  subtopic: MathsSubtopic
}

const SubtopicItem: React.FC<SubtopicItemProps> = ({ subtopic }) => {
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false)
  const hasSubSubtopics = subtopic.subSubtopics && subtopic.subSubtopics.length > 0

  const toggleSubDropdown = () => {
    setIsSubDropdownOpen(!isSubDropdownOpen)
  }

  // If subtopic has no name, skip rendering
  if (!subtopic.subtopicName) {
    return null
  }

  if (subtopic.isComingSoon) {
    return (
      <div className="p-3 text-gray-400 cursor-not-allowed flex items-center justify-between">
        <span>{subtopic.subtopicName}</span>
        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
          Coming Soon
        </span>
      </div>
    )
  }

  if (hasSubSubtopics) {
    return (
      <div>
        <button
          onClick={toggleSubDropdown}
          className="w-full p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 flex items-center justify-between"
        >
          <span>{subtopic.subtopicName}</span>
          {isSubDropdownOpen ? (
            <ChevronUpIcon className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {isSubDropdownOpen && (
          <div className="ml-4 border-l-2 border-gray-100">
            {subtopic.subSubtopics?.map((subSubtopic, index) => (
              <div key={index} className="border-b border-gray-50 last:border-b-0">
                {subSubtopic.isComingSoon ? (
                  <div className="p-2 pl-4 text-gray-400 cursor-not-allowed flex items-center justify-between text-sm">
                    <span>{subSubtopic.subSubtopicName}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                ) : (
                  <Link
                    href={subSubtopic.subSubtopicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 pl-4 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    {subSubtopic.subSubtopicName}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Regular subtopic with direct URL
  if (subtopic.subtopicUrl) {
    return (
      <Link
        href={subtopic.subtopicUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
      >
        {subtopic.subtopicName}
      </Link>
    )
  }

  // Subtopic without URL and no sub-subtopics (shouldn't happen with validation)
  return (
    <div className="p-3 text-gray-400 cursor-not-allowed">
      {subtopic.subtopicName}
    </div>
  )
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const getTotalSubtopicCount = () => {
    let count = topic.subtopics.filter(subtopic => subtopic.subtopicName).length
    topic.subtopics.filter(subtopic => subtopic.subtopicName).forEach(subtopic => {
      if (subtopic.subSubtopics) {
        count += subtopic.subSubtopics.length
      }
    })
    return count
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Clickable Topic Header */}
      <button
        onClick={toggleDropdown}
        className={`w-full ${topic.color} bg-gradient-to-br from-opacity-90 to-opacity-100 p-6 text-left hover:opacity-90 transition-opacity duration-200`}
      >
        <div className="text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{topic.topicName}</h3>
            {topic.topicDescription && (
              <p className="text-white/90 text-sm">{topic.topicDescription}</p>
            )}
          </div>
          <div className="flex flex-col items-center ml-4">
            {isDropdownOpen ? (
              <ChevronUpIcon className="h-6 w-6 text-white" />
            ) : (
              <ChevronDownIcon className="h-6 w-6 text-white" />
            )}
            <span className="text-xs text-white/80 mt-1">({getTotalSubtopicCount()})</span>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="bg-white border-t border-gray-200">
          {topic.subtopics.filter(subtopic => subtopic.subtopicName).map((subtopic, index) => (
            <div key={index} className="border-b border-gray-100 last:border-b-0">
              <SubtopicItem subtopic={subtopic} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const MathsTopicGrid: React.FC<MathsTopicGridProps> = ({ topics }) => {
  if (!topics || topics.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No mathematics topics available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {topics.map((topic, index) => (
        <TopicCard key={index} topic={topic} />
      ))}
    </div>
  )
}

export default MathsTopicGrid 