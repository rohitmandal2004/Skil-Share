import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, Video, Settings } from "lucide-react";

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chat & Messaging</h1>
          <p className="text-gray-600 mt-2">
            Connect with your tutors and fellow learners
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Direct Messages</h3>
              <p className="text-gray-600 text-sm">
                Chat one-on-one with your tutors and get instant help
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Video className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Video Calls</h3>
              <p className="text-gray-600 text-sm">
                Schedule and join video sessions with your tutors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Group Chats</h3>
              <p className="text-gray-600 text-sm">
                Join study groups and connect with other learners
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Chat System Coming Soon
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We're integrating a powerful chat system with real-time messaging,
            video calls, file sharing, and collaboration tools to enhance your
            learning experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Continue Building This Page</Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Chat Settings
            </Button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-blue-800">
              <strong>Coming Features:</strong> Real-time messaging, video
              calls, screen sharing, file sharing, chat history, and integration
              with session booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
