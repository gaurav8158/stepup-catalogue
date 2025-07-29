import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={product?.inStock ? `/product/${product._id}` : ""}
      className={`no-underline ${product?.inStock ? "" : "opacity-60"}`}
    >
      <div className="bg-white group rounded-md overflow-hidden shadow-sm hover:shadow-md relative text-[13px] font-sans">
        {/* Image */}
        <div className="relative overflow-hidden rounded-md">
          <img
            src={product.images[0]}
            alt={product.images[0]}
            className="w-full aspect-[3/4] max-h-[240px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          />
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
                {product.priceToBuyer} AED
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-1 mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="font-medium">Size</span>
              <span className="bg-green-600 text-white px-2 py-[2px] rounded text-xs">
                {product?.size}
              </span>
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
