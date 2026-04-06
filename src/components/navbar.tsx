import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./themeswitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setIsAuth(false);
      navigate("/");
    } catch (err) {
      console.log("handleLogout: ", err);
    }
  };

  return (
    <nav className="flex centerXY text-primary border-b border-primary">
      <div className="w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Theme */}
          <ThemeSwitcher />

          {isAuth && (
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
