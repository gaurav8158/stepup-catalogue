import { Search, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className=" shadow-md bg-green-100 border-b ">
      <div className="flex container mx-auto items-center justify-between px-4 py-3  ">
        {/* Logo */}
        <Link href="/" className="no-underline">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png" // Replace with your actual path
              alt="Aramya Logo"
              className="h-10 w-auto"
            />
          </div>{" "}
        </Link>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button>
            <Search size={20} className="text-gray-700" />
          </button>
          <button>
            <Heart size={20} className="text-gray-700" />
          </button>
          <button>
            <ShoppingBag size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
