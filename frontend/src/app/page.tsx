import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-blue-600">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Find Your Dream College Today
          </h1>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Discover the best engineering and tech institutions. Compare fees, 
            check placement records, and make the right decision for your future.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/colleges">
              <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
                Explore Colleges
              </button>
            </Link>
            <Link href="/compare">
              <button className="bg-blue-700 text-white font-bold px-8 py-4 rounded-lg border border-blue-400 hover:bg-blue-800 transition-all">
                Compare Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Smart Search</h3>
            <p className="text-gray-600">Filter by location, fees, and ratings instantly.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Side-by-Side Compare</h3>
            <p className="text-gray-600">Compare up to 3 colleges to see where you fit best.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Verified Data</h3>
            <p className="text-gray-600">Get the latest placement and fee details directly from the source.</p>
          </div>
        </div>
      </section>
    </div>
  );
}