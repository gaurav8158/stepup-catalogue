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

export function FilterDrawer({ onApply }) {
  const [filters, setFilters] = React.useState({
    schoolName: ["DPS", "St. Xavier's", "GD Goenka", "Ryan Intl."],
    // uniformCategory: ["Core Uniform", "PE Uniform", "Winterwear"],
    gender: ["Boy", "Girl", "Unisex"],

    sizes: [
      2,
      4,
      6,
      7,
      8,
      10,
      12,
      14,
      16,
      18,
      19,
      20,
      22,
      24,
      26,
      28,
      30,
      32,
      34,
      36,
      38,
      40,
      "M",
      "XS",
      "28WX24L",
      "2-3",
      "156",
      "158",
    ],
  });
  const filterKeys = Object.keys(filters);
  const [selectedTab, setSelectedTab] = React.useState(filterKeys[0]);
  const [selected, setSelected] = React.useState(
    Object.fromEntries(filterKeys.map((key) => [key, []]))
  );
  React.useEffect(() => {
    fetchSchoolDress();
  }, []);

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
  const fetchSchoolDress = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/schoolDress`
      );
      const data = await res.json();

      if (res.ok) {
        const schoolNames = data.data
          // extract school names
          .map((item) => item.schoolName)
          // filter school without name
          .filter((item) => Boolean(item))
          // short school in alphabetical order
          .sort((a, b) => a < b);

        setFilters((prev) => ({
          ...prev,
          schoolName: schoolNames,
        }));
      } else {
        console.error("Fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Error fetching school dress data:", err);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className=" md:py-1   border-1 border-gray md:shadow-sm md:rounded-md w-1/2 flex items-center justify-center gap-1 py-4 hover:text-green-800 transition">
          <SlidersHorizontal size={16} />
          Filter
        </button>
      </DrawerTrigger>

      <DrawerContent className="h-screen">
        <div className="mx-auto w-full  max-w-xl px-2 py-2">
          {/* Header */}
          <DrawerHeader className="p-0 pb-2 flex items-center flex-row justify-between px-2">
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
          <div className="flex h-[65vh] overflow-y-auto border-t border-gray-200">
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
            <div className="w-2/3 p-4 pb-20 overflow-y-auto">
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
          <DrawerFooter className="flex mx-auto w-full  max-w-xl flex-row gap-4 pt-4  absolute bottom-0 left-0 right-0 bg-white border-t">
            <DrawerClose asChild className="flex-1">
              <button className="py-2 border border-green-600 text-green-600 rounded-md">
                Close
              </button>
            </DrawerClose>

            <DrawerClose asChild className="flex-1">
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
