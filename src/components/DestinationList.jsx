import { useState } from "react";
import { useDestinationImageUrl, useDestinations } from "@/firebase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import imgNotAvailableUrl from "@/img/Image_not_available.png";
import imgLoading from "@/img/640px-Loading-red-spot.gif";
import { Rating } from "@smastrom/react-rating";

function Destination({ destination, createLink }) {
  const { url } = useDestinationImageUrl(destination.id);

  return <div>
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <img
        src={url.loading ? imgLoading : url.error ? imgNotAvailableUrl : url.data == null ? imgNotAvailableUrl : url.data}
        alt={destination.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h4 className="text-xl font-semibold"><Link to={createLink(destination)}>{destination.name}</Link></h4>
        <p className="text-gray-600 mt-2">{destination.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <div className="w-24">
            {destination.avgRating && <Rating value={destination.avgRating} readOnly />}
          </div>
          <div className="text-gray-500 text-sm">
            ({destination.reviews ? `${destination.reviews}} reviews` : "no reviews yet"})
          </div>
        </div>
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
