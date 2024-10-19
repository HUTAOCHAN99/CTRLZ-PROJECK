import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import { useMemo, useState } from "react";
import { useDestinations, useTopDestinations } from "@/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DestinationList, { DestinationListSkeleton } from "@/components/DestinationList";

export default function Destinations() {
  const { loading, data, error } = useTopDestinations();

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

        {error && <p>Data gagal dimuat. {error}</p>}

        {!error && loading && <DestinationListSkeleton count={3}/>}

        {!error && !loading && data && (
          <>
            <DestinationList
              list={data}
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
