import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import { useMemo, useState } from "react";
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

  const displayedDestinations = useMemo(() => {
    if (!data) return []

    const res = [...data];

    if (sortOption != "recommended")
      res.sort((a, b) => {
        if (sortOption === "rating") {
          return getAvgRating(b) - getAvgRating(a);
        } else if (sortOption === "most-view") {
          return getVisitCount(b) - getVisitCount(a);
        }
        return 0; // Tidak ada urutan khusus
      })

    return showAll
      ? res
      : res.slice(0, 6);
  }, [data, sortOption, showAll]);

  return (
    <div className="container mx-auto px-4 py-6" id="destinasi">
      <ScrollRestoration />
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
            <DestinationList
              list={displayedDestinations}
              createLink={({ id }) => `/destination/${id}`}
            />

            <div className="w-full flex justify-center">

              <Button className="mt-8">
                <Link to="/destinations">Show All</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
