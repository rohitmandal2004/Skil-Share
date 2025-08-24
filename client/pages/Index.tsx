import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Code,
  Palette,
  Globe,
  Languages,
  Music,
  Star,
  Users,
  Briefcase,
  GraduationCap,
  MessageSquare,
  BarChart3,
  Target,
  Calendar,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

const skillCategories = [
  {
    icon: Code,
    title: "Programming",
    description: "Learn coding languages and development skills",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Palette,
    title: "Design",
    description: "UI/UX, graphic design, and creative skills",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Languages,
    title: "Languages",
    description: "Master new languages with native speakers",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Music,
    title: "Music",
    description: "Learn instruments and music theory",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Brain,
    title: "Business",
    description: "Business strategy, marketing, and entrepreneurship",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Globe,
    title: "Academic",
    description: "Math, science, and academic subjects",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content: "Found an amazing mentor who helped me land my dream job!",
    rating: 5,
  },
  {
    name: "Miguel Rodriguez",
    role: "Designer",
    content: "The one-on-one sessions were exactly what I needed to level up.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Student",
    content: "Affordable, flexible, and incredibly effective learning.",
    rating: 5,
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Complete Career
              <span className="block text-primary">Development Platform</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Learn skills with expert tutors, find your dream job, prepare for interviews, and track your progress.
              Everything you need to advance your career in one comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/skills">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  Find Jobs
                  <Briefcase className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-600">Expert Tutors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Job Opportunities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Placement Success</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.9⭐</div>
              <div className="text-gray-600">Platform Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Popular Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover tutors across hundreds of subjects and find the perfect match for your learning goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-0">
                    <div className={`inline-flex p-3 rounded-lg ${category.bgColor} mb-4`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Career Development Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From learning new skills to landing your dream job - everything you need to advance your career in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/skills" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
                <CardContent className="p-0 text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn Skills</h3>
                  <p className="text-gray-600 text-sm">
                    Connect with expert tutors and master new skills through personalized one-on-one sessions
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/jobs" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
                <CardContent className="p-0 text-center">
                  <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                    <Briefcase className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Jobs</h3>
                  <p className="text-gray-600 text-sm">
                    Discover opportunities from top companies worldwide with advanced filtering and search
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/placement-prep" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
                <CardContent className="p-0 text-center">
                  <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors">
                    <GraduationCap className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Placement Prep</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive interview preparation with mock interviews, coding practice, and company guides
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard" className="group">
              <Card className="p-6 hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer border-2 hover:border-primary/20">
                <CardContent className="p-0 text-center">
                  <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-100 transition-colors">
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
                  <p className="text-gray-600 text-sm">
                    Monitor your learning journey with detailed analytics and personalized recommendations
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by Companies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Trusted by Professionals from Top Companies
            </h2>
            <p className="text-gray-600">
              Join learners and tutors from leading organizations worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
            {/* Company Logos */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center text-sm text-gray-500">
            <div>Google</div>
            <div>Microsoft</div>
            <div>Amazon</div>
            <div>Apple</div>
            <div>Meta</div>
            <div>Netflix</div>
            <div>Salesforce</div>
            <div>Adobe</div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources for your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Personalized Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-powered recommendations match you with the perfect tutors and learning paths based on your goals and learning style.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Flexible Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Book sessions that fit your schedule with tutors available 24/7 across different time zones.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Proven Results</h3>
                <p className="text-gray-600 leading-relaxed">
                  95% of our users report significant improvement in their skills and 78% land their dream jobs within 6 months.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How SkillShare Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started in just three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Skill</h3>
              <p className="text-gray-600">
                Browse our extensive catalog of subjects and find what you want to learn.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Your Tutor</h3>
              <p className="text-gray-600">
                Connect with verified experts who match your learning style and schedule.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Learning</h3>
              <p className="text-gray-600">
                Book sessions, learn at your pace, and achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've advanced their careers with SkillShare.
            Your dream job is just a step away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/placement-prep">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Preparation
                <GraduationCap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                Explore Jobs
                <Briefcase className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Find Tutors</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">How it Works</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Tutors</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Become a Tutor</a></li>
                <li><a href="#" className="hover:text-white">Tutor Resources</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 SkillShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
