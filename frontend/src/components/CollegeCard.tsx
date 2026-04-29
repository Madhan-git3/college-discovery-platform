import Link from "next/link";

// We added 'onCompare' and 'isAddedToCompare' to the interface
interface CollegeCardProps {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  placementPct: number;
  onCompare?: () => void;      // Optional function for comparison logic
  isAddedToCompare?: boolean;  // Optional boolean to change button color
}

export default function CollegeCard({ 
  id, 
  name, 
  location, 
  fees, 
  rating, 
  placementPct, 
  onCompare, 
  isAddedToCompare 
}: CollegeCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">📍 {location}</p>
      
      <div className="mt-auto space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Fees:</span>
          <span className="font-bold text-gray-900">₹{fees.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Placement:</span>
          <span className="font-bold text-green-600">{placementPct}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-500">Rating:</span>
          <span className="font-bold text-yellow-500">⭐ {rating}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-5">
        <Link href={`/colleges/${id}`}>
          <button className="w-full bg-blue-50 text-blue-600 text-sm font-medium py-2 rounded-md hover:bg-blue-100 transition-colors">
            Details
          </button>
        </Link>
        
        {/* Comparison Toggle Button */}
        <button 
          onClick={onCompare}
          className={`w-full text-sm font-medium py-2 rounded-md transition-all border ${
            isAddedToCompare 
            ? "bg-green-100 text-green-700 border-green-200" 
            : "bg-gray-100 text-gray-700 border-gray-100 hover:bg-gray-200"
          }`}
        >
          {isAddedToCompare ? "Added ✓" : "Compare"}
        </button>
      </div>
    </div>
  );
}