function GrammarTools() {
  const tools = [
    {
      id: 1,
      title: 'Grammar Checker',
      description: 'Check your sentences for grammatical errors',
      icon: '✓',
      color: 'bg-green-500'
    },
    {
      id: 2,
      title: 'Verb Conjugator',
      description: 'Learn how to conjugate verbs in different tenses',
      icon: '⚙️',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Sentence Builder',
      description: 'Practice building sentences with proper structure',
      icon: '🏗️',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'Vocabulary Quiz',
      description: 'Test your vocabulary with interactive quizzes',
      icon: '❓',
      color: 'bg-orange-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Grammar Tools</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tool.description}
                  </p>
                  <button className="text-indigo-600 font-semibold hover:text-indigo-700 transition">
                    Try it now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quick Grammar Check
          </h2>
          <textarea
            placeholder="Enter your text here to check for grammar errors..."
            className="w-full border border-gray-300 rounded-lg p-4 h-40 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          ></textarea>
          <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Check Grammar
          </button>
        </div>
      </div>
    </div>
  );
}

export default GrammarTools;
