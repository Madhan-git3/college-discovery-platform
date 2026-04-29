"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface CollegeDetails {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPct: number;
  courses: string[];
  description: string;
}

export default function CollegeDetailPage() {
  const params = useParams(); // Grabs the ID from the URL
  const [college, setCollege] = useState<CollegeDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/colleges/${params.id}`,
        );
        if (!response.ok) throw new Error("College not found");
        const data = await response.json();
        setCollege(data);
      } catch (error) {
        console.error("Failed to fetch college:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCollegeDetails();
    }
  }, [params.id]);
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to save colleges!");
      return;
    }

    const res = await fetch("http://localhost:5000/api/saved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send the "ID Card"
      },
      body: JSON.stringify({ collegeId: college?.id }),
    });

    if (res.ok) {
      alert("College saved to your profile!");
    } else {
      alert("Error saving college.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-gray-500">
        Loading college details...
      </div>
    );
  if (!college)
    return (
      <div className="text-center py-20 text-red-500">College not found!</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      {/* Header Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {college.name}
        </h1>
        <p className="text-lg text-gray-600 mb-6">📍 {college.location}</p>
        <button 
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          Save to Profile
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 font-medium mb-1">Tuition Fees</p>
          <p className="text-2xl font-bold text-blue-700">
            ₹{college.fees.toLocaleString()}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 font-medium mb-1">
            Placement Record
          </p>
          <p className="text-2xl font-bold text-green-700">
            {college.placementPct}%
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 font-medium mb-1">
            Student Rating
          </p>
          <p className="text-2xl font-bold text-yellow-700">
            ⭐ {college.rating} / 5.0
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {college.description}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Courses Offered
            </h2>
            <ul className="space-y-2">
              {college.courses.map((course, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 border-b pb-2 last:border-0"
                >
                  <span className="mr-2 text-blue-500">•</span> {course}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
