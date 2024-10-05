import { useState } from "react";
import { useDestinations } from "./firebase";

export default function Destination_Box() {
  const [sortOption, setSortOption] = useState("recommended");
  const [showAll, setShowAll] = useState(false);

  const { loading, data, error } = useDestinations();

  const sortedDestinations = data ? data.sort((a, b) => {
    if (sortOption === "rating") {
      return b.rating - a.rating; // Urut berdasarkan rating
    } else if (sortOption === "reviews") {
      return b.reviews - a.reviews; // Urut berdasarkan jumlah ulasan (most viewed)
    }
    return 0; // Tidak ada urutan khusus
  }) : [];
  const displayedDestinations = showAll
    ? sortedDestinations
    : sortedDestinations.slice(0, 12);

  return (
    <div className="container mx-auto px-4 py-6" id="destinasi">
      <div className="container mx-auto px-4 py-6">

        <h2 className="text-3xl font-bold mb-4">
          {loading ? "Loading" : error ? `Error: ${error}` : "Top attractions in Yogyakarta"}
        </h2>

        {!loading && !error && data && <>

          {/* Sorting Dropdown */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium">Sort by:</span>
            <select
              className="border border-gray-300 rounded-md p-2"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">By Rating</option>
              <option value="reviews">Most Viewed</option>
            </select>
          </div>

          {/* List of Destinations */}
          <h3 className="text-2xl font-semibold mb-4">Central Yogyakarta</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {displayedDestinations.map((destination) => (
              <div
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                key={destination.id}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold">{destination.name}</h4>
                  <p className="text-gray-600 mt-2">{destination.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-yellow-500 font-bold">
                      ⭐ {destination.rating}
                    </div>
                    <div className="text-gray-500 text-sm">
                      ({destination.reviews} reviews)
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show All Button */}
          <div className="w-full flex justify-center">
            {!showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Show All Central Yogyakarta
              </button>
            )}
          </div>
        </>
        }
      </div>
    </div>
  );
}
