export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-20 overflow-hidden notebook-paper">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full animate-pulse" style={{backgroundColor: '#E67E50', opacity: '0.5'}}></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content - doubled left padding */}
          <div className="space-y-8 ml-12">
            <div className="space-y-6">
              {/* Premium badge - updated to orange */}
              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium" style={{backgroundColor: '#FEF3E2', color: '#E67E50'}}>
                <svg className="h-4 w-4 mr-2 fill-current" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                </svg>
                Premium IGCSE Tutoring
              </div>

              {/* Main heading - updated IGCSE Journey to orange */}
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-slate-800 leading-tight">
                Master Your
                <span className="block" style={{color: '#E67E50'}}>IGCSE Journey</span>
              </h1>

              {/* Description */}
              <p className="text-xl font-sans text-slate-600 leading-relaxed">
                Comprehensive study notes, expert tutoring, and personalized guidance 
                to help you excel in your CIE IGCSE examinations with confidence.
              </p>
            </div>

            {/* CTA Buttons - updated start learning button to orange */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="text-white px-8 py-3 rounded-md font-medium font-sans inline-flex items-center justify-center group transition-colors hover:opacity-90" style={{backgroundColor: '#E67E50'}}>
                Start Learning Today
                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </button>
              <button className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-md font-medium font-sans transition-colors">
                View Sample Notes
              </button>
            </div>

            {/* Statistics */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-slate-800">500+</div>
                <div className="text-sm font-sans text-slate-600">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-slate-800">15+</div>
                <div className="text-sm font-sans text-slate-600">Subjects Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif font-bold text-slate-800">98%</div>
                <div className="text-sm font-sans text-slate-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right side - Floating cards */}
          <div className="relative lg:h-96">
            {/* Physics card */}
            <div className="absolute top-0 right-8 bg-white rounded-2xl p-6 shadow-lg border border-slate-200 rotate-3 transform hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3 className="font-serif font-semibold text-slate-800 mb-2">Physics</h3>
              <p className="text-sm font-sans text-slate-600">Interactive learning</p>
            </div>

            {/* Mathematics card */}
            <div className="absolute top-8 left-4 bg-white rounded-2xl p-6 shadow-lg border border-slate-200 -rotate-2 transform hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-24 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                  <path d="M4 22h16"/>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                </svg>
              </div>
              <h3 className="font-serif font-semibold text-slate-800 mb-2">Mathematics</h3>
              <p className="text-sm font-sans text-slate-600">Complete notes & practice</p>
            </div>

            {/* Chemistry card */}
            <div className="absolute bottom-0 right-16 bg-white rounded-2xl p-4 shadow-lg border border-slate-200 rotate-1 transform hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mb-3">
                <svg className="h-5 w-5 text-red-700 fill-current" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                </svg>
              </div>
              <h3 className="font-serif font-semibold text-slate-800 text-sm mb-1">Chemistry</h3>
              <p className="text-xs font-sans text-slate-600">Lab experiments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 