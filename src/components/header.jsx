"use client";
import { Search, Heart, ShoppingBag, X, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProfileDropdown } from "./profiledropdown";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
        localStorage.removeItem("usertoken");
      }
    }
  }, []);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
    // You can redirect to search results page or handle search as needed
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="shadow-md bg-white border-b">
        <div className="flex container mx-auto items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="no-underline">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="stepup Logo" className="h-10 w-auto" />
            </div>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(true)}>
              <Search size={20} className="text-gray-700" />
            </button>
            {user ? (
              // <div className="flex flex-col justify-center items-center">
              //   <div className="inline-block bg-[#28B083] font-semibold p-1 rounded-full text-white hover:bg-green-700 transition-colors shadow">
              //     <User className="w-5 h-5" />
              //   </div>
              //   <span className="text-xs font-semibold  max-w-[50px]  truncate">
              //     {user.name || "User"}
              //   </span>
                <ProfileDropdown user={user}/>
            ) : (
              <Link
                href="/login"
                className="inline-block bg-[#28B083] font-semibold px-6 py-1 rounded-full text-white hover:bg-green-700 transition-colors"
              >
                Login/Register
              </Link>
            )}
            {/* <a
              href="https://api.whatsapp.com/send?phone=971523717837&text=Hi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-600 font-semibold px-6 py-1 rounded-full text-white hover:bg-orange-700 transition-colors"
            >
              Sell/Donate
            </a> */}
            <a
              href="https://api.whatsapp.com/send?phone=971523717837&text=Hi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/whatsapp.gif"
                alt="whatsapp"
                width={400}
                height={400}
                className="w-9 h-9"
              />{" "}
            </a>

            <Link href="/cart" className="flex justify-center items-center">
              <button className="relative">
                <span className="bg-orange-500 w-5 h-5 flex items-center justify-center rounded-full -top-2 p-1 text-xs -right-2 font-bold absolute text-white">
                  3
                </span>
                <ShoppingBag size={20} className="text-gray-700" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Popup Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 animate-fade-in">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Search Products
                </h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>

              {/* Optional: Popular searches or recent searches */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-600 mb-3">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Shirt", "Trouser", "Skirt", "Winterwear", "Sports"].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          handleSearchSubmit({ preventDefault: () => {} });
                        }}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
