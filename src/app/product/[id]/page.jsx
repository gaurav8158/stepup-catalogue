"use client";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/layout";
import BackBtn from "@/components/BackBtn";
import { useParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ProductDetails() {
  const { addToCart } = useCart();
  const [activeProduct, setActiveProduct] = useState();
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          }
        );
        console.log("response ", response.data.product);
        if (response.data.product) {
          setActiveProduct(response.data.product);
          setActiveImage(response.data.product.images[0]);
        }
      } catch (error) {
        console.log("Error ", error);
      }
    };
    fetchProductDetails();
  }, []);
  const handleAddToCart = () => {
    if (!activeProduct.inStock) {
      toast.error("Product is out of stock");
      return;
    }
    if (!activeProduct.inStock) {
      toast.error("Product is out of stock");
      return;
    }

    addToCart({
      _id: activeProduct?._id,
    });
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
              <Image
                height={400}
                width={300}
                src={activeImage || "/loadimg.png"}
                alt="Product"
                className="w-full  object-cover aspect-1 rounded-lg border"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {activeProduct?.images.map((img, idx) => (
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
              {activeProduct?.schoolName}
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mt-1">
              {activeProduct?.productName}
            </h1>

            {activeProduct?.inStock && (
              <div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold 
      ${
        activeProduct?.inStock
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
                >
                  {activeProduct?.inStock ? "In Stock" : ""}
                </span>
              </div>
            )}

            {/* Rating */}
            {/* <div className="flex items-center text-sm mt-2 text-green-700 font-medium">
              <Star size={16} fill="currentColor" className="mr-1" />
              {product.rating}{" "}
              <span className="text-gray-500 ml-1">({product.reviews})</span>
            </div> */}

            {/* Price */}
            <div className="mt-3 text-2xl font-bold text-green-700">
              AMD {activeProduct?.priceToBuyer}{" "}
            </div>

            {/* Condition */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Condition :{" "}
                <span className="text-green-700">
                  {" "}
                  {activeProduct?.condition}
                </span>
                {/* Select Size */}
              </h4>
            </div>
            {/* Gender */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Gender :{" "}
                <span className="text-green-700"> {activeProduct?.gender}</span>
                {/* Select Size */}
              </h4>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Size
                {/* Select Size */}
              </h4>
              <button
                // key={size}
                // onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded text-sm 
                   bg-green-700 text-white border-green-700
                  `}
              >
                {activeProduct?.size}
              </button>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 items-center">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2 flex justify-center bg-green-700 text-white rounded-md font-semibold"
              >
                Add to Cart
              </button>
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
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-800">
                  Product Category:
                </span>{" "}
                {activeProduct?.productCategory || "N/A"}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-800">
                  Uniform Category:
                </span>{" "}
                {activeProduct?.uniformCategory || "N/A"}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                <span className="font-medium text-gray-800">
                  Defect In Product:
                </span>{" "}
                {activeProduct?.isDefectInProduct}
              </div>
              {activeProduct?.isDefectInProduct === "Yes" && (
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium text-gray-800">
                    Defect Description:
                  </span>{" "}
                  {activeProduct?.defectDescription || "N/A"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
