"use client";
import { Search, Heart, ShoppingBag, X, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProfileDropdown } from "./profiledropdown";
import { useCart } from "@/context/CartContext";
export default function Header() {
  const [user, setUser] = useState(null);
  const { cart } = useCart();
  const cartItemlength = cart.length;
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

  return (
    <>
      <header className="shadow-md bg-white border-b">
        <div className="flex container mx-auto items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="no-underline">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="stepup Logo"
                className="h-9 md:h-10 w-auto"
              />
            </div>
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <Link
                href="/login"
                className="inline-block bg-[#28B083] font-semibold px-4 md:px-6 py-1 text-sm md:text-base rounded-full text-white hover:bg-green-700 transition-colors"
              >
                Login/Register
              </Link>
            )}

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
                  {cartItemlength}
                </span>
                <ShoppingBag size={20} className="text-gray-700" />
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
