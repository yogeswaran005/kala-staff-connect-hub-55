
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
export type User = {
  id: string;
  username: string;
  name: string;
  department: string;
  role: string;
  email: string;
  phone?: string;
  officeLocation?: string;
  joinDate?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (name: string, username: string, email: string, password: string, department: string, role: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedUser: Partial<User>) => void;
  isLoading: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateProfile: () => {},
  isLoading: false,
});

// Sample user for demo
const sampleUser: User = {
  id: "1",
  username: "faculty",
  name: "Dr. Rajesh Kumar",
  department: "Computer Science",
  role: "Associate Professor",
  email: "rajesh.kumar@kalasalingam.ac.in",
  phone: "+91 9876543210",
  officeLocation: "CSE Block, Room 204",
  joinDate: "June 15, 2015"
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

  const signup = async (
    name: string, 
    username: string, 
    email: string, 
    password: string, 
    department: string, 
    role: string
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if username already exists (for demo, just check against sample user)
        if (username === sampleUser.username) {
          toast.error("Username already exists. Please try another one.");
          setIsLoading(false);
          resolve(false);
          return;
        }
        
        // Check if email already exists
        if (email === sampleUser.email) {
          toast.error("Email already registered. Please use another email.");
          setIsLoading(false);
          resolve(false);
          return;
        }
        
        // Create a new user object
        const newUser: User = {
          id: Date.now().toString(),
          username,
          name,
          department,
          role,
          email,
          phone: "",
          officeLocation: "",
          joinDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        };
        
        setUser(newUser);
        localStorage.setItem("kalaUser", JSON.stringify(newUser));
        toast.success("Account created successfully!");
        resolve(true);
        setIsLoading(false);
      }, 1500);
    });
  };

  const updateProfile = (updatedUser: Partial<User>) => {
    if (!user) return;
    
    const newUserData = { ...user, ...updatedUser };
    setUser(newUserData);
    localStorage.setItem("kalaUser", JSON.stringify(newUserData));
    toast.success("Profile updated successfully!");
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
        signup,
        logout,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
