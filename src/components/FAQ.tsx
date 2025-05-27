"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What subjects are covered in your CIE IGCSE study notes?",
    answer: "We cover all major CIE IGCSE subjects including Mathematics, Physics, Chemistry, Biology, English Language & Literature, History, Geography, Economics, Business Studies, Computer Science, and more. Our notes are regularly updated to match the latest syllabus requirements."
  },
  {
    question: "Are the study notes aligned with the latest CIE IGCSE syllabus?",
    answer: "Yes, all our study notes are meticulously aligned with the latest CIE IGCSE syllabus. We regularly review and update our content to ensure it meets current examination requirements and includes any syllabus changes."
  },
  {
    question: "How are the study notes structured and organized?",
    answer: "Our notes are organized by subject and then broken down into topics and subtopics following the official CIE syllabus structure. Each topic includes clear explanations, examples, diagrams, and practice questions to reinforce learning."
  },
  {
    question: "Do you provide practice questions and past papers?",
    answer: "Yes, we provide extensive practice questions for each topic, along with access to past papers and mark schemes. This helps students familiarize themselves with the exam format and practice under exam conditions."
  },
  {
    question: "Are the notes suitable for both Foundation and Higher tiers?",
    answer: "Our notes cover content for all tiers and clearly indicate which topics are relevant for Foundation, Higher, or both tiers. This ensures students focus on the appropriate content for their chosen tier."
  },
  {
    question: "How often are the study materials updated?",
    answer: "We continuously update our study materials throughout the academic year. Major updates occur when CIE releases syllabus changes, and we also make regular improvements based on student feedback and exam trends."
  },
  {
    question: "Can I access the notes offline?",
    answer: "Yes, our notes are available for download in PDF format, allowing you to study offline. We also offer a mobile-friendly web version that works well on tablets and smartphones."
  },
  {
    question: "Do you offer support for exam preparation and revision strategies?",
    answer: "Absolutely! In addition to subject-specific notes, we provide comprehensive revision guides, exam techniques, time management strategies, and tips from experienced IGCSE teachers and examiners."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our CIE IGCSE study notes and platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="card overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h4 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h4>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4 animate-slide-down">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <button className="btn btn-primary px-8 py-3">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
} 