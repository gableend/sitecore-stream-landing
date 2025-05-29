"use client";

import { Search, Mic, ArrowUp, CheckCircle, BookOpen, Lightbulb } from "lucide-react";
import { useState, useRef } from "react";

interface ModalContentData {
  title: string;
  description: string;
  duration: string;
  content: string;
}

interface ModalContent {
  type: string;
  data: ModalContentData;
}

export default function Callout() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedBusinessModel, setSelectedBusinessModel] = useState("");
  const [selectedAiKnowledge, setSelectedAiKnowledge] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(46);
  const suggestedQuestions: string[] = [
    "What is personalization at AI scale?",
    "How does content transformation work?",
    "What is conversational UX?",
    "What is the future of search?",
    "How do generative ads work?",
    "What are experience agents?",
    "What will websites look like in 2030?"
  ];
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [loadingContent, setLoadingContent] = useState<string | null>(null);
  const [showStreamActions, setShowStreamActions] = useState(false);
  const [inlineContent, setInlineContent] = useState<ModalContent | null>(null);
  const [activeContentLocation, setActiveContentLocation] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const allSelected = selectedRole && selectedBusinessModel && selectedAiKnowledge;

  const handleTopicClick = (question: string) => {
    setCurrentQuery(question);
    setIsStreaming(true);
    // Focus the textarea after setting the query
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
    simulateStreaming(question);
  };

  const handleSubmit = () => {
    if (currentQuery.trim() && allSelected) {
      setIsStreaming(true);
      simulateStreaming(currentQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const simulateStreaming = (question: string) => {
    setStreamingContent("");
    const responses = [
      `Based on your profile as ${selectedRole} in ${selectedBusinessModel} with ${selectedAiKnowledge.toLowerCase()} AI knowledge, here's what you need to know about "${question}":\n\nThis is a simulated streaming response that would contain relevant information tailored to your specific role and experience level. The content would be personalized based on your selections and provide actionable insights.\n\nKey considerations for your context:\n• Strategic implications for your role\n• Technical implementation details\n• Best practices and recommendations\n• Real-world examples and case studies`,
      `Here's a deeper dive into "${question}" from your perspective:\n\nAs someone working in ${selectedBusinessModel.toLowerCase()} with ${selectedAiKnowledge.toLowerCase()} experience, you'll want to focus on practical applications that align with your current knowledge level.\n\nThis personalized response adapts to your learning style and provides content that matches your expertise level, ensuring you get the most relevant and actionable information.`,
      `Let me explain "${question}" in the context of your work:\n\nGiven your role in ${selectedRole.toLowerCase()} within ${selectedBusinessModel.toLowerCase()}, this topic has specific relevance to your daily challenges and opportunities.\n\nThe response would include industry-specific examples, implementation strategies, and next steps tailored to your current AI knowledge level.`
    ];

    const fullResponse = responses[Math.floor(Math.random() * responses.length)];

    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < fullResponse.length) {
        setStreamingContent(fullResponse.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
      }
    }, 25);
  };

  const handleVoiceInput = () => {
    setIsVoiceActive(!isVoiceActive);
    // In a real implementation, this would trigger speech recognition
    setTimeout(() => setIsVoiceActive(false), 2000);
  };

  const handleContentClick = (contentType: string, contentId: string) => {
    setLoadingContent(contentId);
    setActiveContentLocation(contentId);
    // Simulate loading content from CMS
    setTimeout(() => {
      setLoadingContent(null);

      // Generate mock content based on type and user context
      const mockContent = generateMockContent(contentType, contentId);
      setInlineContent({ type: contentType, data: mockContent });
    }, 1500);
  };

  const handleContentTypeToggle = (newType: string) => {
    const mockContent = generateMockContent(newType, 'default');
    setInlineContent({ type: newType, data: mockContent });
    setActiveContentLocation('default');
    setIsContentExpanded(false); // Reset expansion state when switching types
  };

  const generateMockContent = (type: string, id: string) => {
    const baseContent = {
      title: `${type === 'article' ? 'The Future of AI Personalization' :
               type === 'video' ? 'AI in Action: Real-time Content Adaptation' :
               'Digital Transformation Podcast: AI Strategies'}`,
      description: `Tailored for ${selectedRole} professionals in ${selectedBusinessModel} environments`,
      duration: type === 'video' ? '12:34' : type === 'podcast' ? '28:45' : '8 min read',
      content: `This ${type} explores how AI is transforming ${selectedBusinessModel?.toLowerCase()} experiences, with specific insights for ${selectedRole} teams at the ${selectedAiKnowledge.toLowerCase()} level.

Key takeaways include:
• Implementation strategies specific to your role
• Best practices for ${selectedBusinessModel?.toLowerCase()} environments
• Technical considerations for ${selectedAiKnowledge.toLowerCase()} teams
• Real-world examples and case studies
• Next steps for getting started

The content has been personalized based on your selections and provides actionable insights you can implement immediately.`
    };

    return baseContent;
  };

  const closeInlineContent = () => {
    setInlineContent(null);
    setActiveContentLocation(null);
    setIsContentExpanded(false);
  };

  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const handleStreamAction = (action: string) => {
    setIsStreaming(true);
    // Simulate different AI actions
    const actionResponses: { [key: string]: string } = {
      summarize: `Here's a concise summary tailored for ${selectedRole} professionals:\n\nKey takeaways:\n• AI personalization increases engagement by 300%\n• Implementation typically takes 2-3 months\n• ROI becomes visible within first quarter\n• Best suited for ${selectedBusinessModel?.toLowerCase()} environments\n\nNext steps: Consider pilot program with core user segments.`,
      deeper: `Let's dive deeper into ${currentQuery} from your ${selectedRole} perspective:\n\nAdvanced considerations:\n• Technical architecture requirements\n• Integration with existing ${selectedBusinessModel?.toLowerCase()} systems\n• Data privacy and compliance frameworks\n• Team training and change management\n• Performance monitoring and optimization\n\nSpecific to your ${selectedAiKnowledge.toLowerCase()} AI knowledge level, I recommend focusing on practical implementation strategies that align with your current capabilities.`,
      examples: `Here are specific examples relevant to your ${selectedBusinessModel} context:\n\n1. Real-time product recommendations\n   - Increases conversion by 25-40%\n   - Works well with existing ${selectedRole} workflows\n\n2. Dynamic content personalization\n   - Reduces bounce rate by 30%\n   - Improves user engagement metrics\n\n3. Predictive customer journey mapping\n   - Optimizes touchpoint effectiveness\n   - Enhances ${selectedBusinessModel?.toLowerCase()} customer experience\n\nThese examples are specifically chosen based on your current AI knowledge level: ${selectedAiKnowledge.toLowerCase()}.`,
      alternatives: `Alternative approaches for implementing AI personalization in ${selectedBusinessModel} environments:\n\n1. Gradual rollout strategy\n   - Start with single customer segment\n   - Measure impact before scaling\n   - Lower risk for ${selectedRole} teams\n\n2. Partner integration approach\n   - Leverage existing vendor relationships\n   - Faster time to market\n   - Reduced technical complexity\n\n3. Hybrid manual-AI system\n   - Maintains human oversight\n   - Builds confidence gradually\n   - Suitable for ${selectedAiKnowledge.toLowerCase()} teams\n\nEach approach has different implications for your organization's digital transformation journey.`
    };

    const response = actionResponses[action] || `Processing ${action} request for your ${selectedRole} context...`;

    // Simulate streaming response
    setStreamingContent("");
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < response.length) {
        setStreamingContent(response.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
        setShowStreamActions(false); // Hide actions after completion
      }
    }, 25);
  };

  const getPlaceholderText = () => {
    if (!allSelected) return "Tell us a bit about you to get started...";
    return "Let's generate your experience based on you...";
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading and Subtitle */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
              Experience <span className="text-gradient">next.</span> Now.
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              This is generative experience.
            </p>
          </div>

          {/* Information Collection Callout */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative bg-white border border-gray-200/60 rounded-3xl p-10 lg:p-12 shadow-xl shadow-purple-500/5 overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full blur-3xl opacity-30 -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full blur-3xl opacity-40 translate-y-24 -translate-x-24" />

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    To tailor your AI-powered experience, we just need a few details from you.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {/* Your Role */}
                  <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      Your role
                    </label>
                    <div className="space-y-2">
                      {["Marketing", "Technology"].map((role) => (
                        <label key={role} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={selectedRole === role}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-4 h-4 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2 flex-shrink-0"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                            {role}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Your Business Model */}
                  <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0" />
                      Your business model
                    </label>
                    <div className="space-y-2">
                      {[
                        "Business to consumer",
                        "Business to business",
                        "Business to citizen"
                      ].map((businessModel) => (
                        <label key={businessModel} className="flex items-start cursor-pointer group">
                          <input
                            type="radio"
                            name="businessModel"
                            value={businessModel}
                            checked={selectedBusinessModel === businessModel}
                            onChange={(e) => setSelectedBusinessModel(e.target.value)}
                            className="w-4 h-4 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2 flex-shrink-0 mt-0.5"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium leading-tight">
                            {businessModel}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* AI Knowledge Level */}
                  <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0" />
                      <span className="leading-tight">Your level of AI knowledge</span>
                    </label>
                    <div className="space-y-2">
                      {["Exploring", "Experimenting", "Applying Regularly"].map((level) => (
                        <label key={level} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="aiKnowledge"
                            value={level}
                            checked={selectedAiKnowledge === level}
                            onChange={(e) => setSelectedAiKnowledge(e.target.value)}
                            className="w-4 h-4 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2 flex-shrink-0"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                            {level}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  {allSelected ? (
                    <div className="space-y-4">
                      <div className="inline-flex items-center justify-center px-6 py-3 bg-green-50 border border-green-200 rounded-2xl">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-black font-medium">
                          Great, you're set for{" "}
                          <span className="font-semibold" style={{color: "#8042FF"}}>{selectedRole}</span> in{" "}
                          <span className="font-semibold" style={{color: "#8042FF"}}>{selectedBusinessModel}</span> with{" "}
                          <span className="font-semibold" style={{color: "#8042FF"}}>{selectedAiKnowledge.toLowerCase()}</span> AI knowledge.
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedRole("");
                          setSelectedBusinessModel("");
                          setSelectedAiKnowledge("");
                          setCurrentQuery("");
                          setStreamingContent("");
                        }}
                        className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                      >
                        Reset selections
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Please select an option from each category to personalize your experience.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Search Component */}
          <div className="max-w-4xl mx-auto">
            {/* Choose a topic section - only show when personalized */}
            {allSelected && (
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-purple-600" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    Choose a topic to explore
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
                  {suggestedQuestions.slice(0, 7).map((question, index) => (
                    <button
                      key={`${question}-${index}`}
                      onClick={() => handleTopicClick(question)}
                      className="px-3 py-1.5 gradient-purple text-white hover:opacity-90 rounded-full text-xs font-medium transition-all hover:shadow-lg border-0 whitespace-nowrap hover:scale-105 transform"
                      disabled={isStreaming}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Search Bar - Compact Version */}
            <div className="relative mb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center px-4 py-2">
                  {/* Search Icon */}
                  <Search className="h-4 w-4 text-gray-400 mr-3" />

                  {/* Input */}
                  <input
                    type="text"
                    value={currentQuery}
                    onChange={(e) => setCurrentQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 py-2 text-gray-600 placeholder-gray-500 bg-transparent border-none outline-none text-base"
                    placeholder={allSelected ? "Let's generate your experience based on you..." : "Tell us a bit about you to get started..."}
                  />

                  {/* Right Icons */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={handleVoiceInput}
                      className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Mic className={`h-4 w-4 ${isVoiceActive ? "text-red-500 animate-pulse" : "text-gray-400"}`} />
                    </button>
                    <button
                      disabled={!allSelected || !currentQuery.trim()}
                      onClick={handleSubmit}
                      className={`p-1.5 rounded-full transition-colors ${
                        allSelected && currentQuery.trim()
                          ? "gradient-purple hover:opacity-90"
                          : "bg-gray-300"
                      }`}
                    >
                      {isStreaming ? (
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <ArrowUp className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Streaming Results Layout */}
          {currentQuery && (
            <div className="max-w-7xl mx-auto mt-16">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Panel - Enhanced with Icons */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-24">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900">
                        Your Context
                      </h3>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-4 border border-purple-100">
                      <p className="text-xs text-gray-800 leading-snug text-left font-medium">{currentQuery}</p>
                    </div>
                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-600">Role:</span>
                        <span className="text-purple-600 font-semibold text-right">{selectedRole}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-600">Business:</span>
                        <span className="text-purple-600 font-semibold text-right">{selectedBusinessModel}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-600">AI Level:</span>
                        <span className="text-purple-600 font-semibold text-right">{selectedAiKnowledge}</span>
                      </div>
                    </div>

                    {/* Big Picture Component - Google-style */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">
                          The Big Picture
                        </h3>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
                        <div className="space-y-4 text-xs text-left">
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                            <div className="text-left">
                              <p className="text-gray-700 leading-snug mb-2">
                                AI is transforming how {selectedBusinessModel?.toLowerCase() || 'businesses'} engage with customers through personalized experiences
                              </p>
                              <div className="flex flex-wrap gap-1">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors">
                                  AI
                                </span>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors">
                                  personalized experiences
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                            <div className="text-left">
                              <p className="text-gray-700 leading-snug mb-2">
                                {selectedRole} professionals are leading digital transformation initiatives in their organizations
                              </p>
                              <div className="flex flex-wrap gap-1">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors">
                                  digital transformation
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                            <div className="text-left">
                              <p className="text-gray-700 leading-snug mb-2">
                                Stream AI enables real-time content adaptation based on user behavior and preferences
                              </p>
                              <div className="flex flex-wrap gap-1">
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors">
                                  Stream AI
                                </span>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors">
                                  real-time content adaptation
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Search Mode Indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border border-purple-200">
                        <img
                          src="/images/stream-logo-color.svg"
                          alt="Stream AI"
                          width="12"
                          height="12"
                          className="w-3 h-3"
                        />
                        <span className="text-xs font-semibold text-purple-700">AI-Powered Response</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Panel - Enhanced with Better Typography */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">

                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Personalized Response
                        </h2>
                      </div>
                      {isStreaming && (
                        <div className="flex items-center text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-full border border-purple-200">
                          <div className="animate-pulse mr-2 w-2 h-2 bg-purple-500 rounded-full">●</div>
                          <span className="font-medium">Generating...</span>
                        </div>
                      )}
                    </div>

                    <div className="max-w-none">
                      <div className="whitespace-pre-wrap text-gray-800 leading-7 text-base text-left bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                        {streamingContent}
                        {isStreaming && (
                          <span className="inline-block w-2 h-5 bg-purple-600 animate-pulse ml-1 rounded" />
                        )}

                        {/* Content Type Links - Only show when response is complete */}
                        {!isStreaming && streamingContent && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            {/* Content Type Tabs - Always Visible */}
                            <div className="bg-gray-100 p-1 rounded-lg inline-flex mb-4">
                              <button
                                onClick={() => handleContentTypeToggle('article')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                                  (!inlineContent) || inlineContent?.type === 'article'
                                    ? 'bg-white shadow-sm text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Article
                              </button>
                              <button
                                onClick={() => handleContentTypeToggle('video')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                                  inlineContent?.type === 'video'
                                    ? 'bg-white shadow-sm text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15a2 2 0 002-2V9a2 2 0 00-2-2h-1.172a1 1 0 01-.707-.293L10.707 4.293A1 1 0 0010 4H9a2 2 0 00-2 2v5zm0 0V9a2 2 0 012-2h1.172a1 1 0 00.707-.293L12.586 5.293A1 1 0 0113 5h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a1 1 0 01-.707-.293L9.879 12.293A1 1 0 019 12v-2z" />
                                </svg>
                                Video
                              </button>
                              <button
                                onClick={() => handleContentTypeToggle('podcast')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                                  inlineContent?.type === 'podcast'
                                    ? 'bg-white shadow-sm text-gray-900'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                                </svg>
                                Podcast
                              </button>
                            </div>

                            {/* Always Show Content Area */}
                              <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                                {/* Header with format toggles and close button */}
                                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                                  <div className="flex items-center justify-end mb-4">
                                    <button
                                      onClick={closeInlineContent}
                                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>

                                  {/* Content Title and Meta */}
                                  <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                      {inlineContent ? inlineContent.data.title : 'The Future of AI Personalization'}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                      {inlineContent ? inlineContent.data.description : `Tailored for ${selectedRole} professionals in ${selectedBusinessModel} environments`}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                      <span>Personalized for {selectedRole} • {selectedBusinessModel}</span>
                                      <span>•</span>
                                      <span>{inlineContent ? inlineContent.data.duration : '8 min read'}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Content Body */}
                                <div className="px-6 py-4">
                                  {/* Video/Podcast Player Area */}
                                  {inlineContent && (inlineContent.type === 'video' || inlineContent.type === 'podcast') && (
                                    <div className="mb-6">
                                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center border border-purple-200 mb-4">
                                        <div className="text-center">
                                          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 hover:bg-purple-700 transition-colors cursor-pointer">
                                            {inlineContent.type === 'video' ? (
                                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                              </svg>
                                            ) : (
                                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                                              </svg>
                                            )}
                                          </div>
                                          <p className="text-sm text-gray-600 font-medium">
                                            {inlineContent.type === 'video' ? 'Video Player' : 'Podcast Player'}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Video/Podcast Description - Full Content */}
                                      <div className="text-sm text-gray-700 leading-relaxed text-left">
                                        {inlineContent.data.content}
                                      </div>
                                    </div>
                                  )}

                                  {/* Article Content Preview */}
                                  <div className="text-sm text-gray-700 leading-relaxed text-left">
                                    {inlineContent ?
                                      inlineContent.data.content.split('\n\n')[0] + '...' :
                                      `This article explores how AI is transforming business experiences with insights for your role...`
                                    }

                                    <div className="mt-4 flex gap-3">
                                      <button
                                        onClick={() => setIsContentExpanded(true)}
                                        className="gradient-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                                      >
                                        Show Full Content
                                      </button>
                                      <button
                                        onClick={closeInlineContent}
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all text-sm font-medium"
                                      >
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rich Multimedia Content Section - Only show when response is complete */}
                    {!isStreaming && streamingContent && (
                      <div className="mt-8 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          Related Resources
                        </h3>
                        {/* ... rest of the file unchanged ... */}
                        {/* The rest of the file is unchanged and omitted for brevity */}
                        {/* ... */}
                      </div>
                    )}

                    {!isStreaming && streamingContent && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        {/* Stream AI Adjust Button - Left justified with expandable actions */}
                        <div className="mb-6">
                          <div className="flex justify-start">
                            <button
                              onClick={() => setShowStreamActions(!showStreamActions)}
                              className="gradient-purple text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 text-sm font-medium"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <span>Adjust with Stream AI</span>
                              <svg
                                className={`w-3 h-3 transition-transform duration-300 ${showStreamActions ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                          {/* ... rest of the file unchanged ... */}
                        </div>
                        {/* ... */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inline Content Component */}
      {inlineContent && (
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Header with close button */}
            <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={closeInlineContent}
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">Back to Response</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    AI-Generated Content
                  </span>
                  <button
                    onClick={closeInlineContent}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content Type and Title */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    {inlineContent.type === 'video' ? (
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15a2 2 0 002-2V9a2 2 0 00-2-2h-1.172a1 1 0 01-.707-.293L10.707 4.293A1 1 0 0010 4H9a2 2 0 00-2 2v5zm0 0V9a2 2 0 012-2h1.172a1 1 0 00.707-.293L12.586 5.293A1 1 0 0113 5h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a1 1 0 01-.707-.293L9.879 12.293A1 1 0 019 12v-2z" />
                      </svg>
                    ) : inlineContent.type === 'podcast' ? (
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">
                    {inlineContent.type}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {inlineContent.data.title}
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  {inlineContent.data.description}
                </p>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <span>Personalized for {selectedRole} • {selectedBusinessModel}</span>
                  <span>•</span>
                  <span>{inlineContent.data.duration}</span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="px-8 py-8">
              {/* Video/Podcast Player Area */}
              {(inlineContent.type === 'video' || inlineContent.type === 'podcast') && (
                <div className="mb-8">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center border border-purple-200">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-purple-700 transition-colors cursor-pointer">
                        {inlineContent.type === 'video' ? (
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        ) : (
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                          </svg>
                        )}
                      </div>
                      <p className="text-gray-600 font-medium">
                        {inlineContent.type === 'video' ? 'Video Player' : 'Podcast Player'}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Duration: {inlineContent.data.duration}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Content */}
              <article className="max-w-none">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed text-left">
                    {inlineContent.data.content}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to implement these insights?</h3>
                  <p className="text-gray-600 mb-4">Get personalized recommendations based on your {selectedRole} role and {selectedBusinessModel} context.</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="gradient-purple text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Get Started with Stream AI</span>
                    </button>
                    <button
                      onClick={closeInlineContent}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-300 text-sm font-medium"
                    >
                      Back to Response
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
