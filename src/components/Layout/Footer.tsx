
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-slate-50 py-6 dark:bg-slate-950">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Kalasalingam University. All rights reserved.
          </div>
          <nav className="flex gap-4 text-sm">
            <Link to="/help" className="text-gray-500 hover:underline">
              Help Center
            </Link>
            <Link to="/support" className="text-gray-500 hover:underline">
              Support
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
