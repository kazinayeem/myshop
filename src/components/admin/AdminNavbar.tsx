"use client";

import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className={`bg-gray-900 text-white shadow-lg  top-0 left-0 w-full mb-4`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">Admin Panel</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-gray-300 cursor-pointer">Orders</li>
          <li className="hover:text-gray-300 cursor-pointer">Products</li>
          <li className="hover:text-gray-300 cursor-pointer">Users</li>
        </ul>

        {/* Right Section: Dark Mode Toggle + Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded bg-gray-700 hover:bg-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <ul className="py-2 space-y-2 text-center">
            <li className="py-2 border-b border-gray-700 hover:bg-gray-700">
              Dashboard
            </li>
            <li className="py-2 border-b border-gray-700 hover:bg-gray-700">
              Orders
            </li>
            <li className="py-2 border-b border-gray-700 hover:bg-gray-700">
              Products
            </li>
            <li className="py-2 hover:bg-gray-700">Users</li>
          </ul>
        </div>
      )}
    </nav>
  );
}
