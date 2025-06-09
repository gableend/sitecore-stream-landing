"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { reset } = useContext(UserContext);

  const navigation = [
    {
      name: "Explore",
      href: "#explore",
      items: [
        { name: "Why Sitecore", href: "#why-sitecore" },
        { name: "Case Studies", href: "#case-studies" },
        { name: "Customer Awards", href: "#awards" },
      ],
    },
    {
      name: "Products & Services",
      href: "#products",
      items: [
        { name: "XM Cloud", href: "#xm-cloud" },
        { name: "Personalize", href: "#personalize" },
        { name: "Content Hub", href: "#content-hub" },
      ],
    },
    {
      name: "Partners",
      href: "#partners",
    },
    {
      name: "Resources",
      href: "#resources",
    },
    {
      name: "Company",
      href: "#company",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo-sitecore.svg"
                alt="Sitecore"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link href="/agentic-experience" className="header-link">
              Agentic Experience
            </Link>
            <Link href="/join-conversation" className="header-link">
              Join the conversation
            </Link>
            <button onClick={reset} className="header-link">
              Reset Experience
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button className="bg-sitecore-ultra-violet hover:bg-sitecore-ultra-violet/90 text-white rounded-full px-4">
              Visit Sitecore.com
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Link
                  href="/agentic-experience"
                  className="block py-2 header-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agentic Experience
                </Link>
                <Link
                  href="/join-conversation"
                  className="block py-2 header-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join the conversation
                </Link>
                <button
                  className="block py-2 header-link"
                  onClick={() => {
                    setIsMenuOpen(false);
                    reset();
                  }}
                >
                  Reset Experience
                </button>
              </div>
              <Button className="w-full bg-sitecore-ultra-violet hover:bg-sitecore-ultra-violet/90 text-white rounded-full">
                Visit Sitecore.com
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
