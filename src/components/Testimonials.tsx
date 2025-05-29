import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quote, Star, ArrowRight } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Sitecore has delivered an intuitive digital experience tailored to individuals throughout the process rather than catering for all.",
      author: "Dee Reid",
      title: "Director of External Relations",
      company: "Leeds Beckett University",
      rating: 5
    },
    {
      quote: "The composable architecture empowers us to deploy solutions that help millions of travelers navigate seamlessly.",
      author: "Sarah Johnson",
      title: "Digital Experience Manager",
      company: "United Airlines",
      rating: 5
    },
    {
      quote: "With Sitecore, we've increased conversion rates by 25% and significantly improved our customer experience.",
      author: "Michael Chen",
      title: "Head of Digital Innovation",
      company: "Toyota Australia",
      rating: 5
    }
  ];

  const customerStories = [
    {
      badge: "Customer Award",
      title: "Toyota Australia makes car buying easy with Sitecore",
      description: "Toyota Australia deployed a modern DXP for consumers to find used cars from home, raising conversion rates by 25%.",
      image: "https://ext.same-assets.com/1298925758/391245903.webp"
    },
    {
      badge: "Customer Award",
      title: "Sitecore OrderCloud helps online retailer drive up business performance",
      description: "Bachmans grows e-commerce sales 6.31%, increases website time 11.47% and raises conversion rates 9.92%.",
      image: "https://ext.same-assets.com/1298925758/403183439.webp"
    },
    {
      badge: "Customer Award",
      title: "BDR Thermea boosts productivity eight-fold with composable Sitecore solutions",
      description: "Composable Sitecore solutions increase digital efficiency and business agility for BDR Thermea Group.",
      image: "https://ext.same-assets.com/1298925758/3383672608.webp"
    }
  ];

  const partnerLogos = [
    "Microsoft", "AWS", "Google Cloud", "Salesforce", "Adobe", "Contentful"
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Community Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Thousands of <span className="text-sitecore-gray">Experts</span><br/>
              Hundreds of <span className="text-sitecore-purple">Partners</span><br/>
              One <span className="text-sitecore-red">Community</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button variant="outline" className="border-sitecore-purple text-sitecore-purple hover:bg-sitecore-purple hover:text-white">
              Find a partner
            </Button>
            <Button className="bg-sitecore-red hover:bg-sitecore-red/90 text-white">
              Join our community
            </Button>
          </div>

          {/* Partner logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 opacity-60">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-12 w-24 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">{logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-sitecore-purple mb-4" />
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="border-t pt-6">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    <p className="text-sm font-medium text-sitecore-purple">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Customer Stories */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Your vision, our technology
            </h2>
            <Button variant="outline" className="border-sitecore-purple text-sitecore-purple hover:bg-sitecore-purple hover:text-white">
              Discover our latest projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {customerStories.map((story, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-sitecore-purple">
                      {story.badge}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-sitecore-purple transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {story.description}
                  </p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-sitecore-purple hover:text-sitecore-purple/80">
                    Read case study
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
