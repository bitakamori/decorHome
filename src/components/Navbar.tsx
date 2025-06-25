"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-rose-50 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-600">
              DecoHome
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
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
                Collections
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/shop"
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
