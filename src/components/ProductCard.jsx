// components/ProductCard.jsx
import { Heart, Star } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={product?.inStock ? `/product/${product._id}` : ""}
      className={`no-underline ${product?.inStock ? "" : "opacity-60"}`}
    >
      <div className="bg-white group rounded-md overflow-hidden shadow-sm hover:shadow-md relative text-[13px] font-sans">
        {/* Image */}
        <div className="relative">
          <img
            src={product.images[0]}
            // src="/Dress.png"
            alt={product.images[0]}
            className="w-full aspect-[3/4] max-h-[300px] object-cover"
          />

          {/* Wishlist */}
          {/* <button className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
            <Heart size={16} className="text-gray-600" />
          </button> */}
        </div>

        {/* Info */}
        <div className="p-3 space-y-1">
          <div className="font-semibold text-green-800 truncate">
            {product.schoolName}
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="text-[12px] text-gray-600 truncate">
              {product?.uniformCategory}
            </div>
          </div>
          <div className="flex items-center justify-between mt-1 gap-3">
            <span className="text-[13px] font-medium text-gray-800">
              {product.productName}
            </span>
            <div className="text-right">
              <div className="text-[13px] font-semibold text-gray-800">
             100   {product.priceToBuyer} AED
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-1 mt-2">
            <div className="flex flex-col">
              <span>Size</span>{" "}
              <span className="border bg-green-700 text-gray-50 px-2 py-[2px] text-[11px] rounded ">
                {product?.size}
              </span>{" "}
            </div>
            {!product?.inStock && (
              <div className="text-[11px] text-gray-500">
                <span
                  className={`${
                    product?.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  } text-green-600 px-2 rounded-3xl font-semibold`}
                >
                  {product?.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>{" "}
    </Link>
  );
}
