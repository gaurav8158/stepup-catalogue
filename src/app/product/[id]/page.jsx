"use client";
import React, { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/layout";
import BackBtn from "@/components/BackBtn";

const product = {
  id: 1,
  title: "Soft Cotton Striped Straight Black Kurta Set",
  brand: "Gems Modern Academy",
  images: ["/Dress.png", "/Shirt.png"],
  price: 1847,
  originalPrice: 3997,
  discount: 53,
  rating: 4.8,
  reviews: 622,
  sizes: ["M", "L", "XL", "2XL", "3XL", "4XL"],
  description:
    "A premium cotton blend kurta set with intricate patterns and breathable fabric. Ideal for school wear and formal occasions.",
};

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        stock: product.stock,
        category: product.category,
        quantity: quantity,
      });
    }
  };
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="pb-4">
          <BackBtn text="Back To Shop" link="/" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Image section */}
          <div>
            <div className="w-full rounded overflow-hidden">
              <img
                src={activeImage}
                alt="Product"
                className="w-full object-cover aspect-[3/4] rounded-lg border"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-20 object-cover rounded border cursor-pointer ${
                    activeImage === img ? "ring-2 ring-green-700" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Info section */}
          <div>
            <div className="text-green-700 font-bold text-sm">
              {product.brand}
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mt-1">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center text-sm mt-2 text-green-700 font-medium">
              <Star size={16} fill="currentColor" className="mr-1" />
              {product.rating}{" "}
              <span className="text-gray-500 ml-1">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="mt-3 text-2xl font-bold text-green-700">
              ₹{product.price}{" "}
              <span className="text-gray-500 line-through text-lg ml-2">
                ₹{product.originalPrice}
              </span>{" "}
              <span className="text-green-600 text-base font-medium ml-2">
                -{product.discount}%
              </span>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Select Size
              </h4>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded text-sm ${
                      selectedSize === size
                        ? "bg-green-700 text-white border-green-700"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Link
                href="/cart"
                className="flex-1 py-2 flex justify-center bg-green-700 text-white rounded-md font-semibold"
              >
                <button>Add to Cart</button>
              </Link>
              <Link
                href="/cart"
                className="flex-1 flex justify-center py-2 border border-green-700 text-green-700 rounded-md font-semibold"
              >
                <button>Buy Now</button>
              </Link>
            </div>

            {/* Description */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                Product Description
              </h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
