"use client";

import { Search, Mic, ArrowUp, CheckCircle, BookOpen, Lightbulb } from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [currentQuery, setCurrentQuery] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState(46);
  const hotTopics: string[] = [
    "Future of Search",
    "Personalization at AI Scale",
    "Generative Experiences"
  ];
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [loadingContent, setLoadingContent] = useState<string | null>(null);
  const [showStreamActions, setShowStreamActions] = useState(false);
  const [inlineContent, setInlineContent] = useState<ModalContent | null>(null);
  const [activeContentLocation, setActiveContentLocation] = useState<string | null>(null);
  const [conceptQueries, setConceptQueries] = useState<Array<{concept: string, response: string}>>([]);
  const [conversationBubbles, setConversationBubbles] = useState<Array<{query: string, response: string}>>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const streamActionsRef = useRef<HTMLDivElement>(null);

  // Close stream actions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (streamActionsRef.current && !streamActionsRef.current.contains(event.target as Node)) {
        setShowStreamActions(false);
      }
    };

    if (showStreamActions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStreamActions]);

  const allSelected = selectedIndustry;

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
    const getTopicResponse = (topic: string, industry: string) => {
      // Industry-specific lenses
      const industryLenses = {
        "Retail & Consumer Goods": "Shoppers expect instant, product-aware results across search, voice, and chat—linked to inventory and offers.",
        "Financial Services": "Trust and compliance are key. Search must surface secure, personalized insights while adhering to strict privacy controls.",
        "Manufacturing": "B2B buyers need functional, spec-driven search that understands product hierarchies and technical documentation.",
        "Healthcare": "Patients expect accurate, contextual answers. Providers need search that balances personalization with compliance.",
        "Information Technology": "IT buyers expect fast, developer-friendly discovery—APIs, docs, case studies—served intelligently across touchpoints.",
        "Government": "Citizens want simple, accessible answers. AI search must surface services clearly and fairly without bias.",
        "Other B2C": "Brands must optimize for conversational and AI-native search formats in entertainment, travel, and lifestyle contexts.",
        "Other B2B": "Complex buyer journeys demand contextual, role-based discovery experiences across content, pricing, and support."
      };

      const topicContent = {
        "Future of Search": {
          summary: `Search is no longer just about keywords. With AI, semantic understanding, and conversational interfaces, users now expect intelligent, intent-driven discovery across every channel. The future of search is multimodal, personalized, and increasingly shaped by autonomous agents that curate answers instead of links. For marketers, this means rethinking content strategy, SEO, and experience design in a world where AI mediates attention and access.`,
          industryLens: industryLenses[industry as keyof typeof industryLenses] || industryLenses["Other B2B"],
          businessImpact: [
            "Increases discoverability and conversion through more relevant results",
            "Reduces friction in user journeys across all digital touchpoints",
            "Elevates brand perception through intelligent, assistive experiences"
          ],
          enablingUseCases: [
            "Context-Aware Content: Ensures results match user intent, behavior, and journey stage",
            "Adaptive Omnichannel Optimization: Continuously refines what's surfaced, where, and how it's delivered"
          ]
        },
        "Personalization at AI Scale": {
          summary: `Scale personalization beyond basic demographics to real-time behavioral adaptation, creating unique experiences for every user interaction while maintaining privacy and performance.`,
          industryLens: industryLenses[industry as keyof typeof industryLenses] || industryLenses["Other B2B"],
          businessImpact: [
            "Real-time behavioral analysis",
            "Dynamic content adaptation",
            "Privacy-first personalization"
          ],
          enablingUseCases: [
            "Cross-channel consistency",
            "Automated personalization workflows"
          ]
        },
        "Generative Experiences": {
          summary: `Move beyond static content to dynamic, AI-generated experiences that adapt in real-time based on user needs, preferences, and context, creating truly unique digital interactions.`,
          industryLens: industryLenses[industry as keyof typeof industryLenses] || industryLenses["Other B2B"],
          businessImpact: [
            "Dynamic content generation",
            "Adaptive user interfaces",
            "Contextual experience flows"
          ],
          enablingUseCases: [
            "Intelligent content optimization",
            "Real-time experience adaptation"
          ]
        }
      };

      const content = topicContent[topic as keyof typeof topicContent];
      if (!content) return "This topic is being developed. Please try one of the available topics.";

      return `Summary
${content.summary}

Industry Lens
${content.industryLens}

Business Impact
${content.businessImpact ? content.businessImpact.map(point => `• ${point}`).join('\n') : '• Enhanced operational efficiency and user experience'}

Enabling Use Cases
${content.enablingUseCases ? content.enablingUseCases.map(point => `• ${point}`).join('\n') : '• Improved user engagement and satisfaction'}`;
    };

    const response = getTopicResponse(question, selectedIndustry || 'Cross-industry');

    const fullResponse = response;

    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < fullResponse.length) {
        setStreamingContent(fullResponse.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
      }
    }, 8); // Changed from 12ms to 8ms (30% faster streaming)
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
    const mockContent = generateMockContent(newType, currentQuery || 'Future of Search');
    setInlineContent({ type: newType, data: mockContent });
    setActiveContentLocation('default');
    setIsContentExpanded(false); // Reset expansion state when switching types
    setShowFullArticle(false); // Reset article expansion state when switching types
  };

  const generateMockContent = (type: string, topic: string) => {
    const topicTitles = {
      "Future of Search": {
        article: "Future of Search",
        video: "Future of Search",
        podcast: "Future of Search"
      },
      "Personalization at AI Scale": {
        article: "Personalization at AI Scale",
        video: "Personalization at AI Scale",
        podcast: "Personalization at AI Scale"
      },
      "Generative Experiences": {
        article: "Generative Experiences",
        video: "Generative Experiences",
        podcast: "Generative Experiences"
      }
    };

    const currentTopic = topic || currentQuery || "Future of Search";
    const titles = topicTitles[currentTopic as keyof typeof topicTitles] || topicTitles["Future of Search"];

    const baseContent = {
      title: titles[type as keyof typeof titles] || `${currentTopic} ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: `Sitecore's take on this hot topic`,
      duration: type === 'video' ? '15:42' : type === 'podcast' ? '32:18' : '12 min read',
      content: `This ${type} provides comprehensive coverage of ${currentTopic.toLowerCase()}.

**What You'll Learn:**
• Technology foundations and implementation strategies
• Industry use cases and applications
• Best practices and methodologies
• Real-world examples and case studies
• Step-by-step implementation roadmap

**Key Insights:**
This content addresses the core concepts and practical applications, providing actionable strategies you can implement.

**Format-Specific Value:**
${type === 'article' ? 'In-depth analysis with visual frameworks and downloadable resources' :
  type === 'video' ? 'Live demonstrations, expert interviews, and practical tutorials' :
  'Executive roundtable discussions with industry leaders and Q&A sessions'}

*This is placeholder content demonstrating the structured approach to topic-specific materials.*`
    };

    return baseContent;
  };

  const closeInlineContent = () => {
    setInlineContent(null);
    setActiveContentLocation(null);
    setIsContentExpanded(false);
  };

  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [showFullArticle, setShowFullArticle] = useState(false);

  const handleKeyConcept = (concept: string) => {
    const conceptSummaries = {
      'Machine Learning': 'Machine Learning enables systems to automatically learn and improve from experience without being explicitly programmed. In the context of AI-powered experiences, ML algorithms analyze user behavior patterns, preferences, and interactions to predict needs and personalize content in real-time.',
      'Real-time Processing': 'Real-time processing allows systems to handle and respond to data as it arrives, enabling immediate personalization and dynamic content delivery. This capability is essential for creating responsive, adaptive digital experiences that feel natural and intuitive to users.',
      'User Intent': 'User Intent refers to understanding what users are actually trying to accomplish, going beyond surface-level interactions to grasp underlying goals and motivations. AI systems analyze context, behavior patterns, and implicit signals to better serve user needs.',
      'Dynamic Content': 'Dynamic Content automatically adapts and changes based on user context, preferences, and real-time conditions. This includes personalized messaging, adaptive interfaces, and content that evolves to match user journey stages and individual characteristics.',
      'Digital Innovation': `Digital Innovation in the ${selectedIndustry || 'industry'} context involves leveraging emerging technologies to create new value propositions, improve operational efficiency, and enhance customer experiences. This includes AI-driven automation, intelligent workflows, and data-powered decision making.`,
      'Competitive Advantage': `Competitive Advantage through AI technologies enables ${selectedIndustry || 'organizations'} to differentiate themselves through superior customer experiences, operational efficiency, and innovative service delivery. This strategic use of AI creates sustainable market positioning and customer loyalty.`,
      'Atomic Content': 'Atomic Content refers to modular, reusable content components that can be dynamically assembled and personalized for different contexts, channels, and user needs. This approach enables efficient content management and consistent experiences across touchpoints.',
      'Personalization': 'Personalization leverages AI to deliver tailored experiences based on individual user data, behaviors, and preferences. Modern personalization goes beyond basic demographics to create dynamic, contextual experiences that adapt in real-time.',
      'Knowledge Graphs': 'Knowledge Graphs organize information as interconnected entities and relationships, enabling AI systems to understand context, make connections, and provide more intelligent, relevant responses to user queries.',
      'Context-Aware Content': 'Context-Aware Content adapts automatically based on user situation, device, location, time, and intent. This ensures that the right information is delivered in the right format at the right moment for optimal user experience.',
      'Semantic Search': 'Semantic Search understands the meaning and intent behind queries rather than just matching keywords. It uses natural language processing and AI to deliver more accurate, contextual results that truly answer what users are looking for.',
      'Vector Embeddings': 'Vector Embeddings transform text, images, and other data into numerical representations that capture semantic meaning. This enables AI systems to find relationships and similarities that traditional keyword-based systems would miss.',
      'Multimodal AI': 'Multimodal AI processes and integrates multiple types of data simultaneously—text, images, voice, video—to create richer, more natural user interactions and more comprehensive understanding of user needs.',
      'Conversational UX': 'Conversational UX enables users to interact with systems through natural language, creating more intuitive and efficient experiences. This includes chatbots, voice interfaces, and AI assistants that understand context and intent.'
    };

    const summary = conceptSummaries[concept as keyof typeof conceptSummaries] || `${concept} is a key concept in modern AI-powered digital experiences, enabling more sophisticated and effective user interactions.`;

    // Add the concept as a conversation bubble
    setConversationBubbles(prev => [...prev, {
      query: `What is ${concept}?`,
      response: summary
    }]);

    // Scroll to the concept deep dive section after a brief delay
    setTimeout(() => {
      const conceptSection = document.querySelector('[data-concept-deep-dive]');
      if (conceptSection) {
        const elementTop = conceptSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetTop = elementTop - 100; // Show some context above
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }, 100);
  };

  const getBigPictureContent = (topic: string, industry: string) => {
    // Industry-specific content for "Future of Search"
    const industryContent = {
      "Retail & Consumer Goods": {
        text: "Search is now the digital storefront. From AI-powered product discovery to inventory-aware results, search must guide shoppers intuitively while reflecting availability, offers, and brand tone.",
        concepts: ["Atomic Content", "Personalization"]
      },
      "Financial Services": {
        text: "In financial services, AI-driven search must balance intelligence with compliance. Discovery tools must provide relevant advice and support journeys—without overstepping regulatory or trust boundaries.",
        concepts: ["Knowledge Graphs", "Context-Aware Content"]
      },
      "Manufacturing": {
        text: "Search in manufacturing is no longer just a database query—it must handle spec-driven lookups, compatibility questions, and contextual support across complex product lines.",
        concepts: ["Semantic Search", "Vector Embeddings"]
      },
      "Healthcare": {
        text: "Search must serve as a trusted assistant—helping patients, providers, and caregivers find answers that are not only relevant but safe, compliant, and empathetic.",
        concepts: ["Context-Aware Content", "Multimodal AI"]
      },
      "Information Technology": {
        text: "Developers and IT buyers expect search to surface answers fast—across APIs, documentation, and best practices—while understanding intent beyond keywords.",
        concepts: ["Semantic Search", "Conversational UX"]
      },
      "Government": {
        text: "Citizens expect clear, accessible service information. AI-enhanced search must reduce complexity, eliminate bias, and guide users through eligibility, application, and support with clarity.",
        concepts: ["Knowledge Graphs", "Personalization"]
      },
      "Other B2C": {
        text: "In high-engagement B2C categories like travel, entertainment, and lifestyle, search becomes a discovery engine—guiding exploration through AI-powered recommendations and prompts.",
        concepts: ["Multimodal AI", "Personalization"]
      },
      "Other B2B": {
        text: "B2B buyers need role-aware, account-informed search that adapts to complex buying teams, product configurations, and long consideration cycles.",
        concepts: ["Vector Embeddings", "Atomic Content"]
      }
    };

    const industryData = industryContent[industry as keyof typeof industryContent] || industryContent["Other B2B"];

    return (
      <div className="space-y-4 text-xs text-left">
        {/* Technology Lens */}
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-gray-700 leading-snug mb-2 font-bold">
              Technology Lens
            </p>
            <p className="text-gray-700 leading-snug text-xs">
              AI is shifting search from keyword-based indexing to semantic understanding and multimodal input interpretation.
            </p>
          </div>
        </div>

        {/* Experience Lens */}
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-gray-700 leading-snug mb-2 font-bold">
              Experience Lens
            </p>
            <p className="text-gray-700 leading-snug text-xs">
              Users now expect smart, contextual answers via chat, voice, and prompt-based interfaces. Search must feel conversational and fluid.
            </p>
          </div>
        </div>

        {/* Industry Lens */}
        <div className="flex items-start gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
          <div className="text-left">
            <p className="text-gray-700 leading-snug mb-2 font-bold">
              Industry Lens
            </p>
            <p className="text-gray-700 leading-snug text-xs mb-2">
              {industryData.text}
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-gray-600 text-xs font-medium mr-1">Key Concepts:</span>
              {industryData.concepts.map((concept, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 cursor-pointer transition-colors"
                  onClick={() => handleKeyConcept(concept)}
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatStreamingContent = (content: string) => {
    // Split content into lines and format section headers
    const lines = content.split('\n');
    const sectionHeaders = ['Summary', 'Industry Lens', 'Business Impact', 'Enabling Use Cases'];

    return lines.map((line, index) => {
      const trimmedLine = line.trim();

      // Check if this line is a section header
      if (sectionHeaders.includes(trimmedLine)) {
        let displayTitle = trimmedLine;

        // Add selected industry to Industry Lens title
        if (trimmedLine === 'Industry Lens' && selectedIndustry) {
          displayTitle = `Industry Lens (${selectedIndustry})`;
        }

        return (
          <div key={index} className="font-bold text-gray-900 mt-6 mb-3 first:mt-0">
            {displayTitle}
          </div>
        );
      }

      // Regular content lines
      if (trimmedLine) {
        return (
          <div key={index} className="mb-2">
            {trimmedLine}
          </div>
        );
      }

      // Empty lines for spacing
      return <div key={index} className="h-2" />;
    });
  };

  const handleStreamAction = (action: string) => {
    setIsStreaming(true);
    setShowStreamActions(false); // Hide dropdown immediately

    // Simulate different AI actions
    const actionResponses: { [key: string]: string } = {
      summarize: `Here's a concise summary tailored for the ${selectedIndustry} industry:\n\nKey takeaways:\n• AI personalization increases engagement by 300%\n• Implementation typically takes 2-3 months\n• ROI becomes visible within first quarter\n• Best suited for ${selectedIndustry} environments\n\nNext steps: Consider pilot program with core user segments.`,
      translate: `Aquí está la respuesta traducida al español:\n\n**${currentQuery} - Perspectiva de la Industria ${selectedIndustry}**\n\nLa IA está revolucionando la búsqueda desde la coincidencia de palabras clave hasta la comprensión de la intención y el contexto del usuario. Los sistemas de búsqueda modernos anticipan necesidades, personalizan resultados y ofrecen experiencias conversacionales.\n\n**Perspectivas específicas de la industria:**\nPara la industria ${selectedIndustry}, la búsqueda inteligente transforma cómo los clientes descubren productos, acceden a información e interactúan con su ecosistema digital.\n\n**Áreas clave de implementación:**\n• Algoritmos de búsqueda basados en intención\n• Interfaces de búsqueda conversacional\n• Sugerencias de búsqueda predictiva\n• Clasificación de resultados consciente del contexto`,
      expand: `Let's dive deeper into ${currentQuery} from your industry perspective:\n\n**Advanced Technical Considerations:**\n• Machine learning model selection and training\n• Real-time data processing architectures\n• Integration with existing ${selectedIndustry} systems\n• Data privacy and compliance frameworks\n• Performance monitoring and optimization\n\n**Implementation Strategy:**\n• Phase 1: Proof of concept with limited user group\n• Phase 2: Gradual rollout with A/B testing\n• Phase 3: Full deployment with continuous optimization\n\n**${selectedIndustry} Industry Specifics:**\nBased on your industry context, I recommend focusing on practical implementation strategies that align with regulatory requirements and existing technology infrastructure.`,
      examples: `Here are specific examples relevant to the ${selectedIndustry} industry:\n\n**Example 1: Real-time Product Recommendations**\n- Increases conversion by 25-40%\n- Works well with existing industry workflows\n- Implementation timeline: 4-6 weeks\n\n**Example 2: Dynamic Content Personalization**\n- Reduces bounce rate by 30%\n- Improves user engagement metrics\n- ROI visible within first quarter\n\n**Example 3: Predictive Customer Journey Mapping**\n- Optimizes touchpoint effectiveness\n- Enhances ${selectedIndustry} customer experience\n- Enables proactive customer service\n\nThese examples are specifically chosen based on your ${selectedIndustry} industry context and proven success rates.`
    };

    const response = actionResponses[action] || `Processing ${action} request for your ${selectedIndustry} context...`;

    // Scroll to the main response area
    setTimeout(() => {
      const responseSection = document.querySelector('[data-main-response]');
      if (responseSection) {
        const elementTop = responseSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetTop = elementTop - 100; // Show some context above
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }, 100);

    // Simulate streaming response (30% faster than previous)
    setStreamingContent("");
    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < response.length) {
        setStreamingContent(response.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
      }
    }, 8); // Changed from 12ms to 8ms (30% faster streaming)
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

                <div className="flex flex-col md:flex-row gap-6 mb-10">
                  {/* Your Role and Why You're Here - 35% width */}
                  <div className="md:w-[35%] bg-gray-50/50 rounded-2xl p-4 border border-gray-100 opacity-60 space-y-6">
                    {/* Your Role */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                        Your role
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          Coming soon
                        </span>
                      </label>
                      <div className="space-y-1">
                        {["Marketing", "Technology"].map((role) => (
                          <label key={role} className="flex items-center cursor-not-allowed group">
                            <input
                              type="radio"
                              name="role"
                              value={role}
                              disabled
                              className="w-4 h-4 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2 flex-shrink-0 opacity-50"
                            />
                            <span className="ml-3 text-sm text-gray-500 font-medium">
                              {role}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Why You're Here */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                        Why you are here
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          Coming soon
                        </span>
                      </label>
                      <div className="space-y-1">
                        {["Researching AI", "Researching Solution", "Sitecore Customer", "Other"].map((reason) => (
                          <label key={reason} className="flex items-center cursor-not-allowed group">
                            <input
                              type="radio"
                              name="whyHere"
                              value={reason}
                              disabled
                              className="w-4 h-4 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2 flex-shrink-0 opacity-50"
                            />
                            <span className="ml-3 text-sm text-gray-500 font-medium">
                              {reason}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Your Industry - 65% width with Two Columns */}
                  <div className="md:w-[65%] bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0" />
                      Your industry
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {[
                        "Financial Services",
                        "Manufacturing",
                        "Retail & Consumer Goods",
                        "Healthcare",
                        "Information Technology",
                        "Professional Services",
                        "Government",
                        "Other B2C",
                        "Other B2B"
                      ].map((industry) => (
                        <label key={industry} className="flex items-start cursor-pointer group">
                          <input
                            type="radio"
                            name="industry"
                            value={industry}
                            checked={selectedIndustry === industry}
                            onChange={(e) => setSelectedIndustry(e.target.value)}
                            className="w-4 h-4 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2 flex-shrink-0 mt-0.5"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-medium leading-tight">
                            {industry}
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
                          <span className="font-semibold" style={{color: "#8042FF"}}>{selectedIndustry}</span> industry.
                        </span>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() => {
                            setSelectedRole("");
                            setSelectedIndustry("");
                            setCurrentQuery("");
                            setStreamingContent("");
                          }}
                          className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                        >
                          Reset selections
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Please select your industry to personalize your experience.
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
                <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
                  {hotTopics.map((topic, index) => (
                    <button
                      key={`${topic}-${index}`}
                      onClick={() => handleTopicClick(topic)}
                      className="px-4 py-2 gradient-purple text-white hover:opacity-90 rounded-full text-sm font-medium transition-all hover:shadow-lg border-0 whitespace-nowrap hover:scale-105 transform"
                      disabled={isStreaming}
                    >
                      {topic}
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
                        <span className="font-medium text-gray-600">Industry:</span>
                        <span className="text-purple-600 font-semibold text-right">{selectedIndustry}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-600">Role:</span>
                        <span className="text-gray-400 font-semibold text-right">Not set</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-600">Why you are here:</span>
                        <span className="text-gray-400 font-semibold text-right">Not set</span>
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
                        {currentQuery && getBigPictureContent(currentQuery, selectedIndustry)}
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
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300" data-main-response>

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
                      <div className="relative  text-gray-800 leading-7 text-base text-left bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                        {streamingContent && formatStreamingContent(streamingContent)}
                        {isStreaming && (
                          <span className="inline-block w-2 h-5 bg-purple-600 animate-pulse ml-1 rounded" />
                        )}

                        {/* Hovering Adjust with Stream AI button - positioned over end of response */}
                        {!isStreaming && streamingContent && (
                          <div className="absolute bottom-4 right-4">
                            <div className="relative" ref={streamActionsRef}>
                              <button
                                onClick={() => setShowStreamActions(!showStreamActions)}
                                className="gradient-purple text-white px-3 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 text-xs font-medium opacity-90 hover:opacity-100"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Adjust with Stream AI</span>
                                <svg
                                  className={`w-2 h-2 transition-transform duration-300 ${showStreamActions ? 'rotate-180' : ''}`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>

                              {/* Stream Actions Dropdown */}
                              {showStreamActions && (
                                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-3 min-w-[200px] z-50">
                                  <div className="space-y-2">
                                    <button
                                      onClick={() => handleStreamAction('summarize')}
                                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      Summarize
                                    </button>
                                    <button
                                      onClick={() => handleStreamAction('translate')}
                                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                      </svg>
                                      Translate to Spanish
                                    </button>
                                    <button
                                      onClick={() => handleStreamAction('expand')}
                                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                      </svg>
                                      Expand details
                                    </button>
                                    <button
                                      onClick={() => handleStreamAction('examples')}
                                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                      </svg>
                                      Show examples
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
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
                                Read
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
                                Watch
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
                                Listen
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
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {inlineContent ? inlineContent.data.title : currentQuery || 'Future of Search'}
                                      </h3>
                                      <p className="text-sm text-gray-600 mb-2">
                                        {inlineContent ? inlineContent.data.description : `Sitecore's take on this hot topic`}
                                      </p>
                                      <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span>{inlineContent ? inlineContent.data.duration : '8 min read'}</span>
                                      </div>
                                    </div>

                                    {/* Expand Button */}
                                    <button
                                      onClick={() => {
                                        // Scroll to show the full-width content with header visible
                                        const fullWidthContent = document.querySelector('[data-full-content]');
                                        if (fullWidthContent) {
                                          const elementTop = fullWidthContent.getBoundingClientRect().top + window.pageYOffset;
                                          // Offset by 100px to show the header and "Back to Response" button
                                          const offsetTop = elementTop - 100;
                                          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                        }
                                      }}
                                      className="ml-4 px-3 py-1.5 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                      </svg>
                                      Expand
                                    </button>
                                  </div>
                                </div>

                                {/* Content Body */}
                                <div className="px-6 py-4">
                                  {/* Video/Podcast Player Area */}
                                  {inlineContent && (inlineContent.type === 'video' || inlineContent.type === 'podcast') && (
                                    <div className="mb-6">
                                      {inlineContent.type === 'video' && (currentQuery === 'Future of Search' || inlineContent.data.title === 'Future of Search') ? (
                                        <div className="aspect-video rounded-lg overflow-hidden border border-purple-200">
                                          <iframe
                                            src="https://share.synthesia.io/embeds/videos/46319d23-841d-4467-97fd-5af6d9cb053c"
                                            loading="lazy"
                                            title="Synthesia video player - Future Search"
                                            allowFullScreen
                                            allow="encrypted-media; fullscreen;"
                                            className="w-full h-full"
                                            style={{ border: 'none', padding: 0, margin: 0 }}
                                          />
                                        </div>
                                      ) : (
                                        <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center border border-purple-200">
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
                                      )}
                                    </div>
                                  )}

                                  {/* Article Content Preview */}
                                  {/* Article Content Preview - Only show for articles */}
                                  {(!inlineContent || inlineContent.type === 'article') && (
                                    <div className="text-sm text-gray-700 leading-relaxed text-left">
                                    {showFullArticle ? (
                                      <div className="whitespace-pre-line">
                                        {inlineContent ? inlineContent.data.content : `This article explores the latest developments and practical applications...

**What You'll Learn:**
• Technology foundations and implementation strategies
• Industry use cases and applications
• Best practices and methodologies
• Real-world examples and case studies
• Step-by-step implementation roadmap

**Key Insights:**
This content addresses the core concepts and practical applications, providing actionable strategies you can implement.

**Format-Specific Value:**
In-depth analysis with visual frameworks and downloadable resources

*This is placeholder content demonstrating the structured approach to topic-specific materials.*`}
                                      </div>
                                    ) : (
                                      inlineContent ?
                                        inlineContent.data.content.split('\n\n')[0] + '...' :
                                        `This article explores the latest developments and practical applications...`
                                    )}

                                    {!showFullArticle && (
                                      <div className="mt-4">
                                        <button
                                          onClick={() => setShowFullArticle(true)}
                                          className="gradient-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                                        >
                                          Continue reading
                                        </button>
                                      </div>
                                    )}
                                    </div>
                                  )}
                                </div>
                              </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Conversation Bubbles - Show concept queries */}
                    {conversationBubbles.length > 0 && (
                      <div className="mt-8 space-y-4" data-concept-deep-dive>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          Concept Deep Dive
                        </h3>

                        {conversationBubbles.map((bubble, index) => (
                          <div key={index} className="space-y-3">
                            {/* User query bubble */}
                            <div className="flex justify-end">
                              <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                                <p className="text-sm font-medium">{bubble.query}</p>
                              </div>
                            </div>

                            {/* AI response bubble */}
                            <div className="flex justify-start">
                              <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md max-w-2xl">
                                <p className="text-sm leading-relaxed text-left">{bubble.response}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rich Multimedia Content Section - Only show when response is complete */}
                    {!isStreaming && streamingContent && (
                      <div className="mt-8 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          Related Resources
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* AI and the future of CMS Video Card */}
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-video bg-gray-100 relative group">
                              <video
                                className="w-full h-full object-cover"
                                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3EAI and the future of CMS%3C/text%3E%3C/svg%3E"
                                controls
                                preload="metadata"
                              >
                                <source src="https://webinars.sitecore.com/64968576/111460093/96f098177df90f545d9b87228c45b32c/video_hd/digital-visionaries-liz-nelson-7-video.mp4?referer=&uuid=968baaae-eff0-0acf-8f7c-db31a94fcc67" type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <div className="absolute inset-0 bg-purple-600 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">AI and the future of CMS</h4>
                              <p className="text-sm text-gray-600 mb-3">Explore how artificial intelligence is transforming content management systems and shaping the future of digital experiences.</p>
                            </div>
                          </div>

                          {/* Navigating the AI revolution with Sitecore Video Card */}
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-video bg-gray-100 relative group">
                              <video
                                className="w-full h-full object-cover"
                                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3ENavigating the AI revolution%3C/text%3E%3C/svg%3E"
                                controls
                                preload="metadata"
                              >
                                <source src="https://webinars.sitecore.com/64968568/111959869/9e19dc990e5c6c1aa207451a278c39bf/video_hd/navigating-the-ai-revolution-with-7-video.mp4?referer=&uuid=968baaae-eff0-0acf-8f7c-db31a94fcc67" type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <div className="absolute inset-0 bg-purple-600 bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Navigating the AI revolution with Sitecore</h4>
                              <p className="text-sm text-gray-600 mb-3">Learn how to successfully navigate the AI revolution and leverage Sitecore's capabilities for enhanced digital experiences.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isStreaming && streamingContent && (
                      <div className="mt-8 pt-6 border-t border-gray-200">
                        {/* Expandable Stream AI Actions - positioned when hovering button is clicked */}
                        <div className="mb-6">
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
        <div className="max-w-7xl mx-auto mt-8" data-full-content>
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
                  <span>{inlineContent?.data.duration}</span>
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
                  {inlineContent.type === 'video' && (currentQuery === 'Future of Search' || inlineContent.data.title === 'Future of Search') ? (
                    <div className="aspect-video rounded-xl overflow-hidden border border-purple-200">
                      <iframe
                        src="https://share.synthesia.io/embeds/videos/46319d23-841d-4467-97fd-5af6d9cb053c"
                        loading="lazy"
                        title="Synthesia video player - Future Search"
                        allowFullScreen
                        allow="encrypted-media; fullscreen;"
                        className="w-full h-full"
                        style={{ border: 'none', padding: 0, margin: 0 }}
                      />
                    </div>
                  ) : (
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
                  )}
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
                  <p className="text-gray-600 mb-4">Get personalized recommendations based on your {selectedIndustry} industry context.</p>
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
