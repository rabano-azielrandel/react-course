import { useState } from "react";
import { CONTAINS_TOKEN } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./themeswitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        // credentials: "include", // future proof for cookies
      });

      // remove token as of now but switch to cookies in future
      localStorage.removeItem("token");

      console.log(localStorage.getItem("token"));
      // redirect
      navigate("/");
    } catch (err) {
      console.log("handleLogout: ", err);
    }
  };

  return (
    <nav className="flex centerXY bg-red-600 text-primary border-b border-primary">
      <div className="w-4xl">
        <div className="flex justify-between items-center h-16">
          {/* Theme */}
          <ThemeSwitcher />

          {CONTAINS_TOKEN() && (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-gray-300">
                  Home
                </a>
                <a href="#" className="hover:text-gray-300">
                  About
                </a>
                <a href="#" className="hover:text-gray-300">
                  Services
                </a>
                <a href="#" className="hover:text-gray-300">
                  Contact
                </a>
                <button onClick={handleLogout} className="cursor-pointer">
                  <p>LOG OUT</p>
                </button>
              </div>

              {/* Mobile Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="focus:outline-none"
                >
                  {isOpen ? (
                    <span className="text-2xl">&times;</span>
                  ) : (
                    <span className="text-2xl">&#9776;</span>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block hover:text-gray-300">
            Home
          </a>
          <a href="#" className="block hover:text-gray-300">
            About
          </a>
          <a href="#" className="block hover:text-gray-300">
            Services
          </a>
          <a href="#" className="block hover:text-gray-300">
            Contact
          </a>
          <button onClick={handleLogout} className="cursor-pointer">
            <p>LOG OUT</p>
          </button>
        </div>
      )}
    </nav>
  );
}
