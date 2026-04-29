"use client";

import { useState, useEffect } from "react";

interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPct: number;
}

export default function ComparePage() {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [selectedColleges, setSelectedColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/colleges");
        const data = await res.json();
        setAllColleges(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  const toggleSelect = (college: College) => {
    if (selectedColleges.find((c) => c.id === college.id)) {
      setSelectedColleges(selectedColleges.filter((c) => c.id !== college.id));
    } else if (selectedColleges.length < 3) {
      setSelectedColleges([...selectedColleges, college]);
    } else {
      alert("You can only compare up to 3 colleges.");
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading comparison tool...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Compare Colleges</h1>
      
      {/* Selection Pills */}
      <div className="flex flex-wrap gap-3 mb-10">
        {allColleges.map((college) => (
          <button
            key={college.id}
            onClick={() => toggleSelect(college)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              selectedColleges.find((c) => c.id === college.id)
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
            }`}
          >
            {college.name}
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedColleges.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-4 font-bold text-gray-900">Feature</th>
                {selectedColleges.map((c) => (
                  <th key={c.id} className="p-4 font-bold text-blue-600 text-center">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-semibold bg-gray-50">Location</td>
                {selectedColleges.map((c) => <td key={c.id} className="p-4 text-center">{c.location}</td>)}
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold bg-gray-50">Annual Fees</td>
                {selectedColleges.map((c) => <td key={c.id} className="p-4 text-center">₹{c.fees.toLocaleString()}</td>)}
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold bg-gray-50">Placement %</td>
                {selectedColleges.map((c) => <td key={c.id} className="p-4 text-center text-green-600 font-bold">{c.placementPct}%</td>)}
              </tr>
              <tr className="border-b">
                <td className="p-4 font-semibold bg-gray-50">Rating</td>
                {selectedColleges.map((c) => <td key={c.id} className="p-4 text-center font-bold text-yellow-500">⭐ {c.rating}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-gray-500">
          Select up to 3 colleges to see the differences.
        </div>
      )}
    </div>
  );
}