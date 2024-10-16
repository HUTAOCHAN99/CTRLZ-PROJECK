import { Outlet, ScrollRestoration } from "react-router-dom";
import { useState } from "react";
import { useDestinations } from "@/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DestinationList from "@/components/DestinationList";

export default function Destinations() {
  const [sortOption, setSortOption] = useState("recommended");
  const [showAll, setShowAll] = useState(false);

  const { loading, data, error } = useDestinations();

  const sortedDestinations = data
    ? data.sort((a, b) => {
        if (sortOption === "rating") {
          return b.rating - a.rating; // Urut berdasarkan rating
        } else if (sortOption === "reviews") {
          return b.reviews - a.reviews; // Urut berdasarkan jumlah ulasan (most viewed)
        }
        return 0; // Tidak ada urutan khusus
      })
    : [];
  const displayedDestinations = showAll
    ? sortedDestinations
    : sortedDestinations.slice(0, 12);

  return (
    <div className="container mx-auto px-4 py-6" id="destinasi">
      <ScrollRestoration />
      <Outlet />
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold mb-4">
          {loading
            ? "Loading"
            : error
            ? `Error: ${error}`
            : "Top attractions in Yogyakarta"}
        </h2>

        {!loading && !error && data && (
          <>
            <div className="flex">
              <div className="flex-grow"></div>
              <Select
                value={sortOption}
                onValueChange={(value) => setSortOption(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating">By Rating</SelectItem>
                  <SelectItem value="reviews">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* List of Destinations */}
            <h3 className="text-2xl font-semibold mb-4">Central Yogyakarta</h3>
            <DestinationList
              list={displayedDestinations}
              createLink={({ id }) => `/destination/${id}`}
            />

            {/* Show All Button */}
            <div className="w-full flex justify-center">
              {!showAll && (
                <Button className="mt-8" onClick={() => setShowAll(true)}>
                  Show All Central Yogyakarta
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
