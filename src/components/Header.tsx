import React from "react";
import { FiBell, FiUser, FiSearch } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-semibold text-emerald-600 tracking-tight">
            LinkMeld
          </h1>
        </div>

        {/* Search (Optional for MVP) */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md w-full max-w-md">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search captured knowledge..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative text-gray-500 hover:text-emerald-600 transition-colors">
            <FiBell size={20} />
            {/* Example notification badge */}
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>

          {/* User Section */}
          <div className="flex items-center gap-2 cursor-pointer">
            <FiUser className="text-gray-500" size={20} />
            <span className="text-sm text-gray-700 font-medium">Username</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
