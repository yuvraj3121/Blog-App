import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { PiNotePencil } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("blog-app-token");
        if (token) {
          const res = await axios.get(
            "https://minddrop.onrender.com/api/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(res.data.user);

          console.log(res.data.user);
        }
      } catch (err) {
        localStorage.removeItem("blog-app-token");
      }
    };
    checkAuth();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-md h-[80px]">
      <div
        className="text-3xl font-bold text-black cursor-pointer font-serif"
        onClick={() => navigate("/")}
      >
        MindDrop
      </div>

      <div className="relative" ref={dropdownRef}>
        <div className="flex gap-4 ">
          <button
            className="flex items-center justify-center gap-2 hover:text-blue-600 text-gray-700 font-medium p-2"
            onClick={() => navigate("/write")}
          >
            <PiNotePencil /> Write
          </button>
          <button
            onClick={toggleDropdown}
            className="text-gray-700 font-medium hover:text-blue-600 focus:outline-none flex items-center p-2"
          >
            {user?.userName}
          </button>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
            <a
              href="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Profile
            </a>
            <a
              href="/library"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Library
            </a>
            <a
              href="/"
              className="block px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
              onClick={() => {
                localStorage.removeItem("blog-app-token");
                setUser(null);
              }}
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
