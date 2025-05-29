import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Users,
  BarChart3,
  Zap,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Features() {
  const capabilities = [
    {
      icon: Layers,
      title: "Total solution flexibility",
      description: "Sitecore's composable platform offers the flexibility to create a solution as unique as your business and tech stack.",
      category: "VERSATILITY"
    },
    {
      icon: Users,
      title: "Connecting marketers and developers",
      description: "Simplicity for marketers and agility for developers, enabling teams to work in harmony.",
      category: "SYNERGY"
    },
    {
      icon: BarChart3,
      title: "Unlimited scale and complexity made easy",
      description: "Built for enterprise scale. Choose capabilities for today and add more as your vision evolves.",
      category: "SIMPLICITY"
    }
  ];

  const useCases = [
    {
      icon: Zap,
      title: "Modernize your DX",
      description: "Build and launch lightning-fast personalized experiences that drive engagement and keep customers coming back for more.",
      href: "#modernize"
    },
    {
      icon: Globe,
      title: "Manage global content",
      description: "Craft content that matters and share it with the world through unified content management.",
      href: "#content"
    },
    {
      icon: Shield,
      title: "Deliver limitless commerce",
      description: "Create engaging, personalized ecommerce experiences wherever your customers are.",
      href: "#commerce"
    },
    {
      icon: BarChart3,
      title: "Optimize with data",
      description: "Analyze, improve, and optimize your website for better user experiences that get results.",
      href: "#data"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* What can we do for you section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              What can we do for you?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-sitecore-purple/30">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-sitecore-purple/10 rounded-lg group-hover:bg-sitecore-purple/20 transition-colors">
                      <useCase.icon className="h-6 w-6 text-sitecore-purple" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-sitecore-purple transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {useCase.description}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-sitecore-purple hover:text-sitecore-purple/80">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* What makes us different section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              What makes us different
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-sitecore-purple/10 text-sitecore-purple text-xs font-medium rounded-full mb-4">
                    {capability.category}
                  </span>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-purple rounded-2xl mb-4">
                    <capability.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {capability.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sitecore Stream highlight */}
        <div className="relative">
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-sitecore-purple/5 to-sitecore-red/5">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0 min-h-[400px]">
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Sitecore Stream
                      </h2>
                      <p className="text-xl text-muted-foreground mb-6">
                        Boost productivity and drive growth with AI and orchestration across your DXP.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-8">
                        Transform your content-experience lifecycle with AI workflows, generative copilots,
                        and brand-aware AI to work smarter, more strategically, and more securely.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">AI-driven content orchestration</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Intelligent workflow automation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">Brand-aware generative AI</span>
                      </div>
                    </div>

                    <Button className="bg-sitecore-purple hover:bg-sitecore-purple/90 text-white">
                      Explore Sitecore Stream
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative bg-gradient-to-br from-sitecore-purple/10 to-sitecore-red/10 p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative w-full max-w-sm">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-sitecore-purple/20 rounded-2xl transform rotate-12"></div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-sitecore-red/20 rounded-xl transform -rotate-12"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-purple rounded-3xl flex items-center justify-center">
                      <Zap className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
