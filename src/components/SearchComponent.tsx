// Instructions: Update the search component to match the reference image with search bar, Sitecore icon, and suggested questions

import { Search, Mic, ArrowUp } from "lucide-react";

export default function SearchComponent() {
  const suggestedQuestions = [
    "What is personalization at AI scale?",
    "How does content transformation work?",
    "What is conversational UX?",
    "What is the future of search?",
    "How do generative ads work?",
    "What are experience agents?"
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Search Bar */}
          <div className="relative mb-8">
            <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
              <div className="flex items-center">
                {/* Search Icon */}
                <div className="pl-4 pr-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>

                {/* Sitecore Logo/Icon */}
                <div className="mr-3">
                  <div className="w-6 h-6 bg-sitecore-ultra-violet rounded-sm flex items-center justify-center">
                    <span className="text-white font-bold text-xs">S</span>
                  </div>
                </div>

                {/* Input */}
                <input
                  type="text"
                  className="flex-1 py-3 text-gray-600 placeholder-gray-500 bg-transparent border-none outline-none text-lg"
                  placeholder="Ask anything about AI and digital experience..."
                />

                {/* Right Icons */}
                <div className="flex items-center space-x-2 pr-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Mic className="h-5 w-5 text-gray-400" />
                  </button>
                  <button className="p-2 bg-sitecore-core-red hover:bg-sitecore-core-red/90 rounded-full transition-colors">
                    <ArrowUp className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="bg-white/80 hover:bg-white border border-gray-200 rounded-full px-4 py-3 text-sm text-gray-700 hover:text-gray-900 transition-all duration-200 hover:shadow-md text-left"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
