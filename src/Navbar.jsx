import { useState } from "react";

export default function Footer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState([false, false, false]);

  // Data untuk kategori dan item di footer
  const footerData = [
    {
      title: "Destinasi",
      items: [
        { name: "Candi Prambanan", href: "#" },
        { name: "Malioboro", href: "#" },
        { name: "Taman Sari", href: "#" },
      ],
    },
    {
      title: "Kabupaten",
      items: [
        { name: "Kota Yogyakarta", href: "#" },
        { name: "Sleman", href: "#" },
        { name: "Kulon Progo", href: "#" },
        { name: "Gunung Kidul", href: "#" },
      ],
    },
    {
      title: "Menarik",
      items: [
        { name: "Candi", href: "#" },
        { name: "Pantai", href: "#" },
        { name: "Musium", href: "#" },
        { name: "Keraton", href: "#" },
      ],
    },
  ];

  // Fungsi untuk membuka/menutup dropdown di mobile
  const toggleDropdown = (index) => {
    const newDropdownState = [...isDropdownOpen];
    newDropdownState[index] = !newDropdownState[index];
    setIsDropdownOpen(newDropdownState);
  };

  return (
    <footer className="bg-white py-8 border-t border-gray-300">
      <div className="container mx-auto px-4">
        {/* Mobile view: dropdown for each section */}
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
                      <a
                        href={item.href}
                        className="block py-1 text-slate-400 hover:text-slate-900 transition duration-300"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Desktop view: columns */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul>
                {section.items.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={item.href}
                      className="block py-1 text-slate-400 hover:text-slate-900 transition duration-300"
                    >
                      {item.name}
                    </a>
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
          <a href="#" className="text-slate-400 hover:text-slate-900 transition duration-300">
            About us
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-900 transition duration-300">
            Contact us
          </a>
        </div>
      </div>
    </footer>
  );
}
