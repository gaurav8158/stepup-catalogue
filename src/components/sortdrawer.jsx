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

export function SortDrawer({ onApplySort }) {
  const [sortBy, setSortBy] = React.useState("recommended");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-1/2 flex items-center justify-center gap-1 py-3 hover:text-green-800 transition">
          <ArrowUpDown size={16} />
          Sort by
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-4 py-2">
          {/* Header */}
          <DrawerHeader className="w-full flex flex-row justify-start item-start">
            <DrawerTitle className="text-base font-semibold">
              Sort by:
            </DrawerTitle>
          </DrawerHeader>

          {/* Options */}
          <div className="space-y-4 py-4">
            {[
              { label: "Recommended", value: "recommended" },
              { label: "Price: Low to high", value: "lowToHigh" },
              { label: "Price: High to low", value: "highToLow" },
            ].map((option) => (
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
                  className="accent-green-700 "
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          {/* Footer */}
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
