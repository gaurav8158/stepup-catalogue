"use client";
import ProductCard from "./ProductCard";
import { FilterDrawer } from "./filterdrawer";
import { SortDrawer } from "./sortdrawer";
import { useState } from "react";

const allProducts = [
  {
    id: 1,
    image: "/images/product1.png",
    brand: "Step Up",
    title: "Cotton Linen Placement Print Straight Set",
    rating: 4.7,
    reviews: 316,
    price: 1298,
    originalPrice: 2498,
    discount: 48,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    schoolName: "DPS",
    uniformCategory: "Core Uniform",
    gender: "Girl",
    itemCategory: "Dress",
    subCategory: "Full Sleeve",
  },
  {
    id: 2,
    image: "/images/product2.png",
    brand: "Step Up",
    title: "Soft Cotton Striped Straight Black",
    rating: 4.8,
    reviews: 622,
    price: 1847,
    originalPrice: 3997,
    discount: 53,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    schoolName: "St. Xavier's",
    uniformCategory: "Winterwear",
    gender: "Girl",
    itemCategory: "Shirt",
    subCategory: "Half Sleeve",
  },
  {
    id: 3,
    image: "/images/product3.png",
    brand: "Step Up",
    title: "Girls School Uniform Cotton Dress",
    rating: 4.5,
    reviews: 158,
    price: 899,
    originalPrice: 1299,
    discount: 31,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    schoolName: "Ryan Intl.",
    uniformCategory: "PE Uniform",
    gender: "Girl",
    itemCategory: "Dress",
    subCategory: "Sleeveless",
  },
  {
    id: 4,
    image: "/images/product4.png",
    brand: "Step Up",
    title: "Boys Knee-Length Casual Shorts",
    rating: 4.2,
    reviews: 93,
    price: 599,
    originalPrice: 899,
    discount: 33,
    sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    schoolName: "GD Goenka",
    uniformCategory: "PE Uniform",
    gender: "Boy",
    itemCategory: "Shorts",
    subCategory: "Half Sleeve",
  },
  {
    id: 5,
    image: "/images/product5.png",
    brand: "Step Up",
    title: "Regular Fit Cotton Pants for Kids",
    rating: 4.6,
    reviews: 203,
    price: 749,
    originalPrice: 1299,
    discount: 42,
    sizes: ["2XL", "3XL", "4XL", "5XL", "6XL", "7XL"],
    schoolName: "DPS",
    uniformCategory: "Winterwear",
    gender: "Boy",
    itemCategory: "Trouser",
    subCategory: "Full Sleeve",
  },
  {
    id: 6,
    image: "/images/product6.png",
    brand: "Step Up",
    title: "Slim Fit School Trousers – Grey",
    rating: 4.3,
    reviews: 141,
    price: 999,
    originalPrice: 1699,
    discount: 41,
    sizes: ["M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    schoolName: "St. Xavier's",
    uniformCategory: "Core Uniform",
    gender: "Boy",
    itemCategory: "Trouser",
    subCategory: "Full Sleeve",
  },
  {
    id: 7,
    image: "/images/product7.png",
    brand: "Step Up",
    title: "Soft Cotton Pleated Skirt – Navy Blue",
    rating: 4.4,
    reviews: 121,
    price: 679,
    originalPrice: 1099,
    discount: 38,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
    schoolName: "Ryan Intl.",
    uniformCategory: "Core Uniform",
    gender: "Girl",
    itemCategory: "Skirt",
    subCategory: "Half Sleeve",
  },
  {
    id: 8,
    image: "/images/product8.png",
    brand: "Step Up",
    title: "Girls Party Wear Skirt & Top Combo",
    rating: 4.9,
    reviews: 301,
    price: 1347,
    originalPrice: 2399,
    discount: 44,
    sizes: ["M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    schoolName: "GD Goenka",
    uniformCategory: "Core Uniform",
    gender: "Girl",
    itemCategory: "Skort",
    subCategory: "Sleeveless",
  },
];

export default function ProductGrid() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [sortBy, setSortBy] = useState("recommended");
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
        sizes.length === 0 ||
        product.sizes.some((size) => sizes.includes(size));

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
    if (sortType === "lowToHigh") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortType === "highToLow") {
      return products.sort((a, b) => b.price - a.price);
    } else {
      return products; // "recommended"
    }
  };
  return (
    <div>
      <div className="flex w-full divide-x border-b border-gray-200 bg-white text-sm text-gray-800 font-medium">
        {/* Sort by */}
        <SortDrawer onApplySort={handleSort} />
        {/* Filter */}

        <FilterDrawer onApply={applyFilters} />
      </div>
      <div className="p-4 bg-green-50 container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
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
