"use client";
import { Search, Heart, ShoppingBag, X, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProfileDropdown } from "./profiledropdown";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const { cart } = useCart();
  const router = useRouter();

  const cartItemlength = cart.length;
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       const parsedUser = JSON.parse(storedUser);
  //       setUser(parsedUser);
  //     } catch (error) {
  //       console.error("Invalid user data in localStorage");
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("usertoken");
  //     }
  //   }
  // }, []);

  // Decode JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    if (id) {
      // Save token
      localStorage.setItem("usertoken", id);

      // Decode and save user
      const decoded = parseJwt(id);
      if (decoded?.id) {
        localStorage.setItem("user", JSON.stringify({ id: decoded.id }));
      }

      // Remove `id` from URL
      const currentPath = window.location.pathname;
      router.replace(currentPath);
    }

    // Read user from localStorage
    const userData = localStorage.getItem("user");
    const userToken = localStorage.getItem("usertoken");

    if (userData && userToken) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data in localStorage");
        localStorage.removeItem("user");
        localStorage.removeItem("usertoken");
      }
    }
  }, [router]);

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
          {/* <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/user/add"
                  className="inline-block bg-[#28B083] font-semibold px-3 md:px-6 py-2 text-sm md:text-base rounded-full text-white hover:bg-green-700 transition-colors"
                >
                  Sell/Donate Uniform
                </Link>
                <ProfileDropdown user={user} />
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-block bg-[#28B083] font-semibold px-4 md:px-6 py-1 text-sm md:text-base rounded-full text-white hover:bg-green-700 transition-colors"
              >
                Login/Register
              </Link>
            )}

            <Link href="/cart" className="flex justify-center items-center">
              <button className="flex  flex-col justify-center items-center cursor-pointer">
                <div className="inline-block relative font-semibold p-1 rounded-full text-black transition-colors ">
                  <span className="bg-green-500 w-5 h-5 flex items-center justify-center rounded-full -top-1 p-1 text-xs -right-2 font-bold absolute text-white">
                    {cartItemlength}
                  </span>
                  <ShoppingBag className="text-gray-600 w-6 h-6" />
                </div>
                <span className="text-sm font-bold max-w-[50px] truncate">
                  Cart
                </span>
              </button>
            </Link>
          </div> */}

            <div className="flex items-center gap-4">
           
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/user/add"
                  className="inline-block  bg-[#28B083] font-semibold px-3 md:px-6 py-2 text-sm md:text-base rounded-full text-white hover:bg-green-700 transition-colors"
                >
                  Sell/Donate Uniform
                </Link>
                <ProfileDropdown user={user} />
              </div>
          
             
        

            <Link href="/cart" className="flex justify-center items-center">
              <button className="flex  flex-col justify-center items-center cursor-pointer">
                <div className="inline-block relative font-semibold p-1 rounded-full text-black transition-colors ">
                  <span className="bg-green-500 w-5 h-5 flex items-center justify-center rounded-full -top-1 p-1 text-xs -right-2 font-bold absolute text-white">
                    {cartItemlength}
                  </span>
                  <ShoppingBag className="text-gray-600 w-6 h-6" />
                </div>
                <span className="text-sm font-bold max-w-[50px] truncate">
                  Cart
                </span>
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
