interface Subject {
  name: string;
  color: string;
  students: string;
  description?: string;
}

const subjects: Subject[] = [
  { 
    name: "Mathematics", 
    color: "bg-primary", 
    students: "2,450",
    description: "Algebra, Geometry, Statistics, and Calculus"
  },
  { 
    name: "Physics", 
    color: "bg-secondary", 
    students: "1,890",
    description: "Mechanics, Waves, Electricity, and Modern Physics"
  },
  { 
    name: "Chemistry", 
    color: "bg-accent", 
    students: "1,670",
    description: "Organic, Inorganic, and Physical Chemistry"
  },
  { 
    name: "Biology", 
    color: "bg-success", 
    students: "2,120",
    description: "Cell Biology, Genetics, Ecology, and Human Biology"
  },
  { 
    name: "English", 
    color: "bg-warning", 
    students: "2,890",
    description: "Literature, Language, and Creative Writing"
  },
  { 
    name: "History", 
    color: "bg-error", 
    students: "1,340",
    description: "World History, Modern History, and Historical Analysis"
  },
];

export default function SubjectGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Popular Subjects
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive study materials across all major CIE IGCSE subjects. 
            Each subject includes detailed notes, practice questions, and exam tips.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div 
              key={subject.name} 
              className="card p-6 hover:shadow-medium transition-all hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <span className="text-white font-bold text-lg">{subject.name[0]}</span>
              </div>
              
              <h4 className="text-lg font-semibold text-foreground mb-2">{subject.name}</h4>
              
              {subject.description && (
                <p className="text-sm text-muted-foreground mb-3">{subject.description}</p>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{subject.students} students</span>
                <div className="flex items-center text-xs text-success">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Updated
                </div>
              </div>
              
              <button className="btn btn-outline w-full group-hover:btn-primary group-hover:text-primary-foreground transition-all">
                View Notes
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="btn btn-primary px-8 py-3">
            View All Subjects
          </button>
        </div>
      </div>
    </section>
  );
} 