// components/ProductCard.jsx
import { Heart, Star } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} className="no-underline">
      <div className="bg-white group rounded-xl overflow-hidden shadow-sm hover:shadow-md relative text-[13px] font-sans">
        {/* Image */}
        <div className="relative">
          <img
            //   src={product.image}
            src="/Dress.png"
            alt={product.title}
            className="w-full aspect-[3/4] object-cover"
          />
          {/* Rating */}
          <div className="absolute bottom-2 left-2 bg-white px-2 py-0.5 rounded-full text-xs flex items-center gap-1 shadow-sm">
            <Star size={12} className="text-green-600 fill-green-600" />
            <span className="text-green-700 font-semibold text-[12px]">
              {product.rating}
            </span>
            <span className="text-gray-500 text-[11px]">
              ({product.reviews})
            </span>
          </div>
          {/* Wishlist */}
          <button className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
            <Heart size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Info */}
        <div className="p-3 space-y-1">
          <div className="font-semibold text-green-800 truncate">
            {product.school}
          </div>
          <div className="text-[12px] text-gray-600 truncate">
            {product.title}
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="text-[13px] font-medium text-gray-800">
              {product?.uniformCategory}
            </span>
            <div className="text-right">
              <div className="text-[14px] font-semibold text-gray-800">
                ₹{product.price}
              </div>
              <div className="text-[11px] text-gray-500">
                <span className="line-through mr-1">
                  ₹{product.originalPrice}
                </span>
                <span className="text-green-600 font-semibold">
                  -{product.discount}%
                </span>
              </div>
            </div>
          </div>

          {/* <div className="mt-1 flex items-center gap-1 text-[11px] text-pink-700 font-semibold bg-yellow-50 px-2 py-1 rounded-md w-max">
          <span role="img" aria-label="gift">
            🎁
          </span>
          FREE POUCH{" "}
          <span className="text-gray-600 font-normal">On First Order</span>
        </div> */}

          <div className="flex flex-wrap gap-1 mt-2">
            {product.sizes.map((s, i) => (
              <span
                key={i}
                className="border text-gray-700 px-2 py-[2px] text-[11px] rounded bg-white"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>{" "}
    </Link>
  );
}
