"use client";

import { useState, useEffect } from "react";
import CollegeCard from "../../components/CollegeCard";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPct: number;
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [maxFee, setMaxFee] = useState(500000);
  const [loading, setLoading] = useState(true);

  // State to track IDs of colleges selected for comparison
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/colleges");
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const handleCompareToggle = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert("You can only compare up to 3 colleges.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFee = college.fees <= maxFee;
    return matchesSearch && matchesFee;
  });
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 mt-10 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-4"></div>
        {/* Subtitle Skeleton */}
        <div className="h-6 bg-gray-200 rounded-md w-1/4 mb-8"></div>
        {/* Card Skeleton */}
        <div className="h-64 bg-gray-200 rounded-2xl w-full mb-8"></div>
        {/* Text Blocks */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Discover Colleges</h1>
        {compareList.length > 0 && (
          <a
            href="/compare"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700"
          >
            View Comparison ({compareList.length})
          </a>
        )}
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search by Name
          </label>
          <input
            type="text"
            placeholder="e.g. IIT Bombay..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Fees: ₹{maxFee.toLocaleString()}
          </label>
          <input
            type="range"
            min="50000"
            max="500000"
            step="10000"
            value={maxFee}
            onChange={(e) => setMaxFee(Number(e.target.value))}
            className="w-full cursor-pointer mt-2"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading colleges...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <CollegeCard
              key={college.id}
              id={college.id} // This line fixes the error!
              name={college.name}
              location={college.location}
              fees={college.fees}
              rating={college.rating}
              placementPct={college.placementPct}
              isAddedToCompare={compareList.includes(college.id)}
              onCompare={() => handleCompareToggle(college.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
