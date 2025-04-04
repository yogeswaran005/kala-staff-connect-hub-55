
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
type User = {
  id: string;
  username: string;
  name: string;
  department: string;
  role: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  isLoading: false,
});

// Sample user for demo
const sampleUser: User = {
  id: "1",
  username: "faculty1",
  name: "Dr. Rajesh Kumar",
  department: "Computer Science",
  role: "Associate Professor",
  email: "rajesh.kumar@kalasalingam.ac.in",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("kalaUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("kalaUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, any username "faculty" with password "password" works
        if (username === "faculty" && password === "password") {
          setUser(sampleUser);
          localStorage.setItem("kalaUser", JSON.stringify(sampleUser));
          toast.success("Login successful!");
          resolve(true);
        } else {
          toast.error("Invalid credentials. Please try again.");
          resolve(false);
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kalaUser");
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
