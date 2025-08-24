import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Filter,
  Code,
  Palette,
  Languages,
  Music,
  Brain,
  Globe,
} from "lucide-react";
import { useState } from "react";

const skillCategories = [
  { name: "All", icon: null },
  { name: "Programming", icon: Code },
  { name: "Design", icon: Palette },
  { name: "Languages", icon: Languages },
  { name: "Music", icon: Music },
  { name: "Business", icon: Brain },
  { name: "Academic", icon: Globe },
];

const tutors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Frontend Developer",
    skills: ["React", "TypeScript", "JavaScript"],
    rating: 4.9,
    reviews: 127,
    price: 45,
    location: "San Francisco, CA",
    avatar: "SC",
    experience: "5+ years",
    description:
      "Passionate about teaching modern web development. Specialized in React ecosystem.",
    availability: "Available today",
    responseTime: "< 1 hour",
    category: "Programming",
  },
  {
    id: 2,
    name: "Miguel Rodriguez",
    title: "UX/UI Designer",
    skills: ["Figma", "Adobe XD", "User Research"],
    rating: 4.8,
    reviews: 89,
    price: 38,
    location: "Austin, TX",
    avatar: "MR",
    experience: "4+ years",
    description:
      "Help you create beautiful and functional user interfaces. From wireframes to prototypes.",
    availability: "Available tomorrow",
    responseTime: "< 2 hours",
    category: "Design",
  },
  {
    id: 3,
    name: "Emma Thompson",
    title: "Spanish Language Expert",
    skills: ["Conversational Spanish", "Grammar", "Business Spanish"],
    rating: 5.0,
    reviews: 203,
    price: 32,
    location: "Madrid, Spain",
    avatar: "ET",
    experience: "8+ years",
    description:
      "Native Spanish speaker with experience teaching professionals and students worldwide.",
    availability: "Available now",
    responseTime: "< 30 min",
    category: "Languages",
  },
  {
    id: 4,
    name: "David Kim",
    title: "Piano Instructor",
    skills: ["Classical Piano", "Jazz", "Music Theory"],
    rating: 4.9,
    reviews: 156,
    price: 42,
    location: "New York, NY",
    avatar: "DK",
    experience: "10+ years",
    description:
      "Berklee graduate with performance experience. Teaching all levels from beginner to advanced.",
    availability: "Available this week",
    responseTime: "< 4 hours",
    category: "Music",
  },
  {
    id: 5,
    name: "Lisa Wang",
    title: "Business Strategy Consultant",
    skills: ["Strategic Planning", "Market Analysis", "Startup Advice"],
    rating: 4.7,
    reviews: 94,
    price: 65,
    location: "London, UK",
    avatar: "LW",
    experience: "7+ years",
    description:
      "Former McKinsey consultant helping entrepreneurs and professionals grow their businesses.",
    availability: "Available next week",
    responseTime: "< 6 hours",
    category: "Business",
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    title: "Mathematics Professor",
    skills: ["Calculus", "Statistics", "Linear Algebra"],
    rating: 4.8,
    reviews: 178,
    price: 50,
    location: "Boston, MA",
    avatar: "JW",
    experience: "15+ years",
    description:
      "PhD in Mathematics with passion for making complex concepts accessible to all students.",
    availability: "Available today",
    responseTime: "< 2 hours",
    category: "Academic",
  },
];

export default function Skills() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTutors, setFilteredTutors] = useState(tutors);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterTutors(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterTutors(searchTerm, category);
  };

  const filterTutors = (search: string, category: string) => {
    let filtered = tutors;

    if (category !== "All") {
      filtered = filtered.filter((tutor) => tutor.category === category);
    }

    if (search) {
      filtered = filtered.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(search.toLowerCase()) ||
          tutor.title.toLowerCase().includes(search.toLowerCase()) ||
          tutor.skills.some((skill) =>
            skill.toLowerCase().includes(search.toLowerCase()),
          ) ||
          tutor.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredTutors(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Tutor
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Browse through our expert tutors and book your next learning session
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for skills, tutors, or subjects..."
              className="pl-10 py-3 text-lg"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {skillCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.name}
                          onClick={() => handleCategoryFilter(category.name)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors ${
                            selectedCategory === category.name
                              ? "bg-primary text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {Icon && <Icon className="h-4 w-4" />}
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tutors Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredTutors.length} tutor
                {filteredTutors.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <Card
                  key={tutor.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                        {tutor.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {tutor.name}
                        </h3>
                        <p className="text-sm text-gray-600">{tutor.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{tutor.rating}</span>
                      </div>
                      <span className="text-gray-500">
                        ({tutor.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tutor.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tutor.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {tutor.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {tutor.availability}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${tutor.price}
                        </span>
                        <span className="text-gray-600">/hour</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full">Request Session</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredTutors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No tutors found matching your criteria.
                </p>
                <p className="text-gray-400 mt-2">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
