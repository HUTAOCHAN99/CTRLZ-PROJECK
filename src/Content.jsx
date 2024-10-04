import React from "react";

export default function Content() {
  return (
    <div className="w-full bg-gray-100">
      {/* Image Container */}
      <div className="relative">
        <img
          src="src\img\NolKilometer.jpg" // Replace with actual image link
          alt="NolKilometer"
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Navigation Buttons */}
      <nav className="bg-white shadow-md p-4 flex justify-center space-x-6 text-gray-700 font-semibold">
        <button className="hover:text-red-500 transition duration-300">
          Intro
        </button>
        <button className="hover:text-red-500 transition duration-300">
          Attractions
        </button>
        <button className="hover:text-red-500 transition duration-300">
          By Interest
        </button>
        <button className="hover:text-red-500 transition duration-300">
          Get There
        </button>
        <button className="hover:text-red-500 transition duration-300">
          Itineraries
        </button>
        <button className="hover:text-red-500 transition duration-300">
          Hotels
        </button>
        <button className="hover:text-red-500 transition duration-300">
          Experiences
        </button>
      </nav>
    </div>
  );
}


