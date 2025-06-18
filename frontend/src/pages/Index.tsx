import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { Link } from "react-router-dom";

export default function Index() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            52 Projects Challenge
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Build 52 projects in 52 weeks. Track your progress, share your journey, and become a better developer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-xl font-semibold text-green-400">Weekly Projects</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Build one project every week. Choose from various categories and difficulty levels.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-xl font-semibold text-blue-400">Track Progress</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Monitor your progress with our interactive dashboard. See your achievements and upcoming challenges.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <h3 className="text-xl font-semibold text-purple-400">Share Journey</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Connect with other developers. Share your projects and get feedback from the community.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                Go to Dashboard
          </Button>
            </Link>
          ) : (
            <Link to="/auth/github">
              <Button size="lg" className="bg-green-500 hover:bg-green-600">
                Get Started with GitHub
          </Button>
            </Link>
          )}
        </div>
        </div>
    </div>
  );
}
