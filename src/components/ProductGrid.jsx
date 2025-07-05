// "use client";
// import ProductCard from "./ProductCard";
// import { FilterDrawer } from "./filterdrawer";
// import { SortDrawer } from "./sortdrawer";
// import { useEffect, useState } from "react";

// export default function ProductGrid() {
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [sortBy, setSortBy] = useState("recommended");
//   const [searchText, setSearchText] = useState("");
//   useEffect(() => {
//     fetchSchoolDress();
//   }, []);

//   const fetchSchoolDress = async () => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/products/catalogue`
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch school dress data");
//       }

//       const resData = await res.json();
//       console.log(resData);
//       setFilteredProducts(resData.products);
//     } catch (error) {
//       console.error("Fetch error:", error);
//       return []; // fallback if error
//     }
//   };
//   const applyFilters = (filters) => {
//     const {
//       schoolName,
//       uniformCategory,
//       gender,
//       itemCategory,
//       subCategory,
//       sizes,
//     } = filters;

//     const result = allProducts.filter((product) => {
//       const matchesSchool =
//         schoolName.length === 0 || schoolName.includes(product.schoolName);

//       const matchesCategory =
//         uniformCategory.length === 0 ||
//         uniformCategory.includes(product.uniformCategory);

//       const matchesGender =
//         gender.length === 0 || gender.includes(product.gender);

//       const matchesItemCategory =
//         itemCategory.length === 0 ||
//         itemCategory.includes(product.itemCategory);

//       const matchesSubCategory =
//         subCategory.length === 0 || subCategory.includes(product.subCategory);

//       const matchesSize =
//         sizes.length === 0 ||
//         product.sizes.some((size) => sizes.includes(size));

//       return (
//         matchesSchool &&
//         matchesCategory &&
//         matchesGender &&
//         matchesItemCategory &&
//         matchesSubCategory &&
//         matchesSize
//       );
//     });

//     setFilteredProducts(sortProducts(result, sortBy));
//   };
//   const handleSort = (selectedSort) => {
//     setSortBy(selectedSort);
//     setFilteredProducts((prev) => sortProducts([...prev], selectedSort));
//   };

//   const sortProducts = (products, sortType) => {
//     if (sortType === "lowToHigh") {
//       return products.sort((a, b) => a.price - b.price);
//     } else if (sortType === "highToLow") {
//       return products.sort((a, b) => b.price - a.price);
//     } else {
//       return products; // "recommended"
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />

//         <div className="fixed sm:relative   w-full   bottom-0 right-0 left-0 z-50 sm:z-40 flex  divide-x border-y border-gray-200 bg-white text-sm text-gray-800 font-medium">
//           {/* Sort by */}
//           <SortDrawer onApplySort={handleSort} />
//           {/* Filter */}

//           <FilterDrawer onApply={applyFilters} />
//         </div>
//       </div>
//       <div className="p-4  container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
//         {filteredProducts.length > 0 ? (
//           filteredProducts?.map((item) => (
//             <ProductCard key={item._id} product={item} />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">
//             No products found.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import ProductCard from "./ProductCard";
import { FilterDrawer } from "./filterdrawer";
import { SortDrawer } from "./sortdrawer";
import { useEffect, useState } from "react";

export default function ProductGrid() {
  const [allProducts, setAllProducts] = useState([]); // master list
  const [filteredProducts, setFilteredProducts] = useState([]); // for filter + search
  const [sortBy, setSortBy] = useState("recommended");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchSchoolDress();
  }, []);

  const fetchSchoolDress = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/catalogue`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch school dress data");
      }

      const resData = await res.json();
      console.log(resData);
      setAllProducts(resData.products);
      setFilteredProducts(sortProducts(resData.products, sortBy));
    } catch (error) {
      console.error("Fetch error:", error);
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
        schoolName.length === 0 || schoolName.includes(product.schoolName);
      const matchesCategory =
        uniformCategory.length === 0 ||
        uniformCategory.includes(product.uniformCategory);
      const matchesGender =
        gender.length === 0 || gender.includes(product.gender);
      const matchesItemCategory =
        itemCategory.length === 0 ||
        itemCategory.includes(product.itemCategory);
      const matchesSubCategory =
        subCategory.length === 0 || subCategory.includes(product.subCategory);
      const matchesSize =
        sizes.length === 0 || sizes.includes(product.size); // assuming product.size is a string

      return (
        matchesSchool &&
        matchesCategory &&
        matchesGender &&
        matchesItemCategory &&
        matchesSubCategory &&
        matchesSize
      );
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
      return sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "highToLow") {
      return sorted.sort((a, b) => b.price - a.price);
    } else {
      return sorted; // "recommended"
    }
  };

  const filteredBySearch = filteredProducts.filter((product) =>
    product.productName
      ?.toLowerCase()
      .includes(searchText.trim().toLowerCase())
  );

  return (
    <div>
      {/* Top Bar */}
      <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:max-w-sm"
        />

        <div className="flex w-full sm:w-auto justify-between sm:justify-end gap-2">
          <SortDrawer onApplySort={handleSort} />
          <FilterDrawer onApply={applyFilters} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4 container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredBySearch.length > 0 ? (
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
