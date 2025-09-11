"use client";

import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { FilterDrawer } from "./filterdrawer";
import { SortDrawer } from "./sortdrawer";
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "./ui/skeleton";
import { useSearchParams, useRouter } from "next/navigation"; // Import hooks

// Debounce helper function
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Next.js hooks for URL management
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for search input, controlled separately
  const [searchText, setSearchText] = useState(searchParams.get("search") || "");
  const debouncedSearchText = useDebounce(searchText, 500); // Debounce search input

  // Function to update URL query params
  const updateURLParams = useCallback((newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const key in newParams) {
      params.delete(key); // Clear existing values for this key
      const value = newParams[key];
      if (Array.isArray(value)) {
        value.forEach(item => params.append(key, item));
      } else if (value) {
        params.set(key, value);
      }
    }
    // Use push to navigate, which will trigger a re-render and useEffect
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);


  // Effect to fetch data whenever URL params change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Construct the API URL from the current browser URL search params
        const params = new URLSearchParams(searchParams.toString());
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/catalogue?${params.toString()}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const resData = await res.json();
        // The API now returns only visible products, so no need for client-side filtering
          const visibleProducts = resData.products.filter(
         (product) => product.isShow
      );
        setProducts(visibleProducts || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]); // This effect re-runs whenever the URL query changes

  // Effect to update URL when debounced search text changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchText) {
      params.set("search", debouncedSearchText);
    } else {
      params.delete("search");
    }
    // Use 'replace' to avoid adding every keystroke to browser history
    router.replace(`?${params.toString()}`);
  }, [debouncedSearchText, router, searchParams]);

  // Handler for applying filters from FilterDrawer
  const applyFilters = (filters) => {
    const paramsToUpdate = {};
    Object.keys(filters).forEach(key => {
        paramsToUpdate[key] = filters[key];
    });
    updateURLParams(paramsToUpdate);
  };

  // Handler for applying sort from SortDrawer
  const handleSort = (selectedSort) => {
    updateURLParams({ sort: selectedSort });
  };
  
  // Read initial filter state from URL to pass to the drawer
  const initialFilters = {
    schoolName: searchParams.getAll("schoolName") || [],
    gender: searchParams.getAll("gender") || [],
    sizes: searchParams.getAll("size") || [], // Note the key name 'size'
  };

  return (
    <div className="">
      {/* Top Bar */}
      <div className="container mx-auto p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-full bg-white text-sm text-gray-900 placeholder-gray-400 border border-gray-200 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
          />
        </div>
        <div className="fixed bottom-0 z-50 border-t sm:border-none bg-white md:static flex w-full sm:w-auto sm:min-w-[170px] justify-between sm:justify-end md:gap-2 ">
          <SortDrawer
            onApplySort={handleSort}
            currentSort={searchParams.get("sort") || "recommended"}
          />
          <FilterDrawer
            onApply={applyFilters}
            initialSelected={initialFilters}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-2 sm:p-4 sm:pb-20 container min-h-dvh mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {loading ? (
          [...Array(15)].map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((item) => (
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