import { RequestHandler } from "express";

// Job interfaces
interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  salary: string;
  experience: "Entry" | "Mid" | "Senior" | "Lead" | "Executive";
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  category: string;
  companySize: string;
  description: string;
  skills: string[];
  posted: string;
  applicants: number;
  requirements: string[];
  benefits: string[];
  isActive: boolean;
  postedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: "pending" | "reviewing" | "interview" | "accepted" | "rejected";
  appliedAt: Date;
  coverLetter?: string;
  resumeUrl?: string;
  notes?: string;
}

// Mock data - replace with actual database
const mockJobs: Job[] = [
  {
    id: "1",
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
    description: "Join our team to build cutting-edge React applications that serve millions of users worldwide.",
    skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    posted: "2 days ago",
    applicants: 23,
    requirements: [
      "5+ years of React development experience",
      "Strong TypeScript skills",
      "Experience with modern frontend tools",
      "Understanding of web performance optimization"
    ],
    benefits: [
      "Competitive salary and equity",
      "Health insurance",
      "Remote work flexibility",
      "Professional development budget"
    ],
    isActive: true,
    postedBy: "hr@techflow.com",
    createdAt: new Date("2024-12-23"),
    updatedAt: new Date("2024-12-23")
  },
  // Add more mock jobs as needed
];

const mockApplications: JobApplication[] = [];

// Get all jobs with filtering and pagination
export const getJobs: RequestHandler = async (req, res) => {
  try {
    const {
      category,
      type,
      experience,
      location,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    let filteredJobs = mockJobs.filter(job => job.isActive);

    // Apply filters
    if (category && category !== "All") {
      filteredJobs = filteredJobs.filter(job => job.category === category);
    }

    if (type && type !== "All") {
      filteredJobs = filteredJobs.filter(job => job.type === type);
    }

    if (experience && experience !== "All") {
      filteredJobs = filteredJobs.filter(job => job.experience === experience);
    }

    if (location && location !== "All") {
      filteredJobs = filteredJobs.filter(job => job.locationType === location);
    }

    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }

    // Sort jobs
    filteredJobs.sort((a, b) => {
      const aValue = a[sortBy as keyof Job];
      const bValue = b[sortBy as keyof Job];
      
      if (sortOrder === "desc") {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        jobs: paginatedJobs,
        pagination: {
          total: filteredJobs.length,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(filteredJobs.length / limitNum),
        },
      },
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get single job by ID
export const getJobById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    const job = mockJobs.find(j => j.id === id && j.isActive);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      data: { job },
    });
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Apply for a job
export const applyForJob: RequestHandler = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, resumeUrl } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Check if job exists
    const job = mockJobs.find(j => j.id === jobId && j.isActive);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if user already applied
    const existingApplication = mockApplications.find(
      app => app.jobId === jobId && app.userId === userId
    );
    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application: JobApplication = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      jobId,
      userId,
      status: "pending",
      appliedAt: new Date(),
      coverLetter,
      resumeUrl,
    };

    mockApplications.push(application);

    // Update job applicants count
    job.applicants += 1;

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: { application },
    });
  } catch (error) {
    console.error("Apply for job error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user's job applications
export const getUserApplications: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const userApplications = mockApplications.filter(app => app.userId === userId);
    
    // Populate with job details
    const applicationsWithJobs = userApplications.map(app => {
      const job = mockJobs.find(j => j.id === app.jobId);
      return {
        ...app,
        job: job ? {
          id: job.id,
          title: job.title,
          company: job.company,
          companyLogo: job.companyLogo,
          location: job.location,
          type: job.type,
        } : null,
      };
    });

    res.json({
      success: true,
      data: { applications: applicationsWithJobs },
    });
  } catch (error) {
    console.error("Get applications error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Create a new job (for employers/admins)
export const createJob: RequestHandler = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      locationType,
      salary,
      experience,
      type,
      category,
      description,
      skills,
      requirements,
      benefits,
      companySize,
    } = req.body;

    // Validation
    if (!title || !company || !description) {
      return res.status(400).json({
        success: false,
        message: "Title, company, and description are required",
      });
    }

    const newJob: Job = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      company,
      companyLogo: company.charAt(0).toUpperCase(),
      location,
      locationType,
      salary,
      experience,
      type,
      category,
      companySize,
      description,
      skills: skills || [],
      requirements: requirements || [],
      benefits: benefits || [],
      posted: "Just now",
      applicants: 0,
      isActive: true,
      postedBy: req.user?.email || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockJobs.push(newJob);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: { job: newJob },
    });
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update job application status (for employers/admins)
export const updateApplicationStatus: RequestHandler = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes } = req.body;

    const applicationIndex = mockApplications.findIndex(app => app.id === applicationId);
    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Update application
    mockApplications[applicationIndex].status = status;
    if (notes) {
      mockApplications[applicationIndex].notes = notes;
    }

    res.json({
      success: true,
      message: "Application status updated successfully",
      data: { application: mockApplications[applicationIndex] },
    });
  } catch (error) {
    console.error("Update application status error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get job categories and stats
export const getJobStats: RequestHandler = async (req, res) => {
  try {
    const activeJobs = mockJobs.filter(job => job.isActive);
    
    const categories = [...new Set(activeJobs.map(job => job.category))];
    const companies = [...new Set(activeJobs.map(job => job.company))];
    
    const typeStats = activeJobs.reduce((acc, job) => {
      acc[job.type] = (acc[job.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const locationStats = activeJobs.reduce((acc, job) => {
      acc[job.locationType] = (acc[job.locationType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      success: true,
      data: {
        totalJobs: activeJobs.length,
        totalCompanies: companies.length,
        categories,
        typeStats,
        locationStats,
        recentJobs: activeJobs.slice(0, 5),
      },
    });
  } catch (error) {
    console.error("Get job stats error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
