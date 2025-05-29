import { Button } from "@/components/ui/button";
import {
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      title: "Explore",
      links: [
        { name: "Explore Sitecore", href: "#explore" },
        { name: "Modernize your DX", href: "#modernize" },
        { name: "Manage global content", href: "#content" },
        { name: "Deliver limitless commerce", href: "#commerce" },
        { name: "Optimize with data", href: "#data" },
      ]
    },
    {
      title: "Products",
      links: [
        { name: "XM Cloud", href: "#xm-cloud" },
        { name: "Personalize", href: "#personalize" },
        { name: "Content Hub", href: "#content-hub" },
        { name: "OrderCloud", href: "#ordercloud" },
        { name: "Sitecore Stream", href: "#stream" },
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Managed Cloud", href: "#managed-cloud" },
        { name: "Sitecore Services", href: "#services" },
        { name: "Training & Certification", href: "#training" },
        { name: "Support", href: "#support" },
        { name: "Professional Services", href: "#professional" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Newsroom", href: "#news" },
        { name: "Events & Webinars", href: "#events" },
        { name: "Contact Us", href: "#contact" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Mail, href: "mailto:hello@sitecore.com", label: "Email" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-sitecore-purple text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="h-8 w-8 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-sitecore-purple font-bold text-sm">S</span>
                  </div>
                  <span className="font-bold text-xl">SITECORE</span>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  The experience platform trusted by visionary brands to deliver
                  exceptional digital experiences that drive engagement and results.
                </p>
                <Button className="bg-white text-sitecore-purple hover:bg-white/90">
                  Get started today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4">Follow us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {footerSections.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-semibold mb-6">{section.title}</h4>
                    <ul className="space-y-4">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-white/80 hover:text-white transition-colors text-sm"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-white/60">
              <p>© 2025 Sitecore Corporation A/S. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-white/60">
              <span>Global Headquarters</span>
              <span>•</span>
              <span>Copenhagen, Denmark</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
