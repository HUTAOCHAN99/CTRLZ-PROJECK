import React from "react";

export default function Destination_Box() {
  const destinations = [
    {
      id: 1,
      name: "Candi Borobudur",
      description: "Candi Buddha terbesar di dunia, terletak di dekat Yogyakarta.",
      rating: 4.7,
      reviews: 5120,
      image: "url-of-image-1", // ganti dengan URL gambar yang sesuai
    },
    {
      id: 2,
      name: "Candi Prambanan",
      description: "Kompleks candi Hindu terbesar di Indonesia.",
      rating: 4.6,
      reviews: 4532,
      image: "url-of-image-2", // ganti dengan URL gambar yang sesuai
    },
    {
      id: 3,
      name: "Kraton Yogyakarta",
      description: "Kediaman resmi Sultan Yogyakarta dan pusat budaya Jawa.",
      rating: 4.5,
      reviews: 3890,
      image: "url-of-image-3", // ganti dengan URL gambar yang sesuai
    },
    {
      id: 4,
      name: "Taman Sari",
      description: "Bekas taman kerajaan dan tempat peristirahatan Sultan.",
      rating: 4.3,
      reviews: 2750,
      image: "url-of-image-4", // ganti dengan URL gambar yang sesuai
    },
    {
      id: 5,
      name: "Malioboro",
      description: "Jalan terkenal untuk belanja dan kuliner khas Yogyakarta.",
      rating: 4.2,
      reviews: 5283,
      image: "url-of-image-5", // ganti dengan URL gambar yang sesuai
    },
    {
      id: 6,
      name: "Pantai Parangtritis",
      description: "Pantai ikonik di selatan Yogyakarta yang terkenal dengan ombaknya.",
      rating: 4.4,
      reviews: 3120,
      image: "url-of-image-6", // ganti dengan URL gambar yang sesuai
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-4">Top attractions in Yogyakarta</h2>
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-medium">Sort by:</span>
        <select className="border border-gray-300 rounded-md p-2">
          <option value="recommended">Recommended</option>
          <option value="district">By District</option>
        </select>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Central Yogyakarta</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((destination) => (
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

      <button className="mt-8 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
        Show All Central Yogyakarta
      </button>
    </div>
  );
}
