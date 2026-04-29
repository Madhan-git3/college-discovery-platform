"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CollegeCard from "../../components/CollegeCard";

// 1. Define the "Blueprint" for our College data
interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPct: number;
}

export default function ProfilePage() {
  const router = useRouter();

  // 2. Initialize userName lazily (Prevents Hydration/Cascading errors)
  const [userName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userName") || "User";
    }
    return "User";
  });

  // 3. Type the state as an array of College objects
  const [savedColleges, setSavedColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchSavedData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/saved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setSavedColleges(data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedData();
  }, [router]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {userName}!</h1>
          <p className="text-gray-500 mt-1">You have {savedColleges.length} colleges saved.</p>
        </div>
        <button 
          onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
          className="bg-red-50 text-red-600 px-5 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </div>

      {savedColleges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 4. Use the interface here instead of 'any' */}
          {savedColleges.map((college: College) => (
            <CollegeCard 
              key={college.id}
              id={college.id}
              name={college.name}
              location={college.location}
              fees={college.fees}
              rating={college.rating}
              placementPct={college.placementPct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-2xl border-2 border-dashed border-gray-100">
          <p className="text-gray-500 text-lg mb-6">Your collection is empty.</p>
          <button 
            onClick={() => router.push("/colleges")} 
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md"
          >
            Find Colleges to Save
          </button>
        </div>
      )}
    </div>
  );
}