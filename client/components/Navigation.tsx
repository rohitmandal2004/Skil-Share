import { Button } from "@/components/ui/button";
import { BookOpen, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Chat", href: "/chat" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SkillShare</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button size="sm" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
