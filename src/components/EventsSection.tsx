import { Calendar, Clock } from "lucide-react";

export default function EventsSection() {
  return (
    <div className="container max-w-5xl mx-auto z-10 px-4 py-10">
      <div className="mb-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            Join the <span className="text-gradient">AI</span> conversation
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Register for upcoming events or revisit past discussions shaping the future of agentic experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-purple-600 rounded-lg mr-3">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">Sitecore Symposium 2025</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  The premier event for digital experience innovation, featuring the launch of Agentic Experience platform.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">November 3, 2025 • Orlando, FL</span>
                  <span className="text-sm text-purple-600 font-medium">You're here! →</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">AI Experience Masterclass</h4>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Register
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Deep dive into implementing AI-powered digital experiences with industry experts.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Q1 2025 • Virtual</span>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                    Register →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Past Discussions */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-gray-600 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Past Discussions</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">Future of Search Summit</h4>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    Recording
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Industry leaders discussed how AI is transforming search and discovery experiences.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">October 2024 • 2.5k attendees</span>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                    Watch replay →
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">Conversational UX Workshop</h4>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    Resources
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Hands-on workshop on building natural language interfaces for digital experiences.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">September 2024 • 1.8k attendees</span>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                    Get resources →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500 w-full">
        <div className="border-t border-gray-200 pt-8 pb-10 w-full max-w-lg mx-auto px-4">
          <p>© 2025 Sitecore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
