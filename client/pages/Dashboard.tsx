import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  MessageCircle,
  Users,
  Calendar,
  Code,
  Database,
  Globe,
  GitBranch,
  Brain,
  TrendingUp,
  Target,
  Star,
  Award,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
  BarChart3,
  Zap,
  Trophy,
  Cpu,
  Palette,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock user data for logged-in candidate
const candidateProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  joinDate: "March 2024",
  level: "Intermediate Developer",
  totalSkills: 12,
  completedSessions: 24,
  learningStreak: 7,
};

const userSkills = [
  {
    name: "Data Structures & Algorithms",
    category: "Programming",
    level: "Intermediate",
    progress: 75,
    icon: Brain,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    sessions: 8,
    lastSession: "2 days ago",
    nextGoal: "Master Dynamic Programming",
  },
  {
    name: "Python",
    category: "Programming Language",
    level: "Advanced",
    progress: 90,
    icon: Code,
    color: "text-green-600",
    bgColor: "bg-green-50",
    sessions: 12,
    lastSession: "1 day ago",
    nextGoal: "Learn FastAPI Framework",
  },
  {
    name: "Git & GitHub",
    category: "Version Control",
    level: "Intermediate",
    progress: 65,
    icon: GitBranch,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    sessions: 5,
    lastSession: "3 days ago",
    nextGoal: "Master Git Workflows",
  },
  {
    name: "JavaScript",
    category: "Programming Language",
    level: "Advanced",
    progress: 85,
    icon: Globe,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    sessions: 10,
    lastSession: "1 day ago",
    nextGoal: "Learn TypeScript",
  },
  {
    name: "React",
    category: "Frontend Framework",
    level: "Intermediate",
    progress: 70,
    icon: Palette,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    sessions: 6,
    lastSession: "4 days ago",
    nextGoal: "Master React Hooks",
  },
  {
    name: "SQL & Databases",
    category: "Database",
    level: "Intermediate",
    progress: 60,
    icon: Database,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    sessions: 4,
    lastSession: "1 week ago",
    nextGoal: "Learn Database Optimization",
  },
];

const recommendedSkills = [
  {
    name: "TypeScript",
    reason: "Natural progression from JavaScript",
    priority: "High",
  },
  {
    name: "Node.js",
    reason: "Complete your full-stack journey",
    priority: "High",
  },
  {
    name: "Docker",
    reason: "Essential for modern deployment",
    priority: "Medium",
  },
  { name: "AWS", reason: "Cloud skills in high demand", priority: "Medium" },
  {
    name: "System Design",
    reason: "Prepare for senior roles",
    priority: "High",
  },
];

const recentActivities = [
  {
    type: "session",
    title: "Completed Python Advanced Concepts",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  {
    type: "achievement",
    title: "Earned 'DSA Master' badge",
    time: "1 day ago",
    icon: Trophy,
    color: "text-yellow-600",
  },
  {
    type: "session",
    title: "Started JavaScript ES6 Features",
    time: "2 days ago",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    type: "milestone",
    title: "Reached 7-day learning streak!",
    time: "3 days ago",
    icon: Zap,
    color: "text-orange-600",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {candidateProfile.name}! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                Here's your learning progress and skill development journey
              </p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                {candidateProfile.level}
              </Badge>
              <p className="text-sm text-gray-500">
                Member since {candidateProfile.joinDate}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Skills Mastered
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {candidateProfile.totalSkills}
              </div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sessions Completed
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {candidateProfile.completedSessions}
              </div>
              <p className="text-xs text-muted-foreground">+5 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Streak
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {candidateProfile.learningStreak}
              </div>
              <p className="text-xs text-muted-foreground">days in a row 🔥</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Progress
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">74%</div>
              <p className="text-xs text-muted-foreground">across all skills</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Skills Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">My Skills</h2>
              <Link to="/skills">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Skill
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${skill.bgColor}`}>
                            <Icon className={`h-5 w-5 ${skill.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {skill.name}
                            </CardTitle>
                            <p className="text-sm text-gray-500">
                              {skill.category}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            skill.level === "Advanced"
                              ? "default"
                              : skill.level === "Intermediate"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {skill.level}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">
                              {skill.progress}%
                            </span>
                          </div>
                          <Progress value={skill.progress} className="h-2" />
                        </div>

                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{skill.sessions} sessions</span>
                          <span>Last: {skill.lastSession}</span>
                        </div>

                        <div className="pt-2 border-t">
                          <p className="text-sm text-gray-600 mb-2">
                            Next Goal:
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {skill.nextGoal}
                          </p>
                        </div>

                        <Link to="/skills">
                          <Button size="sm" className="w-full">
                            Continue Learning
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recommended Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended for You</CardTitle>
                <p className="text-sm text-gray-600">
                  Skills to boost your career
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendedSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{skill.name}</h4>
                          <Badge
                            variant={
                              skill.priority === "High"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {skill.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{skill.reason}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Link to="/skills">
                  <Button className="w-full mt-4" variant="outline">
                    Explore All Skills
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-1.5 rounded-full bg-gray-100">
                          <Icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <Button className="w-full mt-4" variant="outline" size="sm">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/placement-prep">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Practice Coding
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Find Jobs
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Tutors
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
