"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CircleCheck,
  PackageX,
  Search,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";
import _ from "lodash";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/layout";
import BackBtn from "@/components/BackBtn";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const productNamePrefixes = /^(PE|UX) /i;

export default function ProductDetails() {
  const { addToCart } = useCart();
  const [activeProduct, setActiveProduct] = useState();
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNotaVailable, setIsNotAvailable] = useState(true);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/approved/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          }
        );
        if (response.data.product) {
          setActiveProduct(response.data.product);
          setActiveImage(response.data.product.images[0]);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error ", error);
        setIsNotAvailable(false);
        setLoading(false);
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
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const fallbackUrl = "/";
  const backurl = callbackUrl ? decodeURIComponent(callbackUrl) : fallbackUrl;

  return (
    <Layout>
      {!isNotaVailable ? (
        <Dummyui />
      ) : (
        <div className="container min-h-screen mx-auto px-4 py-6">
          {/* <BackBtn text="Back To Shop" link="/" /> */}
          <div className="text-sm text-gray-500 mb-3">
            <span>
              <Link
                href={backurl}
                className="text-green-700 font-semibold hover:underline"
              >
                Home
              </Link>{" "}
              /{" "}
            </span>
            <span className="text-gray-700 font-medium">
              {activeProduct?.productName || "Loading..."}
            </span>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Image Skeleton */}
              <div>
                <Skeleton className="w-full aspect-square rounded-xl" />
              </div>

              {/* Right: Details Skeleton */}
              <div className="flex flex-col space-y-4">
                <Skeleton className="h-6 w-[60%]" />
                <Skeleton className="h-5 w-[40%]" />
                <Skeleton className="h-5 w-[30%]" />

                <div className="flex gap-4">
                  <Skeleton className="h-10 w-[120px] rounded-md" />
                  <Skeleton className="h-10 w-[120px] rounded-md" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 md:px-16 gap-5 md:gap-8">
              {/* Left: Image Section */}
              <div className="w-full  gap-2 md:gap-10 flex flex-col md:flex-row  space-y-3">
                {/* Main Image */}
                <div className="h-[330px] md:w-[330px]  rounded-lg overflow-hidden border shadow-sm bg-gray-50">
                  <Image
                    src={activeImage || "/loadimg.png"}
                    alt="Product"
                    width={400}
                    height={500}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    priority
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="flex  flex-row md:flex-col gap-5 ">
                  {activeProduct?.images.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16  md:w-20 md:h-20 rounded-md p-1 overflow-hidden border transition-all duration-200 ${
                        activeImage === img
                          ? "ring-2 ring-green-600 scale-105"
                          : "hover:ring-1 hover:scale-105"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx}`}
                        width={64}
                        height={64}
                        priority
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {/* School Name */}
                <div className="text-green-700 font-semibold text-sm uppercase tracking-wide">
                  {activeProduct?.schoolName}
                </div>

                {/* Product Name */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {_.startCase(_.lowerCase(activeProduct?.productName)).replace(
                    productNamePrefixes,
                    (m, m1) => _.toUpper(m1 + " ")
                  )}
                </h1>

                {/* Stock Status */}
                {activeProduct?.inStock && (
                  <span className=" flex gap-2 justify-center w-24 items-center text-xs px-3 py-1 rounded-full font-medium bg-green-100 text-green-700 shadow-sm">
                    <CircleCheck className="w-4 h-4" /> In Stock
                  </span>
                )}

                {/* Product Meta Info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-2">
                  <div>
                    <span className="font-medium text-gray-800">Gender:</span>{" "}
                    <span className="text-green-700">
                      {activeProduct?.gender}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Size:</span>{" "}
                    <span className="inline-block px-2 py-[2px] rounded bg-green-700 text-white text-xs font-medium">
                      {activeProduct?.size}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-2xl md:text-3xl font-bold text-green-700 mt-3">
                  {activeProduct?.priceToBuyer} AED
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex justify-center items-center gap-2 py-2 bg-green-700 text-white rounded-md font-semibold hover:bg-green-800 transition duration-200 shadow-sm"
                  >
                    <ShoppingCart className="w-6 h-6" /> Add to Cart
                  </button>
                  <Link
                    href="/cart"
                    // onClick={handleAddToCart}
                    className="flex-1 py-2 border border-green-700 text-green-700 rounded-md font-semibold hover:bg-green-50 transition duration-200 text-center shadow-sm"
                  >
                    Buy Now
                  </Link>
                </div>

                {/* Description Section */}
                {/* <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-700">
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  Product Description
                </h3>
                <p>
                  <span className="font-medium text-gray-800">
                    Product Category:
                  </span>{" "}
                  {activeProduct?.productCategory || "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    Uniform Category:
                  </span>{" "}
                  {activeProduct?.uniformCategory || "N/A"}
                </p>

                {activeProduct?.isDefectInProduct === "Yes" && (
                  <p>
                    <span className="font-medium text-gray-800">
                      Defect Description:
                    </span>{" "}
                    {activeProduct?.defectDescription || "N/A"}
                  </p>
                )}
              </div> */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm p-4 space-y-3 text-sm text-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                    Product Description
                  </h3>

                  <p>
                    <span className="font-medium text-gray-800">
                      Product Category:
                    </span>{" "}
                    <span className="text-green-700">
                      {activeProduct?.productCategory || "N/A"}
                    </span>{" "}
                  </p>

                  <p>
                    <span className="font-medium text-gray-800">
                      Uniform Category:
                    </span>{" "}
                    <span className="text-green-700">
                      {activeProduct?.uniformCategory || "N/A"}{" "}
                    </span>
                  </p>
                  <div>
                    <span className="font-medium text-gray-800">
                      Condition:
                    </span>{" "}
                    <span className="text-green-700">
                      {activeProduct?.condition}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Defect:</span>{" "}
                    <span className="text-green-700">
                      {activeProduct?.isDefectInProduct === "Yes"
                        ? "Yes"
                        : "No"}
                    </span>
                  </div>
                  {activeProduct?.isDefectInProduct === "Yes" && (
                    <p>
                      <span className="font-medium text-gray-800">
                        Defect Description:
                      </span>{" "}
                      <span className="text-green-700">
                        {" "}
                        {activeProduct?.defectDescription || "N/A"}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

const Dummyui = () => {
  const router = useRouter();
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <PackageX className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-5 text-xl sm:text-2xl font-semibold text-gray-900">
          Product Not Available
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
          This product is currently unavailable or has been removed from our
          catalogue. Please check back later or explore similar products.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.back()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#28b083] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1ca578] cursor-pointer transition"
          >
            <Search className="w-4 h-4" />
            Browse Products
          </button>
        </div>
      </div>
    </div>
  );
};
