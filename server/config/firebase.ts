import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from "firebase/auth";

// Firebase Admin SDK Configuration (Server-side)
const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      const serviceAccount = JSON.parse(serviceAccountKey);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
      
      console.log("✅ Firebase Admin SDK initialized");
    } else {
      console.warn("⚠️ Firebase Admin SDK not initialized - missing service account key");
    }
  }
  
  return admin;
};

// Firebase Client SDK Configuration (Client-side)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase Client App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Firebase Admin instance
const firebaseAdmin = initializeFirebaseAdmin();

// Verify Firebase ID Token
export const verifyFirebaseToken = async (idToken: string) => {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      emailVerified: decodedToken.email_verified,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch (error) {
    console.error("Firebase token verification error:", error);
    return null;
  }
};

// Firebase Auth Helper Functions
export const firebaseAuthHelpers = {
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Create user with email and password
  signUp: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  },
};

// Firebase middleware for Express
export const authenticateFirebaseToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Firebase ID token required" 
    });
  }

  const decoded = await verifyFirebaseToken(token);
  if (!decoded) {
    return res.status(403).json({ 
      success: false, 
      message: "Invalid Firebase token" 
    });
  }

  req.user = decoded;
  next();
};

export { firebaseAdmin, auth };
