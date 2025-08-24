import mongoose from "mongoose";
import mysql from "mysql2/promise";

// MongoDB Configuration
export const connectMongoDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/skillshare";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// MySQL Configuration
export const createMySQLConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || "localhost",
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "skillshare",
      port: parseInt(process.env.MYSQL_PORT || "3306"),
    });

    console.log("✅ Connected to MySQL successfully");
    return connection;
  } catch (error) {
    console.error("❌ MySQL connection error:", error);
    throw error;
  }
};

// Database choice based on environment variable
export const initializeDatabase = async () => {
  const dbType = process.env.DATABASE_TYPE || "mongodb"; // "mongodb" or "mysql"

  if (dbType === "mongodb") {
    await connectMongoDB();
  } else if (dbType === "mysql") {
    await createMySQLConnection();
  }
};
