import { useState } from "react";
import { useDestinations } from "@/firebase";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DestinationList({ list, createLink }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((destination) => (
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
            <h4 className="text-xl font-semibold"><Link to={createLink(destination)}>{destination.name}</Link></h4>
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
  );
}
