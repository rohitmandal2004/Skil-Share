import { google } from "googleapis";
import fs from "fs";
import path from "path";

// Google Drive API Configuration
class GoogleDriveService {
  private drive: any;

  constructor() {
    this.initializeDrive();
  }

  private initializeDrive() {
    try {
      // Option 1: Using Service Account (Recommended for server-to-server)
      const serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;
      const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

      let auth;

      if (serviceAccountKey) {
        // Parse service account key from environment variable
        const credentials = JSON.parse(serviceAccountKey);
        auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ["https://www.googleapis.com/auth/drive.file"],
        });
      } else if (serviceAccountPath) {
        // Load service account from file
        auth = new google.auth.GoogleAuth({
          keyFile: serviceAccountPath,
          scopes: ["https://www.googleapis.com/auth/drive.file"],
        });
      } else {
        // Option 2: Using OAuth2 credentials
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI,
        );

        oauth2Client.setCredentials({
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
        });

        auth = oauth2Client;
      }

      this.drive = google.drive({ version: "v3", auth });
      console.log("✅ Google Drive API initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Google Drive API:", error);
    }
  }

  // Upload PDF file to Google Drive
  async uploadPDF(
    filePath: string,
    fileName: string,
    folderId?: string,
  ): Promise<{
    id: string;
    webViewLink: string;
    webContentLink: string;
  } | null> {
    try {
      if (!this.drive) {
        throw new Error("Google Drive API not initialized");
      }

      const fileMetadata: any = {
        name: fileName,
        parents: folderId ? [folderId] : undefined,
      };

      const media = {
        mimeType: "application/pdf",
        body: fs.createReadStream(filePath),
      };

      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id,webViewLink,webContentLink",
      });

      // Make file publicly readable (optional)
      await this.drive.permissions.create({
        fileId: response.data.id,
        resource: {
          role: "reader",
          type: "anyone",
        },
      });

      console.log(`✅ PDF uploaded to Google Drive: ${response.data.id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error uploading PDF to Google Drive:", error);
      return null;
    }
  }

  // Create folder in Google Drive
  async createFolder(
    folderName: string,
    parentFolderId?: string,
  ): Promise<string | null> {
    try {
      if (!this.drive) {
        throw new Error("Google Drive API not initialized");
      }

      const fileMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: parentFolderId ? [parentFolderId] : undefined,
      };

      const response = await this.drive.files.create({
        resource: fileMetadata,
        fields: "id",
      });

      console.log(`✅ Folder created in Google Drive: ${response.data.id}`);
      return response.data.id;
    } catch (error) {
      console.error("❌ Error creating folder in Google Drive:", error);
      return null;
    }
  }

  // Delete file from Google Drive
  async deleteFile(fileId: string): Promise<boolean> {
    try {
      if (!this.drive) {
        throw new Error("Google Drive API not initialized");
      }

      await this.drive.files.delete({
        fileId: fileId,
      });

      console.log(`✅ File deleted from Google Drive: ${fileId}`);
      return true;
    } catch (error) {
      console.error("❌ Error deleting file from Google Drive:", error);
      return false;
    }
  }

  // Get file information
  async getFileInfo(fileId: string): Promise<any | null> {
    try {
      if (!this.drive) {
        throw new Error("Google Drive API not initialized");
      }

      const response = await this.drive.files.get({
        fileId: fileId,
        fields:
          "id,name,mimeType,size,createdTime,modifiedTime,webViewLink,webContentLink",
      });

      return response.data;
    } catch (error) {
      console.error("❌ Error getting file info from Google Drive:", error);
      return null;
    }
  }

  // List files in a folder
  async listFiles(folderId?: string, query?: string): Promise<any[] | null> {
    try {
      if (!this.drive) {
        throw new Error("Google Drive API not initialized");
      }

      let searchQuery = "";
      if (folderId) {
        searchQuery += `'${folderId}' in parents`;
      }
      if (query) {
        searchQuery += searchQuery ? ` and ${query}` : query;
      }

      const response = await this.drive.files.list({
        q: searchQuery || undefined,
        fields:
          "nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime)",
        orderBy: "modifiedTime desc",
      });

      return response.data.files || [];
    } catch (error) {
      console.error("❌ Error listing files from Google Drive:", error);
      return null;
    }
  }

  // Generate shareable link
  async generateShareableLink(fileId: string): Promise<string | null> {
    try {
      if (!this.drive) {
        throw new Error("Google Drive API not initialized");
      }

      // Make file publicly readable
      await this.drive.permissions.create({
        fileId: fileId,
        resource: {
          role: "reader",
          type: "anyone",
        },
      });

      const response = await this.drive.files.get({
        fileId: fileId,
        fields: "webViewLink",
      });

      return response.data.webViewLink;
    } catch (error) {
      console.error("❌ Error generating shareable link:", error);
      return null;
    }
  }
}

// Create singleton instance
export const googleDriveService = new GoogleDriveService();

// Utility function to organize files by subject
export const getSubjectFolderId = async (subject: string): Promise<string> => {
  const folderMap: { [key: string]: string } = {
    dsa: process.env.DRIVE_DSA_FOLDER_ID || "",
    dbms: process.env.DRIVE_DBMS_FOLDER_ID || "",
    oops: process.env.DRIVE_OOPS_FOLDER_ID || "",
    os: process.env.DRIVE_OS_FOLDER_ID || "",
    networks: process.env.DRIVE_NETWORKS_FOLDER_ID || "",
    "system-design": process.env.DRIVE_SYSTEM_DESIGN_FOLDER_ID || "",
  };

  let folderId = folderMap[subject.toLowerCase()];

  // Create folder if it doesn't exist
  if (!folderId) {
    folderId =
      (await googleDriveService.createFolder(
        `SkillShare - ${subject.toUpperCase()}`,
        process.env.DRIVE_ROOT_FOLDER_ID,
      )) || "";
  }

  return folderId;
};

// Types for TypeScript
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink?: string;
  webContentLink?: string;
}

export interface UploadResult {
  success: boolean;
  fileId?: string;
  webViewLink?: string;
  webContentLink?: string;
  error?: string;
}
