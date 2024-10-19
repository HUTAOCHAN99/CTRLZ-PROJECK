import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { router } from "./router";
import { cities } from "./util";

export default function Footer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState([false, false, false]);

  // Data untuk kategori dan item di footer
  const footerData = [
    {
      title: "Destinasi",
      items: [
        { name: "Candi Prambanan", href: "/destination/XekG04PxXQRbxIPxKwpl" },
        { name: "Pantai Parangtritis", href: "/destination/dTy8DbNfYd3zlueyllsa" },
        { name: "Masjid Gede Kauman", href: "/destination/k4nOfn7zBrCoUHwKaO9F" },
      ],
    },
    {
      title: "Kabupaten",
      items: cities.map((kab) => ({
        name: kab,
        href: `/destinations?kabupaten=${kab.replace(" ", "+")}`
      })),
    },
  ];

  // Fungsi untuk membuka/menutup dropdown di mobile
  const toggleDropdown = (index) => {
    const newDropdownState = [...isDropdownOpen];
    newDropdownState[index] = !newDropdownState[index];
    setIsDropdownOpen(newDropdownState);
  };

  return (
    <footer className="bg-white py-8 border-t border-gray-300 mt-8">
      <div className="container mx-auto px-4">
        <div className="md:hidden">
          {footerData.map((section, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left font-semibold text-lg py-2 border-b border-gray-300"
                onClick={() => toggleDropdown(index)}
              >
                {section.title}
              </button>
              {isDropdownOpen[index] && (
                <ul className="mt-2">
                  {section.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={item.href}
                        className="block py-1  text-slate-500 hover:text-slate-900 transition duration-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.href}
                      className="block py-1  text-slate-500 hover:text-slate-900 transition duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500">&copy; 2024 CTRL-Z All Rights Reserved.</p>
        <div className="flex justify-center mt-4 space-x-6">
          <Link
            to="/aboutus"
            className="text-base text-dark py-2 flex mx-8 group-hover:text-primary"
          >
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
