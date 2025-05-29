import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  MessageCircle,
  Calendar,
  HeadphonesIcon,
  Mail,
  Phone,
  Users,
  Zap
} from "lucide-react";

export default function CTA() {
  const ctaOptions = [
    {
      icon: MessageCircle,
      title: "Get in touch",
      description: "Contact us",
      action: "Contact us",
      variant: "default" as const,
      href: "#contact"
    },
    {
      icon: Calendar,
      title: "Join a webinar",
      description: "Explore Webinars",
      action: "View events",
      variant: "outline" as const,
      href: "#webinars"
    },
    {
      icon: HeadphonesIcon,
      title: "Get support",
      description: "Access Support portal",
      action: "Get help",
      variant: "outline" as const,
      href: "#support"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div className="text-center mb-20">
          <Card className="border-0 bg-gradient-purple text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <CardContent className="relative p-12 lg:p-20">
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-5xl font-bold">
                    Get started with a demo
                  </h2>
                  <p className="text-xl text-white/90 max-w-2xl mx-auto">
                    Take the first step to achieving your digital experience goals.
                    Let us show you how Sitecore can help your brand deliver exceptional experiences.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-sitecore-purple hover:bg-white/90">
                    Request a demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sitecore-purple">
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule a call
                  </Button>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                        <Users className="h-6 w-6" />
                      </div>
                      <p className="text-sm text-white/80">1000+ Experts</p>
                    </div>
                    <div>
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                        <Zap className="h-6 w-6" />
                      </div>
                      <p className="text-sm text-white/80">AI-Powered Platform</p>
                    </div>
                    <div>
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                      <p className="text-sm text-white/80">30-day Free Trial</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary CTAs */}
        <div className="grid md:grid-cols-3 gap-8">
          {ctaOptions.map((option, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sitecore-purple/10 rounded-2xl mb-4 group-hover:bg-sitecore-purple/20 transition-colors">
                    <option.icon className="h-8 w-8 text-sitecore-purple" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                <Button
                  variant={option.variant}
                  className={`w-full ${
                    option.variant === 'default'
                      ? 'bg-sitecore-purple hover:bg-sitecore-purple/90 text-white'
                      : 'border-sitecore-purple text-sitecore-purple hover:bg-sitecore-purple hover:text-white'
                  }`}
                >
                  {option.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry Recognition */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8">What industry experts say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="h-12 w-24 bg-muted rounded flex items-center justify-center mx-auto mb-4">
                    <span className="text-xs font-bold">GARTNER</span>
                  </div>
                  <h4 className="font-semibold mb-2">2025 Gartner Magic Quadrant</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    for Digital Asset Management Platforms
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-sitecore-purple text-sitecore-purple hover:bg-sitecore-purple hover:text-white">
                  See Gartner report
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="h-12 w-24 bg-muted rounded flex items-center justify-center mx-auto mb-4">
                    <span className="text-xs font-bold">GARTNER</span>
                  </div>
                  <h4 className="font-semibold mb-2">2025 Gartner Magic Quadrant</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    for Digital Experience Platforms
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-sitecore-purple text-sitecore-purple hover:bg-sitecore-purple hover:text-white">
                  See Gartner report
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="h-12 w-16 bg-muted rounded flex items-center justify-center mx-auto mb-4">
                    <span className="text-xs font-bold">IDC</span>
                  </div>
                  <h4 className="font-semibold mb-2">IDC MarketScape</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Worldwide Hybrid Headless CMS 2023
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-sitecore-purple text-sitecore-purple hover:bg-sitecore-purple hover:text-white">
                  See IDC report
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
