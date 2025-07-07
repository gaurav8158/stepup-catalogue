// components/ProductCard.jsx
import { Heart, Star } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {

  return (
    <Link href={`/product/${product._id}`} className="no-underline">
      <div className="bg-white group rounded-xl overflow-hidden shadow-sm hover:shadow-md relative text-[13px] font-sans">
        {/* Image */}
        <div className="relative">
          <img
            src={product.images[0]}
            // src="/Dress.png"
            alt={product.images[0]}
            className="w-full aspect-[3/4] object-cover"
          />

          {/* Wishlist */}
          {/* <button className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
            <Heart size={16} className="text-gray-600" />
          </button> */}
        </div>

        {/* Info */}
        <div className="p-3 space-y-1">
          <div className="font-semibold text-green-800 truncate">
            {product.school}
          </div>
          <div className="text-[12px] text-gray-600 truncate">
            {product?.uniformCategory}
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="text-[13px] font-medium text-gray-800">
              {product.productName}
            </span>
            <div className="text-right">
              <div className="text-[14px] font-semibold text-gray-800">
                ₹{product.priceToBuyer}
              </div>
              {/* <div className="text-[11px] text-gray-500">
                <span className="line-through mr-1">
                  ₹{product.originalPrice}
                </span>
                <span className="text-green-600 font-semibold">
                  -{product.discount}%
                </span>
              </div> */}
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            <span className="border text-gray-700 px-2 py-[2px] text-[11px] rounded bg-white">
              {product?.size}
            </span>
          </div>
        </div>
      </div>{" "}
    </Link>
  );
}
