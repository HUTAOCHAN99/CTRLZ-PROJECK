import { useState } from "react";

export default function Destination_Box() {
  const [sortOption, setSortOption] = useState("recommended");
  const [showAll, setShowAll] = useState(false);
  // Sementara Static dlu
  const destinations = [
    {
      id: 1,
      name: "Candi Ratu Boko",
      description:
        "Candi bersejarah yang terletak di atas bukit dengan pemandangan indah, dekat Yogyakarta.",
      rating: 4.6,
      reviews: 3890,
      image:
        "https://asset.kompas.com/crops/F1WsYgfFr3DLqR9er42QrULceQE=/0x0:719x479/750x500/data/photo/2021/11/17/61949fbe4fbde.jpg",
      kabupaten: "Sleman",
    },
    {
      id: 2,
      name: "Candi Prambanan",
      description: "Kompleks candi Hindu terbesar di Indonesia.",
      rating: 4.6,
      reviews: 4532,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9mNLYnpMTYJ7w5yH34eIx2ay6dAl-GJgJvA&s",
      kabupaten: "Sleman",
    },
    {
      id: 3,
      name: "Kraton Yogyakarta",
      description: "Kediaman resmi Sultan Yogyakarta dan pusat budaya Jawa.",
      rating: 4.5,
      reviews: 3890,
      image:
        "https://statik.tempo.co/data/2022/04/08/id_1101400/1101400_720.jpg",
      kabupaten: "Kota Yogyakarta",
    },
    {
      id: 4,
      name: "Taman Sari",
      description: "Bekas taman kerajaan dan tempat peristirahatan Sultan.",
      rating: 4.3,
      reviews: 2750,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM_ogmn5RzyDb7x7VjTlqpmZgataDdNsgNyg&s",
      kabupaten: "Kota Yogyakarta",
    },
    {
      id: 5,
      name: "Malioboro",
      description: "Jalan terkenal untuk belanja dan kuliner khas Yogyakarta.",
      rating: 4.2,
      reviews: 5283,
      image:
        "https://asset.kompas.com/crops/MUE-eoOIx_KuiklsCUtdxaOyw5M=/0x0:749x500/750x500/data/photo/2022/05/16/62822daaa7f76.png",
      kabupaten: "Kota Yogyakarta",
    },
    {
      id: 6,
      name: "Pantai Parangtritis",
      description:
        "Pantai ikonik di selatan Yogyakarta yang terkenal dengan ombaknya.",
      rating: 4.4,
      reviews: 3120,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtIoriI3V08HdUDvq-75dZWOYQINXxr0xfFw&s",
      kabupaten: "Bantul",
    },
    {
      id: 7,
      name: "Candi Sambisari",
      description: "Candi peninggalan abad ke-9 yang terletak di tengah sawah.",
      rating: 4.5,
      reviews: 2000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/3/31/Candi_Sambisari.jpg",
      kabupaten: "Sleman",
    },
    {
      id: 8,
      name: "Pantai Glagah",
      description:
        "Pantai dengan pasir hitam dan pemandangan sunset yang indah.",
      rating: 4.3,
      reviews: 1500,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Pantai_Glagah.JPG",
      kabupaten: "Kulon Progo",
    },
    {
      id: 9,
      name: "Gua Pindul",
      description: "Gua yang terkenal untuk kegiatan cave tubing.",
      rating: 4.6,
      reviews: 2800,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Gua_Pindul.jpg",
      kabupaten: "Gunungkidul",
    },
    {
      id: 10,
      name: "Hutan Pinus Mangunan",
      description: "Hutan dengan pemandangan alam yang menenangkan.",
      rating: 4.4,
      reviews: 1800,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Hutan_Pinurs_Mangunan.jpg",
      kabupaten: "Bantul",
    },
    // Kabupaten Sleman
    {
      id: 11,
      name: "Kaliurang",
      description:
        "Kawasan wisata pegunungan dengan udara sejuk dan pemandangan indah.",
      rating: 4.5,
      reviews: 2500,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b4/Kaliurang.jpg",
      kabupaten: "Sleman",
    },
    {
      id: 12,
      name: "Taman Wisata Candi Ijo",
      description:
        "Candi yang terletak di bukit dengan pemandangan spektakuler.",
      rating: 4.4,
      reviews: 1800,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/eb/Taman_Wisata_Candi_Ijo.jpg",
      kabupaten: "Sleman",
    },
    {
      id: 13,
      name: "Museum Ullen Sentalu",
      description: "Museum yang menampilkan budaya dan sejarah Jawa.",
      rating: 4.7,
      reviews: 3000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/ec/Museum_Ullen_Sentalu.jpg",
      kabupaten: "Sleman",
    },
    // Kabupaten Bantul
    {
      id: 14,
      name: "Bantul Gembira Loka Zoo",
      description: "Kebun binatang yang memiliki berbagai koleksi satwa.",
      rating: 4.2,
      reviews: 2000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Bantul_Gembira_Loka_Zoo.jpg",
      kabupaten: "Bantul",
    },
    {
      id: 15,
      name: "Hutan Pinus Mangunan",
      description: "Hutan dengan pemandangan alam yang menenangkan.",
      rating: 4.4,
      reviews: 1800,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Hutan_Pinurs_Mangunan.jpg",
      kabupaten: "Bantul",
    },
    {
      id: 16,
      name: "Gua Cerme",
      description: "Gua yang memiliki stalaktit dan stalagmit yang menarik.",
      rating: 4.3,
      reviews: 1500,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5e/Gua_Cerme.jpg",
      kabupaten: "Bantul",
    },
    {
      id: 17,
      name: "Pantai Depok",
      description: "Pantai yang terkenal dengan kuliner seafoodnya.",
      rating: 4.5,
      reviews: 1200,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/10/Pantai_Depok.jpg",
      kabupaten: "Bantul",
    },
    // Kabupaten Kulon Progo
    {
      id: 18,
      name: "Candi Borobudur",
      description:
        "Candi Buddha terbesar di dunia dan Situs Warisan Dunia UNESCO.",
      rating: 4.9,
      reviews: 5000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8c/Candi_Borobudur.jpg",
      kabupaten: "Kulon Progo",
    },
    {
      id: 19,
      name: "Goa Jomblang",
      description: "Goa vertikal dengan pemandangan hutan yang indah.",
      rating: 4.5,
      reviews: 2800,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Goa_Jomblang.jpg",
      kabupaten: "Kulon Progo",
    },
    {
      id: 20,
      name: "Kalibiru National Park",
      description:
        "Taman nasional dengan pemandangan alam dan spot foto menakjubkan.",
      rating: 4.7,
      reviews: 2500,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/8/8e/Kalibiru_National_Park.jpg",
      kabupaten: "Kulon Progo",
    },
    // Kabupaten Gunungkidul
    {
      id: 21,
      name: "Pantai Indrayanti",
      description: "Pantai berpasir putih dengan berbagai fasilitas wisata.",
      rating: 4.5,
      reviews: 2100,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pantai_Indrayanti.jpg",
      kabupaten: "Gunungkidul",
    },
    {
      id: 22,
      name: "Gua Pindul",
      description: "Gua yang terkenal untuk kegiatan cave tubing.",
      rating: 4.6,
      reviews: 2800,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Gua_Pindul.jpg",
      kabupaten: "Gunungkidul",
    },
    {
      id: 23,
      name: "Pantai Sadranan",
      description:
        "Pantai yang terkenal dengan snorkeling dan keindahan bawah laut.",
      rating: 4.4,
      reviews: 1900,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c2/Pantai_Sadranan.jpg",
      kabupaten: "Gunungkidul",
    },
    {
      id: 24,
      name: "Pantai Krakal",
      description:
        "Pantai yang cocok untuk surfing dengan ombak yang menantang.",
      rating: 4.3,
      reviews: 1700,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a1/Pantai_Krakal.jpg",
      kabupaten: "Gunungkidul",
    },
  ];
  const sortedDestinations = destinations.sort((a, b) => {
    if (sortOption === "rating") {
      return b.rating - a.rating; // Urut berdasarkan rating
    } else if (sortOption === "reviews") {
      return b.reviews - a.reviews; // Urut berdasarkan jumlah ulasan (most viewed)
    }
    return 0; // Tidak ada urutan khusus
  });
  const displayedDestinations = showAll
    ? sortedDestinations
    : sortedDestinations.slice(0, 12);

  return (
    <div className="container mx-auto px-4 py-6" id="destinasi">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-4">
          Top attractions in Yogyakarta
        </h2>

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
      </div>
    </div>
  );
}
