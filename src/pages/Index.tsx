
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Lock, LogIn, User } from "lucide-react";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(username, password);
    
    if (success) {
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-kala-100 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-8 flex-grow">
        <div className="mb-10 flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-kala-700 flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Kalasalingam University
          </h1>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
            Faculty Portal
          </p>
        </div>

        <Card className="mx-auto w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Faculty Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-kala-600 hover:text-kala-700 dark:text-kala-400 dark:hover:text-kala-300">
                  Forgot your password?
                </a>
              </div>
              <Button type="submit" className="w-full bg-kala-700 hover:bg-kala-800" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" /> Sign in
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t px-8 py-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Demo Credentials: Username: <span className="font-medium">faculty</span> Password: <span className="font-medium">password</span>
            </div>
          </CardFooter>
        </Card>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Having trouble logging in?{" "}
          <a href="#" className="font-medium text-kala-600 hover:underline dark:text-kala-400">
            Contact support
          </a>
        </p>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Kalasalingam University. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
