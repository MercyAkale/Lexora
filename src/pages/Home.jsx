function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Lexora
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your AI-powered language learning companion
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Get Started
            </button>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Interactive Lessons
            </h3>
            <p className="text-gray-600">
              Engage with structured lessons designed to improve your language skills at your own pace.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              AI Tutor
            </h3>
            <p className="text-gray-600">
              Get personalized help from our AI tutor, available 24/7 to answer your questions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Grammar Tools
            </h3>
            <p className="text-gray-600">
              Master grammar with interactive exercises and instant feedback on your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
