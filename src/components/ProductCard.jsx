// import Link from "next/link";
// import _ from "lodash";
// import { usePathname, useSearchParams } from "next/navigation";

// const productNamePrefixes = /^(PE|UX) /i;

// export default function ProductCard({ product }) {
//   const productName = _.startCase(_.lowerCase(product.productName)).replace(
//     productNamePrefixes,
//     (m, m1) => _.toUpper(m1 + " ")
//   );
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const returnUrl = `${pathname}?${searchParams.toString()}`;
//   const encodedReturnUrl = encodeURIComponent(returnUrl);
//   // const hrefWithCallback = `/product/${product._id}?callbackUrl=${encodeURIComponent(returnUrl)}`;
//   const hrefWithCallback = `/product/${product._id}?callbackUrl=${encodedReturnUrl}`;

//   return (
//     <Link
//       href={product?.inStock ? hrefWithCallback : ""}
//       className={`no-underline ${product?.inStock ? "" : "opacity-60"}`}
//     >
//       <div className="bg-white group rounded-md overflow-hidden shadow-sm hover:shadow-md relative text-[13px] font-sans">
//         {/* Image */}
//         <div className="relative overflow-hidden bg-gray-100 rounded-t-md">
//           <img
//             src={product.images[0]}
//             alt={product.images[0]}
//             className="w-full aspect-[3/4] max-h-[240px] object-contain transition-transform duration-300 ease-in-out hover:scale-105"
//           />
//         </div>

//         {/* Info */}
//         <div className="p-3 space-y-1">
//           <div className="font-semibold text-green-800 truncate">
//             {product.schoolName}
//           </div>
//           <div className="flex items-center justify-between mt-1">
//             <div className="text-[12px] text-gray-600 truncate">
//               {product?.uniformCategory}
//             </div>
//           </div>

//           <div className="flex items-center truncate justify-between mt-1 gap-3">
//             <span className="text-[13px] truncate font-medium text-gray-800">
//               {productName}
//             </span>
//             {/* Simply remove 'truncate' from this div */}
//             <div className="text-right">
//               <div className="text-[13px] font-semibold text-gray-800">
//                 {product.priceToBuyer} AED
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-wrap justify-between gap-1 mt-2">
//             <div className="flex items-center gap-2 text-sm text-gray-700">
//               <span className="font-medium">Size</span>
//               <span className="bg-green-600 text-white px-2 py-[2px] rounded text-xs">
//                 {product?.size}
//               </span>
//             </div>

//             {!product?.inStock && (
//               <div className="text-[11px] text-gray-500">
//                 <span
//                   className={`${
//                     product?.inStock
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   } text-green-600 px-2 rounded-3xl font-semibold`}
//                 >
//                   {product?.inStock ? "In Stock" : "Out of Stock"}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>{" "}
//     </Link>
//   );
// }




import Link from "next/link";
import _ from "lodash";
import { usePathname, useSearchParams } from "next/navigation";

const productNamePrefixes = /^(PE|UX) /i;

export default function ProductCard({ product }) {
  const productName = _.startCase(_.lowerCase(product.productName)).replace(
    productNamePrefixes,
    (m, m1) => _.toUpper(m1 + " ")
  );
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = `${pathname}?${searchParams.toString()}`;
  const encodedReturnUrl = encodeURIComponent(returnUrl);
  const hrefWithCallback = `/product/${product._id}?callbackUrl=${encodedReturnUrl}`;

  // This wrapper prevents the "Link" behavior if out of stock
  const CardWrapper = ({ children }) => {
    if (!product?.inStock) {
      return <div className="no-underline block cursor-default">{children}</div>;
    }
    return (
      <Link href={hrefWithCallback} className="no-underline block transition-all duration-200 hover:-translate-y-1">
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      <div className="bg-white group rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 relative text-[13px] font-sans h-full flex flex-col">
        
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-[4/5]">
          <img
            src={product.images[0]}
            alt={productName}
            className={`w-full h-full object-contain transition-transform duration-500 ease-in-out ${
              product?.inStock ? "group-hover:scale-105" : "grayscale opacity-70"
            }`}
          />
          
          {/* Professional Out of Stock Overlay */}
          {!product?.inStock && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                 <span className="bg-white/90 backdrop-blur-sm text-red-600 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm border border-red-100">

                OUT OF STOCK

              </span>
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start gap-2 mb-2">
            <span className="font-bold text-green-900 text-[10px] uppercase tracking-wider truncate bg-green-50 px-1.5 py-0.5 rounded">
              {product.schoolName}
            </span>
            {/* Professional Size Text (Not highlighted) */}
            <span className="text-gray-500 text-[11px] shrink-0 font-medium">
              Size: <span className="text-gray-900 font-bold">{product?.size}</span>
            </span>
          </div>

          <h3 className="text-gray-700 font-medium leading-snug line-clamp-2 h-9 ">
            {productName}
          </h3>

          <div className="mt-auto flex items-center justify-between pt-1 border-t border-gray-50">
            <div className="text-[13px] text-gray-400 font-medium">
              {product?.uniformCategory}
            </div>
            
            {/* Professional Price Highlight */}
            <div className={`px-3 py-1.5 rounded-lg shadow-sm transition-colors ${
              product?.inStock ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"
            }`}>
              <span className="font-bold text-[14px]">
                {product.priceToBuyer} <small className="text-[10px] font-normal">AED</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}