import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { verifyToken } from "../middleware/auth";

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userEmail?: string;
}

// Initialize Socket.io server
export const initializeSocket = (httpServer: HTTPServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Authentication middleware for Socket.io
  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return next(new Error("Authentication error: Invalid token"));
    }

    socket.userId = decoded.id;
    socket.userEmail = decoded.email;
    next();
  });

  // Handle Socket.io connections
  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(`👤 User ${socket.userEmail} connected (${socket.id})`);

    // Join user to their personal room
    socket.join(`user_${socket.userId}`);

    // Handle joining chat rooms
    socket.on("join_chat", (chatId: string) => {
      socket.join(`chat_${chatId}`);
      console.log(`💬 User ${socket.userEmail} joined chat ${chatId}`);
    });

    // Handle leaving chat rooms
    socket.on("leave_chat", (chatId: string) => {
      socket.leave(`chat_${chatId}`);
      console.log(`👋 User ${socket.userEmail} left chat ${chatId}`);
    });

    // Handle sending messages
    socket.on(
      "send_message",
      (data: { chatId: string; message: string; receiverId?: string }) => {
        const messageData = {
          id: generateMessageId(),
          senderId: socket.userId,
          senderEmail: socket.userEmail,
          message: data.message,
          timestamp: new Date().toISOString(),
          chatId: data.chatId,
        };

        // Broadcast to chat room
        socket.to(`chat_${data.chatId}`).emit("new_message", messageData);

        // If it's a direct message, also send to specific user
        if (data.receiverId) {
          socket.to(`user_${data.receiverId}`).emit("new_message", messageData);
        }

        // Save message to database (implement this based on your DB choice)
        // await saveMessageToDatabase(messageData);
      },
    );

    // Handle typing indicators
    socket.on("typing_start", (data: { chatId: string }) => {
      socket.to(`chat_${data.chatId}`).emit("user_typing", {
        userId: socket.userId,
        userEmail: socket.userEmail,
      });
    });

    socket.on("typing_stop", (data: { chatId: string }) => {
      socket.to(`chat_${data.chatId}`).emit("user_stopped_typing", {
        userId: socket.userId,
      });
    });

    // Handle notifications
    socket.on(
      "send_notification",
      (data: {
        receiverId: string;
        type:
          | "session_booked"
          | "message"
          | "skill_completed"
          | "job_application";
        title: string;
        message: string;
      }) => {
        const notificationData = {
          id: generateNotificationId(),
          senderId: socket.userId,
          receiverId: data.receiverId,
          type: data.type,
          title: data.title,
          message: data.message,
          timestamp: new Date().toISOString(),
          read: false,
        };

        // Send notification to specific user
        socket
          .to(`user_${data.receiverId}`)
          .emit("new_notification", notificationData);

        // Save notification to database
        // await saveNotificationToDatabase(notificationData);
      },
    );

    // Handle session updates (for tutoring sessions)
    socket.on(
      "session_update",
      (data: {
        sessionId: string;
        status: "started" | "ended" | "paused";
        participants: string[];
      }) => {
        // Notify all participants
        data.participants.forEach((participantId) => {
          socket.to(`user_${participantId}`).emit("session_status_update", {
            sessionId: data.sessionId,
            status: data.status,
            timestamp: new Date().toISOString(),
          });
        });
      },
    );

    // Handle user presence
    socket.on("update_presence", (status: "online" | "away" | "busy") => {
      socket.broadcast.emit("user_presence_update", {
        userId: socket.userId,
        status: status,
        lastSeen: new Date().toISOString(),
      });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`👋 User ${socket.userEmail} disconnected`);

      // Broadcast user offline status
      socket.broadcast.emit("user_presence_update", {
        userId: socket.userId,
        status: "offline",
        lastSeen: new Date().toISOString(),
      });
    });
  });

  return io;
};

// Utility functions
const generateMessageId = () => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const generateNotificationId = () => {
  return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Export types for use in other files
export interface ChatMessage {
  id: string;
  senderId: string;
  senderEmail: string;
  message: string;
  timestamp: string;
  chatId: string;
}

export interface Notification {
  id: string;
  senderId: string;
  receiverId: string;
  type: "session_booked" | "message" | "skill_completed" | "job_application";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
