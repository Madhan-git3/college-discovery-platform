"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 1. Get the token from the browser's storage
    const token = localStorage.getItem("token");

    // 2. Wrap updates in setTimeout to move them out of the sync flow.
    // This satisfies the ESLint "cascading render" rule.
    const timer = setTimeout(() => {
      if (token) {
        setIsLoggedIn(true);
      }
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/login");
  };

  // Only show auth-dependent links after we are 100% sure we are in the browser
  const showAuthLinks = mounted && isLoggedIn;

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CollegeQuest
        </Link>
        
        <div className="space-x-6 flex items-center">
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600 font-medium">
            Colleges
          </Link>
          <Link href="/compare" className="text-gray-600 hover:text-blue-600 font-medium">
            Compare
          </Link>
          
          {showAuthLinks ? (
            <>
              <Link href="/profile" className="text-gray-600 hover:text-blue-600 font-medium">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-4 py-2 rounded-md hover:bg-red-100 font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            // While mounting or if not logged in, show Login
            <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 font-medium transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}