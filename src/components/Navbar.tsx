"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50 border border-b-[#A8B5A2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              id="logo"
              className="text-2xl font-bold text-gray-600"
            >
              DecoHome
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/collections"
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Coleções
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Sobre
              </Link>
              <Link
                href="/shop"
                className="text-gray-200 transition-colors duration-200 bg-[#A8B5A2] p-2 rounded-md shadow-md hover:bg-[#A8B5A2]/80"
              >
                Shop
              </Link>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white-300 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out`}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-4 pt-2 pb-4 space-y-4 bg-white-50 shadow-inner">
          <Link
            href="/"
            className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md transition-colors duration-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/collections"
            className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md transition-colors duration-200"
            onClick={toggleMenu}
          >
            Coleções
          </Link>
          <Link
            href="/about"
            className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md transition-colors duration-200"
            onClick={toggleMenu}
          >
            Sobre
          </Link>
          <Link
            href="/shop"
            className="block text-white bg-[#A8B5A2] px-3 py-2 rounded-md transition-colors duration-200"
            onClick={toggleMenu}
          >
            Shop
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
