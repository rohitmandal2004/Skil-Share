import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Filter,
  Code,
  Palette,
  BarChart3,
  Megaphone,
  Users,
  Database,
  Settings,
  HeadphonesIcon,
  Building2,
  Calendar,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

const jobCategories = [
  { name: "All", icon: null },
  { name: "Engineering", icon: Code },
  { name: "Design", icon: Palette },
  { name: "Product", icon: BarChart3 },
  { name: "Marketing", icon: Megaphone },
  { name: "Sales", icon: Users },
  { name: "Data", icon: Database },
  { name: "DevOps", icon: Settings },
  { name: "Support", icon: HeadphonesIcon },
];

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Internship"];
const experienceLevels = ["All", "Entry", "Mid", "Senior", "Lead", "Executive"];
const locations = ["All", "Remote", "Hybrid", "On-site"];

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "TechFlow",
    companyLogo: "TF",
    location: "Remote",
    locationType: "Remote",
    salary: "$120k - $160k",
    experience: "Senior",
    type: "Full-time",
    category: "Engineering",
    companySize: "50-200",
    description:
      "Join our team to build cutting-edge React applications that serve millions of users worldwide.",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    posted: "2 days ago",
    applicants: 23,
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignStudio",
    companyLogo: "DS",
    location: "San Francisco, CA",
    locationType: "Hybrid",
    salary: "$90k - $130k",
    experience: "Mid",
    type: "Full-time",
    category: "Design",
    companySize: "10-50",
    description:
      "Create intuitive and beautiful user experiences for our suite of creative tools.",
    skills: ["Figma", "Sketch", "Prototyping", "User Research"],
    posted: "1 week ago",
    applicants: 45,
  },
  {
    id: 3,
    title: "Product Manager",
    company: "GrowthCorp",
    companyLogo: "GC",
    location: "New York, NY",
    locationType: "On-site",
    salary: "$130k - $180k",
    experience: "Senior",
    type: "Full-time",
    category: "Product",
    companySize: "200+",
    description:
      "Lead product strategy and roadmap for our flagship B2B SaaS platform.",
    skills: [
      "Product Strategy",
      "Analytics",
      "Roadmapping",
      "Stakeholder Management",
    ],
    posted: "3 days ago",
    applicants: 67,
  },
  {
    id: 4,
    title: "Marketing Specialist",
    company: "BrandBoost",
    companyLogo: "BB",
    location: "Remote",
    locationType: "Remote",
    salary: "$60k - $85k",
    experience: "Mid",
    type: "Full-time",
    category: "Marketing",
    companySize: "10-50",
    description:
      "Drive growth through innovative digital marketing campaigns and content strategy.",
    skills: ["Content Marketing", "SEO", "Social Media", "Analytics"],
    posted: "5 days ago",
    applicants: 34,
  },
  {
    id: 5,
    title: "Sales Development Representative",
    company: "SalesForce Pro",
    companyLogo: "SP",
    location: "Austin, TX",
    locationType: "Hybrid",
    salary: "$50k - $70k + Commission",
    experience: "Entry",
    type: "Full-time",
    category: "Sales",
    companySize: "50-200",
    description:
      "Generate qualified leads and build relationships with potential enterprise clients.",
    skills: ["Lead Generation", "CRM", "Cold Outreach", "Communication"],
    posted: "1 day ago",
    applicants: 12,
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataMinds",
    companyLogo: "DM",
    location: "Remote",
    locationType: "Remote",
    salary: "$110k - $150k",
    experience: "Senior",
    type: "Full-time",
    category: "Data",
    companySize: "200+",
    description:
      "Apply machine learning and statistical analysis to solve complex business problems.",
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    posted: "4 days ago",
    applicants: 89,
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "CloudInfra",
    companyLogo: "CI",
    location: "Seattle, WA",
    locationType: "On-site",
    salary: "$115k - $155k",
    experience: "Mid",
    type: "Full-time",
    category: "DevOps",
    companySize: "50-200",
    description:
      "Build and maintain scalable cloud infrastructure and deployment pipelines.",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
    posted: "6 days ago",
    applicants: 28,
  },
  {
    id: 8,
    title: "Customer Success Manager",
    company: "SupportFirst",
    companyLogo: "SF",
    location: "Remote",
    locationType: "Remote",
    salary: "$75k - $95k",
    experience: "Mid",
    type: "Full-time",
    category: "Support",
    companySize: "10-50",
    description:
      "Ensure customer satisfaction and drive retention through proactive support and guidance.",
    skills: [
      "Customer Relations",
      "Project Management",
      "Communication",
      "Problem Solving",
    ],
    posted: "3 days ago",
    applicants: 19,
  },
];

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterJobs(
      term,
      selectedCategory,
      selectedType,
      selectedExperience,
      selectedLocation,
    );
  };

  const handleFilter = (
    category: string,
    type: string,
    experience: string,
    location: string,
  ) => {
    setSelectedCategory(category);
    setSelectedType(type);
    setSelectedExperience(experience);
    setSelectedLocation(location);
    filterJobs(searchTerm, category, type, experience, location);
  };

  const filterJobs = (
    search: string,
    category: string,
    type: string,
    experience: string,
    location: string,
  ) => {
    let filtered = jobs;

    if (category !== "All") {
      filtered = filtered.filter((job) => job.category === category);
    }

    if (type !== "All") {
      filtered = filtered.filter((job) => job.type === type);
    }

    if (experience !== "All") {
      filtered = filtered.filter((job) => job.experience === experience);
    }

    if (location !== "All") {
      filtered = filtered.filter((job) => job.locationType === location);
    }

    if (search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase()) ||
          job.description.toLowerCase().includes(search.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(search.toLowerCase()),
          ),
      );
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Find Your Dream Job
              </h1>
              <p className="text-lg text-gray-600">
                Discover opportunities from top companies worldwide
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{filteredJobs.length} jobs</span>
              </div>
              <div className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                <span>
                  {new Set(jobs.map((job) => job.company)).size} companies
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for jobs, companies, or skills..."
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
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Filters</h3>
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {jobCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <button
                          key={category.name}
                          onClick={() =>
                            handleFilter(
                              category.name,
                              selectedType,
                              selectedExperience,
                              selectedLocation,
                            )
                          }
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

                {/* Job Type */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {jobTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          handleFilter(
                            selectedCategory,
                            type,
                            selectedExperience,
                            selectedLocation,
                          )
                        }
                        className={`w-full px-3 py-2 rounded-md text-left transition-colors ${
                          selectedType === type
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Experience</h4>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() =>
                          handleFilter(
                            selectedCategory,
                            selectedType,
                            level,
                            selectedLocation,
                          )
                        }
                        className={`w-full px-3 py-2 rounded-md text-left transition-colors ${
                          selectedExperience === level
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Location</h4>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() =>
                          handleFilter(
                            selectedCategory,
                            selectedType,
                            selectedExperience,
                            location,
                          )
                        }
                        className={`w-full px-3 py-2 rounded-md text-left transition-colors ${
                          selectedLocation === location
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="flex-1">
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center font-semibold">
                          {job.companyLogo}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {job.title}
                          </h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">
                          Posted {job.posted}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.applicants} applicants
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        {job.companySize} employees
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="outline">{job.experience}</Badge>
                      <Badge variant="outline">{job.locationType}</Badge>
                    </div>
                    <Button>Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find more
                  opportunities.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedType("All");
                    setSelectedExperience("All");
                    setSelectedLocation("All");
                    setFilteredJobs(jobs);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
