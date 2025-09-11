// "use client";

// import * as React from "react";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { ArrowUpDown } from "lucide-react";

// export function SortDrawer({ onApplySort }) {
//   const [sortBy, setSortBy] = React.useState("recommended");

//   return (
//     <Drawer>
//       <DrawerTrigger asChild>
//         <button className="w-1/2   flex items-center justify-center gap-1 py-4 md:py-1 border-1 border-gray md:shadow-sm md:rounded-md hover:text-green-800 transition">
//           <ArrowUpDown size={16} />
//           Sort by
//         </button>
//       </DrawerTrigger>

//       <DrawerContent>
//         <div className="mx-auto w-full max-w-sm px-4 py-2">
//           {/* Header */}
//           <DrawerHeader className="w-full flex flex-row justify-start item-start p-0">
//             <DrawerTitle className="text-base font-semibold">
//               Sort by:
//             </DrawerTitle>
//           </DrawerHeader>

//           {/* Options */}
//           <div className="space-y-4 py-4">
//             {[
//               { label: "Recommended", value: "recommended" },
//               { label: "Price: Low to High", value: "lowToHigh" },
//               { label: "Price: High to Low", value: "highToLow" },
//             ].map((option) => (
//               <label
//                 key={option.value}
//                 className="flex items-center gap-3 text-sm cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="sortBy"
//                   value={option.value}
//                   checked={sortBy === option.value}
//                   onChange={() => setSortBy(option.value)}
//                   className="accent-green-700 "
//                 />
//                 <span>{option.label}</span>
//               </label>
//             ))}
//           </div>

//           {/* Footer */}
//           <DrawerFooter className="flex gap-4 pt-4 justify-between w-full flex-row px-0">
//             <DrawerClose asChild>
//               <button className="w-1/2 py-2 border border-green-700 text-green-700 rounded-md">
//                 Close
//               </button>
//             </DrawerClose>

//             <DrawerClose asChild>
//               <button
//                 onClick={() => {
//                   onApplySort?.(sortBy);
//                 }}
//                 className="w-1/2 py-2 bg-green-700 text-white rounded-md"
//               >
//                 Apply
//               </button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// }



"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowUpDown } from "lucide-react";

/**
 * SortDrawer Component
 * @param {object} props
 * @param {function} props.onApplySort - Callback function to apply the selected sort option.
 * @param {string} props.currentSort - The currently active sort option, passed from URL params.
 */
export function SortDrawer({ onApplySort, currentSort }) {
  // Internal state to manage selection while the drawer is open.
  // It's initialized with the current sort value from the parent/URL.
  const [sortBy, setSortBy] = React.useState(currentSort || "recommended");

  // This effect ensures that if the prop changes (e.g., via browser back/forward),
  // the internal state of the drawer is updated to match.
  React.useEffect(() => {
    setSortBy(currentSort || "recommended");
  }, [currentSort]);

  const sortOptions = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: Low to High", value: "lowToHigh" },
    { label: "Price: High to Low", value: "highToLow" },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-1/2 flex items-center justify-center gap-1 py-4 md:py-1 border-gray-200 border md:shadow-sm md:rounded-md hover:text-green-800 transition">
          <ArrowUpDown size={16} />
          Sort by
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-4 py-2">
          <DrawerHeader className="w-full flex flex-row justify-start item-start p-0">
            <DrawerTitle className="text-base font-semibold">
              Sort by:
            </DrawerTitle>
          </DrawerHeader>

          <div className="space-y-4 py-4">
            {sortOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 text-sm cursor-pointer"
              >
                <input
                  type="radio"
                  name="sortBy"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={() => setSortBy(option.value)}
                  className="w-4 h-4 accent-green-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <DrawerFooter className="flex gap-4 pt-4 justify-between w-full flex-row px-0">
            <DrawerClose asChild>
              <button className="w-1/2 py-2 border border-green-700 text-green-700 rounded-md">
                Close
              </button>
            </DrawerClose>

            <DrawerClose asChild>
              <button
                onClick={() => {
                  onApplySort?.(sortBy);
                }}
                className="w-1/2 py-2 bg-green-700 text-white rounded-md"
              >
                Apply
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
