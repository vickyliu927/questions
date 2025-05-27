"use client";

import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-soft border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="w-auto"
              style={{ height: '64px' }}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Subjects
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Past Papers
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Resources
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </a>
            <a 
              href="#" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="btn btn-primary">
              View all CIE IGCSE Study Notes on TutorChase
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 animate-slide-down">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Subjects
              </a>
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Past Papers
              </a>
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Resources
              </a>
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                About
              </a>
              <a 
                href="#" 
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Contact
              </a>
              
              {/* Mobile CTA Buttons */}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                <button className="btn btn-primary w-full">
                  View all CIE IGCSE Study Notes on TutorChase
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 