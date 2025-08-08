import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // 🔥
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔥
  const navigate = useNavigate(); // 🔥

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    checkToken(); // Initial check

    // Listen to token changes (login/logout from other tabs)
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // 🔥 Remove token
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    navigate("/login"); // 🔥 Redirect to login page
  };

  const menuItems = [
    "Home",
    "chatbot",
    "Trial",
    "Pricing",
    "About Us",
    "Analytics",
  ];

  return (
    <header
      className="fixed w-full z-50 top-0 shadow-lg"
      style={{
        background: "linear-gradient(to bottom, #2a0140, #3d025e)",
        borderBottom: "1px solid #4a036b",
      }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-purple-800 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-500 drop-shadow-2xl">
            EntropyAI
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item}
              href={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className="text-white font-semibold text-lg relative group transition-all duration-300 hover:text-yellow-300"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white font-semibold text-lg transition-all duration-300 hover:text-red-400"
            >
              Logout
            </button>
          ) : (
            <a
              href="/get-started"
              className="bg-gradient-to-r from-blue-700 to-purple-800 text-white font-semibold py-2 px-5 rounded-full hover:from-blue-800 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </a>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden px-6 py-4 space-y-4"
          style={{
            background: "linear-gradient(to bottom, #2a0140, #3d025e)",
          }}
        >
          {menuItems.map((item) => (
            <a
              key={item}
              href={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className="block text-white font-semibold text-lg transition-all duration-300 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-center text-white font-semibold py-2 rounded-full hover:text-red-400 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <a
              href="/get-started"
              className="block w-full text-center bg-gradient-to-r from-blue-700 to-purple-800 text-white font-semibold py-2 rounded-full hover:from-blue-800 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
