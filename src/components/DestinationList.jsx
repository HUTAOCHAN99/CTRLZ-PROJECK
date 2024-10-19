import { useMemo, useState } from "react";
import { useDestinationImageUrl, useDestinations } from "@/firebase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import imgNotAvailableUrl from "@/img/Image_not_available.png";
import imgLoading from "@/img/640px-Loading-red-spot.gif";
import { Rating } from "@smastrom/react-rating";
import { Skeleton } from "./ui/skeleton";

function ImageLoading() {
  return <Skeleton className="w-full h-48 object-cover" />;
}

function Destination({ destination, createLink }) {
  const { url } = useDestinationImageUrl(destination.id);

  return <div
    className="bg-white rounded-lg shadow-lg overflow-hidden"
  >
    {url.loading ? <ImageLoading /> :
      <img
        src={url.error ? imgNotAvailableUrl : url.data == null ? imgNotAvailableUrl : url.data}
        alt={destination.name}
        className="w-full h-48 object-cover"
      />}
    <div className="p-4">
      <h4 className="text-xl font-semibold"><Link to={createLink(destination)}>{destination.name}</Link></h4>
      <p className="text-gray-600 mt-2 truncate">{destination.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <div className="w-24">
          {destination.avgRating && <Rating value={destination.avgRating} readOnly />}
        </div>
        <div className="text-gray-500 text-sm">
          ({destination.numRating ? `${destination.numRating} reviews` : "no reviews yet"})
        </div>
      </div>
    </div>
  </div>
}

function DestinationSkeleton() {
  return <div
    className="bg-white rounded-lg shadow-lg overflow-hidden"
  >
    <ImageLoading />
    <div className="p-4">
      <Skeleton className="w-full h-6 text-xl font-semibold" />
      <Skeleton className="w-full h-6 text-gray-600 mt-2 truncate" />
      <div className="mt-4 flex justify-between items-center">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16 text-gray-500 text-sm" />
      </div>
    </div>
  </div>
}

export default function DestinationList({ list, createLink }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((destination) => (
        <Destination key={destination.id} destination={destination} createLink={createLink} />
      ))}
    </div>
  );
}

export function DestinationListSkeleton({ count }) {
  const items = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => i);
  }, [count]);

  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(i => <DestinationSkeleton key={i} />)}
  </div>
}
