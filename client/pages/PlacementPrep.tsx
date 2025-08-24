import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import {
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  FileText,
  GraduationCap,
  MessageSquare,
  Play,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
  Award,
  Building2,
  Timer,
  BarChart3,
  Upload,
  Download,
  Eye,
  Database,
  Network,
  Shield,
  Layers,
  Cpu,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const preparationCategories = [
  {
    title: "Technical Coding",
    description: "Data structures, algorithms, and coding challenges",
    icon: Code,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    topics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "System Design"],
    progress: 65,
  },
  {
    title: "Aptitude & Reasoning",
    description: "Logical reasoning, quantitative aptitude, and puzzles",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    topics: ["Logical Reasoning", "Quantitative Aptitude", "Verbal Ability", "Puzzles"],
    progress: 45,
  },
  {
    title: "HR & Behavioral",
    description: "Interview skills, communication, and behavioral questions",
    icon: MessageSquare,
    color: "text-green-600",
    bgColor: "bg-green-50",
    topics: ["Tell Me About Yourself", "Behavioral Questions", "Situational Judgment", "Communication"],
    progress: 30,
  },
  {
    title: "Domain Knowledge",
    description: "Subject-specific knowledge for your field",
    icon: BookOpen,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    topics: ["Core Subjects", "Industry Trends", "Case Studies", "Project Discussion"],
    progress: 55,
  },
];

const topCompanies = [
  { name: "Google", logo: "G", interviews: 1250, difficulty: "Hard" },
  { name: "Microsoft", logo: "M", interviews: 980, difficulty: "Medium" },
  { name: "Amazon", logo: "A", interviews: 1560, difficulty: "Hard" },
  { name: "Apple", logo: "A", interviews: 720, difficulty: "Hard" },
  { name: "Meta", logo: "F", interviews: 890, difficulty: "Hard" },
  { name: "Netflix", logo: "N", interviews: 340, difficulty: "Hard" },
  { name: "Salesforce", logo: "S", interviews: 450, difficulty: "Medium" },
  { name: "Adobe", logo: "A", interviews: 380, difficulty: "Medium" },
];

const subjectNotes = [
  {
    id: 1,
    subject: "Data Structures & Algorithms",
    icon: Code,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    topics: ["Arrays", "LinkedList", "Trees", "Graphs", "DP", "Sorting"],
    uploadedNotes: [
      { name: "DSA_Fundamentals.pdf", size: "2.3 MB", uploadDate: "2 days ago" },
      { name: "Graph_Algorithms.pdf", size: "1.8 MB", uploadDate: "5 days ago" },
    ],
  },
  {
    id: 2,
    subject: "Database Management Systems",
    icon: Database,
    color: "text-green-600",
    bgColor: "bg-green-50",
    topics: ["SQL", "Normalization", "Indexing", "Transactions", "NoSQL"],
    uploadedNotes: [
      { name: "DBMS_Complete_Notes.pdf", size: "3.1 MB", uploadDate: "1 week ago" },
    ],
  },
  {
    id: 3,
    subject: "Object Oriented Programming",
    icon: Layers,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    topics: ["Classes", "Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
    uploadedNotes: [
      { name: "OOPs_Concepts.pdf", size: "1.5 MB", uploadDate: "3 days ago" },
      { name: "Java_OOP_Examples.pdf", size: "2.7 MB", uploadDate: "1 week ago" },
    ],
  },
  {
    id: 4,
    subject: "Operating Systems",
    icon: Cpu,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    topics: ["Processes", "Memory", "File Systems", "Scheduling", "Deadlocks"],
    uploadedNotes: [
      { name: "OS_Process_Management.pdf", size: "2.9 MB", uploadDate: "4 days ago" },
    ],
  },
  {
    id: 5,
    subject: "Computer Networks",
    icon: Network,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    topics: ["OSI Model", "TCP/IP", "Routing", "Security", "Protocols"],
    uploadedNotes: [],
  },
  {
    id: 6,
    subject: "System Design",
    icon: BarChart3,
    color: "text-red-600",
    bgColor: "bg-red-50",
    topics: ["Scalability", "Load Balancing", "Databases", "Caching", "Microservices"],
    uploadedNotes: [
      { name: "System_Design_Basics.pdf", size: "4.2 MB", uploadDate: "2 weeks ago" },
    ],
  },
];

const upcomingMockInterviews = [
  {
    type: "Technical Interview",
    interviewer: "Sarah Chen",
    date: "Today, 3:00 PM",
    duration: "60 min",
    company: "Google Style",
  },
  {
    type: "HR Round",
    interviewer: "Michael Johnson",
    date: "Tomorrow, 10:00 AM",
    duration: "45 min",
    company: "General",
  },
  {
    type: "System Design",
    interviewer: "David Kim",
    date: "Dec 28, 2:00 PM",
    duration: "90 min",
    company: "Amazon Style",
  },
];

const practiceTests = [
  {
    title: "Data Structures & Algorithms",
    questions: 150,
    duration: "2 hours",
    difficulty: "Medium",
    attempted: 85,
    icon: Code,
  },
  {
    title: "Aptitude Test",
    questions: 60,
    duration: "1 hour",
    difficulty: "Easy",
    attempted: 45,
    icon: Brain,
  },
  {
    title: "System Design",
    questions: 25,
    duration: "90 min",
    difficulty: "Hard",
    attempted: 12,
    icon: BarChart3,
  },
  {
    title: "Behavioral Questions",
    questions: 40,
    duration: "45 min",
    difficulty: "Medium",
    attempted: 28,
    icon: MessageSquare,
  },
];

export default function PlacementPrep() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <GraduationCap className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ace Your Dream Job
              <span className="block text-primary">Placement Preparation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive preparation platform with coding practice, mock interviews, 
              aptitude tests, and company-specific guidance to land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Start Preparation
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Mock Interview
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-600">Practice Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Company Guides</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Preparation Tracks
            </h2>
            <p className="text-lg text-gray-600">
              Master every aspect of the interview process with our structured learning paths
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {preparationCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${category.bgColor}`}>
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{category.progress}%</span>
                          </div>
                          <Progress value={category.progress} className="h-2" />
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button className="w-full">Continue Learning</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mock Interviews */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Interviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mock Interviews</h2>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingMockInterviews.map((interview, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{interview.type}</h3>
                          <p className="text-sm text-gray-600">with {interview.interviewer}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {interview.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Timer className="h-4 w-4" />
                              {interview.duration}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{interview.company}</Badge>
                          <Button size="sm" className="mt-2 w-full">
                            <Video className="mr-2 h-4 w-4" />
                            Join
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Practice Tests */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Practice Tests</h2>
                <Button variant="outline">View All</Button>
              </div>
              
              <div className="space-y-4">
                {practiceTests.map((test, index) => {
                  const Icon = test.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{test.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{test.questions} questions</span>
                                <span>{test.duration}</span>
                                <Badge 
                                  variant={test.difficulty === 'Easy' ? 'secondary' : test.difficulty === 'Medium' ? 'default' : 'destructive'} 
                                  className="text-xs"
                                >
                                  {test.difficulty}
                                </Badge>
                              </div>
                              <div className="mt-1 text-sm text-gray-500">
                                Attempted: {test.attempted}/{test.questions}
                              </div>
                            </div>
                          </div>
                          <Button size="sm">
                            Start Test
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Guides */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Company-Specific Preparation
            </h2>
            <p className="text-lg text-gray-600">
              Get insider knowledge about interview processes at top tech companies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topCompanies.map((company, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    {company.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{company.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{company.interviews} interview experiences</p>
                  <Badge 
                    variant={company.difficulty === 'Easy' ? 'secondary' : company.difficulty === 'Medium' ? 'default' : 'destructive'} 
                    className="text-xs"
                  >
                    {company.difficulty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
                <p className="text-gray-600">
                  AI-powered recommendations based on your strengths and improvement areas
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Mentors</h3>
                <p className="text-gray-600">
                  Learn from industry professionals and successful placement candidates
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-gray-600">
                  Detailed analytics and progress tracking to monitor your improvement
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful candidates who prepared with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Award className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
              <Building2 className="mr-2 h-5 w-5" />
              View Success Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
