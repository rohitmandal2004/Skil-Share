import { RequestHandler } from "express";
import { generateToken, hashPassword, comparePassword } from "../middleware/auth";
import { verifyFirebaseToken } from "../config/firebase";

// User model interfaces (adapt based on your chosen database)
interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: "student" | "tutor" | "admin";
  skills?: string[];
  createdAt: Date;
  lastLogin?: Date;
  isVerified: boolean;
  profilePicture?: string;
}

// Mock database - replace with actual database queries
const mockUsers: User[] = [];

// Register with Email/Password
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { email, password, name, role = "student" } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and name are required",
      });
    }

    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      password: hashedPassword,
      name,
      role,
      skills: [],
      createdAt: new Date(),
      isVerified: false,
    };

    // Save to database (mock)
    mockUsers.push(newUser);

    // Generate JWT token
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    // Remove password from response
    const { password: _, ...userResponse } = newUser;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

// Login with Email/Password
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = mockUsers.find(u => u.email === email);
    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login
    user.lastLogin = new Date();

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: userResponse,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};

// Firebase Authentication
export const firebaseAuth: RequestHandler = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token is required",
      });
    }

    // Verify Firebase token
    const firebaseUser = await verifyFirebaseToken(idToken);
    if (!firebaseUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid Firebase token",
      });
    }

    // Check if user exists in our database
    let user = mockUsers.find(u => u.email === firebaseUser.email);

    // Create user if doesn't exist
    if (!user) {
      user = {
        id: `firebase_${firebaseUser.uid}`,
        email: firebaseUser.email!,
        name: firebaseUser.name || "User",
        role: "student",
        skills: [],
        createdAt: new Date(),
        isVerified: firebaseUser.emailVerified || false,
        profilePicture: firebaseUser.picture,
      };
      mockUsers.push(user);
    }

    // Update last login
    user.lastLogin = new Date();

    // Generate our own JWT token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      success: true,
      message: "Firebase authentication successful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    console.error("Firebase auth error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during Firebase authentication",
    });
  }
};

// Get Current User Profile
export const getUserProfile: RequestHandler = async (req, res) => {
  try {
    const user = mockUsers.find(u => u.id === req.user?.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      data: { user: userResponse },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update User Profile
export const updateUserProfile: RequestHandler = async (req, res) => {
  try {
    const { name, skills, profilePicture } = req.body;
    
    const userIndex = mockUsers.findIndex(u => u.id === req.user?.id);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user data
    if (name) mockUsers[userIndex].name = name;
    if (skills) mockUsers[userIndex].skills = skills;
    if (profilePicture) mockUsers[userIndex].profilePicture = profilePicture;

    // Remove password from response
    const { password: _, ...userResponse } = mockUsers[userIndex];

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { user: userResponse },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Logout (for session management if needed)
export const logoutUser: RequestHandler = async (req, res) => {
  try {
    // In a real implementation, you might want to:
    // - Add token to blacklist
    // - Clear refresh tokens
    // - Update last activity

    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
