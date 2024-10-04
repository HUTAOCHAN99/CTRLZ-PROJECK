import React, { useState } from "react";

export default function Footer() {
  // State untuk mengatur dropdown visibility
  const [openMenu, setOpenMenu] = useState(null);

  // Toggle untuk dropdown saat di mode mobile (sm)
  const handleMenuToggle = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Destinations */}
          <div>
            <h4
              className="font-bold mb-4 sm:cursor-pointer"
              onClick={() => handleMenuToggle(1)}
            >
              Destinations
            </h4>
            <ul
              className={`sm:${openMenu === 1 ? "block" : "hidden"} md:block sm:mb-4`}
            >
              <li>Tokyo</li>
              <li>Kyoto</li>
              <li>Osaka</li>
              <li>Nara</li>
              <li>Mount Fuji</li>
              <li>Hiroshima</li>
              <li>Kamakura</li>
              <li>Kobe</li>
              <li>Nagoya</li>
              <li>Hakone</li>
              <li>Nikko</li>
            </ul>
          </div>

          {/* Regions of Indonesia */}
          <div>
            <h4
              className="font-bold mb-4 sm:cursor-pointer"
              onClick={() => handleMenuToggle(2)}
            >
              Regions of Indonesia
            </h4>
            <ul
              className={`sm:${openMenu === 2 ? "block" : "hidden"} md:block sm:mb-4`}
            >
              <li>Jawa</li>
              <li>Bali</li>
              <li>Kalimantan</li>
              <li>Sumatra</li>
              <li>Sulawesi</li>
              <li>Nusa Tenggara</li>
              <li>Maluku</li>
              <li>Papua</li>
            </ul>
          </div>

          {/* Interests */}
          <div>
            <h4
              className="font-bold mb-4 sm:cursor-pointer"
              onClick={() => handleMenuToggle(3)}
            >
              Interests
            </h4>
            <ul
              className={`sm:${openMenu === 3 ? "block" : "hidden"} md:block sm:mb-4`}
            >
              <li>Temples</li>
              <li>Shrines</li>
              <li>Castles</li>
              <li>Onsen</li>
              <li>Food and Drink</li>
              <li>Manga and Anime</li>
              <li>Gardens</li>
              <li>Hiking</li>
              <li>Shopping</li>
              <li>Flowers</li>
            </ul>
          </div>

          {/* Plan a Trip */}
          <div>
            <h4
              className="font-bold mb-4 sm:cursor-pointer"
              onClick={() => handleMenuToggle(4)}
            >
              Plan a Trip
            </h4>
            <ul
              className={`sm:${openMenu === 4 ? "block" : "hidden"} md:block sm:mb-4`}
            >
              <li>Before You Go</li>
              <li>Itineraries</li>
              <li>Tours</li>
              <li>Learn</li>
              <li>Transportation</li>
              <li>Accommodation</li>
              <li>Living in Indonesia</li>
            </ul>
          </div>

          {/* Blogs */}
          <div>
            <h4
              className="font-bold mb-4 sm:cursor-pointer"
              onClick={() => handleMenuToggle(5)}
            >
              Blogs
            </h4>
            <ul
              className={`sm:${openMenu === 5 ? "block" : "hidden"} md:block sm:mb-4`}
            >
              <li>Travel Reports</li>
              <li>Wild Indonesia</li>
              <li>Solo Travel</li>
              <li>Hiking Trails</li>
              <li>Camping Tips</li>
              <li>Local Experiences</li>
            </ul>
          </div>

          {/* Travel News */}
          <div>
            <h4
              className="font-bold mb-4 sm:cursor-pointer"
              onClick={() => handleMenuToggle(6)}
            >
              Travel News
            </h4>
            <ul
              className={`sm:${openMenu === 6 ? "block" : "hidden"} md:block sm:mb-4`}
            >
              <li>Disaster Updates</li>
              <li>Sites Under Construction</li>
              <li>New Destinations</li>
              <li>Festival Highlights</li>
            </ul>
            <div className="mt-4">
              <h4 className="font-bold mb-2">Get Our Newsletter</h4>
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Sign up
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-gray-600">© 2024 YourWebsite. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-800">About us</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Contact us</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Privacy & Terms</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Advertising</a>
          </div>
        </div>

        {/* Social media icons */}
        <div className="mt-6 flex justify-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
