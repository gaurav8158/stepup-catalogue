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
import { SlidersHorizontal } from "lucide-react";

const filters = {
  schoolName: ["DPS", "St. Xavier's", "GD Goenka", "Ryan Intl."],
  uniformCategory: ["Core Uniform", "PE Uniform", "Winterwear"],
  gender: ["Boy", "Girl"],
  itemCategory: ["Tshirt", "Skirt", "Trouser", "Shirt", "Dress", "Skort"],
  subCategory: ["Full Sleeve", "Half Sleeve", "Sleeveless"],
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
};

export function FilterDrawer({ onApply }) {
  const filterKeys = Object.keys(filters);
  const [selectedTab, setSelectedTab] = React.useState(filterKeys[0]);
  const [selected, setSelected] = React.useState(
    Object.fromEntries(filterKeys.map((key) => [key, []]))
  );

  const handleToggle = (key, value) => {
    setSelected((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value],
      };
    });
  };

  const handleClear = () => {
    setSelected(Object.fromEntries(filterKeys.map((key) => [key, []])));
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-1/2 flex items-center justify-center gap-1 py-3 hover:text-green-800 transition">
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-screen">
        <div className="mx-auto w-full  max-w-xl px-2 py-2">
          {/* Header */}
          <DrawerHeader className="flex items-center flex-row justify-between px-2">
            <DrawerTitle className="text-base font-semibold">
              Filters
            </DrawerTitle>
            <button
              onClick={handleClear}
              className="text-sm text-green-600 font-medium"
            >
              Clear All
            </button>
          </DrawerHeader>

          {/* Main layout */}
          <div className="flex max-h-[65vh] overflow-y-auto border-t border-gray-200">
            {/* Left Tabs */}
            <div className="w-1/3 bg-gray-50 border-r text-sm">
              {filterKeys.map((key) => (
                <div
                  key={key}
                  onClick={() => setSelectedTab(key)}
                  className={`px-4 py-3 border-b cursor-pointer capitalize ${
                    selectedTab === key
                      ? "bg-white font-medium text-green-600"
                      : "text-gray-700"
                  }`}
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
              ))}
            </div>

            {/* Right Checkboxes */}
            <div className="w-2/3 p-4 overflow-y-auto">
              {filters[selectedTab].map((item, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 text-sm mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected[selectedTab].includes(item)}
                    onChange={() => handleToggle(selectedTab, item)}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <DrawerFooter className="flex flex-row gap-4 pt-4">
            <DrawerClose asChild className="w-1/2">
              <button className="py-2 border border-green-600 text-green-600 rounded-md">
                Close
              </button>
            </DrawerClose>

            <DrawerClose asChild className="w-1/2">
              <button
                onClick={() => {
                  console.log("Applied Filters:", selected);
                  onApply?.(selected);
                }}
                className="w-full py-2 bg-green-600 text-white rounded-md"
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
