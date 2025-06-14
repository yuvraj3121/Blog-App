import { useEffect, useRef, useState } from "react";
import { PiNotePencil } from "react-icons/pi";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
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
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="text-xl font-bold text-blue-600">Blog App</div>

      <div className="relative" ref={dropdownRef}>
        <div className="flex gap-1 ">
          <button className="flex items-center justify-center gap-2 hover:text-blue-600 text-gray-700 font-medium">
            <PiNotePencil /> Write
          </button>
          <button
            onClick={toggleDropdown}
            className="text-gray-700 font-medium hover:text-blue-600 focus:outline-none flex items-center"
          >
            Yuvraj
          </button>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
            <a
              href="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Profile
            </a>
            <a
              href="/my-blogs"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              My Blogs
            </a>
            <a
              href="/logout"
              className="block px-4 py-2 text-red-600 hover:bg-gray-100"
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
