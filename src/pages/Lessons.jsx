import { useNavigate } from 'react-router-dom';

function Lessons() {
  const navigate = useNavigate();

  const lessons = [
    { id: 1, title: 'Basic Vocabulary', level: 'Beginner', progress: 75, path: '/lessons/basic-vocab' },
    { id: 2, title: 'Common Phrases', level: 'Beginner', progress: 50, path: '/lessons/common-phrases' },
    { id: 3, title: 'Verb Conjugation', level: 'Intermediate', progress: 30, path: '/lessons/verb-conjugation' },
    { id: 4, title: 'Advanced Grammar', level: 'Advanced', progress: 0, path: '/lessons/advanced-grammar' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Lessons</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {lesson.title}
                </h3>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                  {lesson.level}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{lesson.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${lesson.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate(lesson.path)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                {lesson.progress > 0 ? 'Continue' : 'Start Lesson'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Lessons;
