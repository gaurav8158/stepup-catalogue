"use client";

import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { FilterDrawer } from "./filterdrawer";
import { SortDrawer } from "./sortdrawer";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function ProductGrid() {
  const [allProducts, setAllProducts] = useState([]); // master list
  const [filteredProducts, setFilteredProducts] = useState([]); // for filter + search
  const [sortBy, setSortBy] = useState("recommended");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchSchoolDress();
  }, []);

  const fetchSchoolDress = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/catalogue`
      );

      if (!res.ok) {
        setLoading(false);
        throw new Error("Failed to fetch school dress data");
      }

      const resData = await res.json();
      setLoading(false);

      setAllProducts(resData.products);
      setFilteredProducts(sortProducts(resData.products, sortBy));
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  const applyFilters = (filters) => {
    const {
      schoolName,
      uniformCategory,
      gender,
      itemCategory,
      subCategory,
      sizes,
    } = filters;

    const result = allProducts.filter((product) => {
      const matchesSchool =
        schoolName.length === 0 ||
        schoolName
          .map((name) => name.toLowerCase())
          .includes(product.schoolName.toLowerCase());
      // const matchesCategory =
      //   uniformCategory?.length === 0 ||
      //   uniformCategory
      //     .map((cat) => cat.toLowerCase())
      //     .includes(product.uniformCategory.toLowerCase());

      // const matchesCategory =
      //   uniformCategory?.length === 0 ||
      //   uniformCategory?.includes(product.uniformCategory);
      const matchesGender =
        gender.length === 0 || gender.includes(product.gender);

      console.log(typeof product.size, product.size);
      //       const matchesSize =
      //         sizes.length === 0 || sizes.map(String).includes(String(product.size));
      // sizes
      const matchesSize =
        sizes.length === 0 ||
        sizes
          .map((size) => String(size).toLowerCase())
          .includes(String(product.size).toLowerCase());
      return matchesSchool && matchesGender && matchesSize;
    });

    setFilteredProducts(sortProducts(result, sortBy));
  };

  const handleSort = (selectedSort) => {
    setSortBy(selectedSort);
    setFilteredProducts((prev) => sortProducts([...prev], selectedSort));
  };

  const sortProducts = (products, sortType) => {
    const sorted = [...products];
    if (sortType === "lowToHigh") {
      return sorted.sort((a, b) => a.priceToBuyer - b.priceToBuyer);
    } else if (sortType === "highToLow") {
      return sorted.sort((a, b) => b.priceToBuyer - a.priceToBuyer);
    } else {
      return sorted; // "recommended"
    }
  };

  const filteredBySearch = filteredProducts.filter((product) =>
    product.productName?.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  return (
    <div className="">
      {/* Top Bar */}
      <div className="container mx-auto p-2 sm:p-4  flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          {/* Search Icon */}
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-full bg-white text-sm text-gray-900 placeholder-gray-400 border border-gray-200 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
          />
        </div>
        <div className="fixed bottom-0 z-50 border-t sm:border-none    bg-white md:static flex w-full sm:w-auto sm:min-w-[170px]  justify-between sm:justify-end md:gap-2 ">
          <SortDrawer onApplySort={handleSort} />
          <FilterDrawer onApply={applyFilters} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-2 sm:p-4 sm:pb-20  container min-h-dvh mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {loading ? (
          [...Array(15)].map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full sm:w-[200px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full sm:w-[200px]" />
                <Skeleton className="h-4 w-[80%] sm:w-[180px]" />
              </div>
            </div>
          ))
        ) : filteredBySearch.length > 0 ? (
          filteredBySearch.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
