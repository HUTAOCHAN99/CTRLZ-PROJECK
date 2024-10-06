import React from "react";
import Caption from "./Caption";
import NolKilometerImg from "@/img/NolKilometer.jpg"

export default function Content() {
  return (
    <div className="w-full bg-gray-100">
      {/* Image Container */}
      <div className="relative">
        <img
          src={NolKilometerImg} // Replace with actual image link
          alt="NolKilometer"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Navigation Buttons */}
      {/* Hide on sm and md screens */}
      <nav className="bg-white shadow-md p-4 flex justify-center space-x-6 text-gray-400 font-semibold hidden sm:hidden md:flex">
        <button className="hover:text-slate-900 transition duration-300">
          Intro
        </button>
        <button className="hover:text-slate-900 transition duration-300">
          Attractions
        </button>
        <button className="hover:text-slate-900 transition duration-300">
          By Interest
        </button>
        <button className="hover:text-slate-900 transition duration-300">
          Get There
        </button>
        <button className="hover:text-slate-900 transition duration-300">
          Itineraries
        </button>
        <button className="hover:text-slate-900 transition duration-300">
          Hotels
        </button>
        <button className="hover:text-slate-900 transition duration-300">
          Experiences
        </button>
      </nav>
      <Caption/>
    </div>
  );
}
