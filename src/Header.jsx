import { useState } from "react";
import img from "./img/Leonardo_Phoenix_Design_a_modern_minimalist_logo_for_CtrlZ_tha_3-removebg-preview-transformed.png";
import { Button } from "./components/ui/button";
import { logOut, signInWithGoogle } from "./firebase";
import { useAuth } from "./firebase/AuthContext";
import { RiGoogleFill, RiUser3Fill } from "@remixicon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { router } from "./router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white sticky top-0 w-full flex items-center z-10 shadow-lg mb-8">
      <div className="container px-4">
        <div className="flex items-center relative">
          <button
            id="hamburger"
            name="hamburger"
            type="button"
            onClick={toggleMenu}
            className="block mr-8 lg:hidden"
          >
            <span
              className={`hamburger-line transition duration-300 ease-in-out origin-top-left ${
                isOpen ? "rotate-45" : ""
              }`}
            ></span>
            <span
              className={`hamburger-line transition duration-300 ease-in-out ${
                isOpen ? "scale-0" : ""
              }`}
            ></span>
            <span
              className={`hamburger-line transition duration-300 ease-in-out origin-bottom-left ${
                isOpen ? "-rotate-45" : ""
              }`}
            ></span>
          </button>
          <div className="">
            <a
              href="#home"
              className="font-bold text-lg text-primary block py-6"
            >
              <img src={img} alt="" width="100px" />
            </a>
          </div>
          <div className="flex items-center px-4">
            <nav
              id="nav-menu"
              className={`absolute py-5 bg-white shadow-lg rounded-lg max-w-[250px] w-full left-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:rounded-none transition-all duration-300 ease-in-out ${
                isOpen ? "block" : "hidden"
              }`}
            >
              <ul className="block lg:flex">
                <li className="group">
                  <Link
                    to="/"
                    className="text-base text-dark py-2 flex mx-8 group-hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/aboutus"
                    className="text-base text-dark py-2 flex mx-8 group-hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/destinations"
                    className="text-base text-dark py-2 flex mx-8 group-hover:text-primary"
                  >
                    Destinations
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex-grow"></div>
          {auth ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RiUser3Fill size="20px" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.navigate("/mydestination")}
                >
                  Destinasi Milik Saya
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div>
              <Button onClick={() => signInWithGoogle()}>
                <RiGoogleFill className="mr-2" />
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
