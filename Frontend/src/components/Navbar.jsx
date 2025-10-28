import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import useThemeStore from "../Store/themeStore";
import { useAuthStore } from "../Store/useAuthStore";

export default function Navbar() {
  const { darkMode, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 shadow-md transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-primary text-black"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          YN Portfolio
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:underline"
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              to="/admin"
              className="px-3 py-1 rounded bg-white text-primary font-semibold"
            >
              Admin
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>

          {user && (
            <button
              onClick={logout}
              className="ml-2 px-2 py-1 rounded bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="mr-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden flex flex-col bg-white dark:bg-black dark:text-white px-4 py-4 space-y-3`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="hover:underline"
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-1 rounded bg-white text-primary font-semibold"
            >
              Admin
            </Link>
          )}
          {user && (
            <button
              onClick={logout}
              className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
