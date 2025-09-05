"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cartitem from "./cartitem";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import Layout from "@/components/layout";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [productDetails, setProductDetails] = React.useState([]);
  const [quotes, setQuotes] = useState("");
  const route = useRouter();

  React.useEffect(() => {
    if (!cart || cart.length === 0) {
      setProductDetails([]);
      return;
    }
    const fetchDetails = async () => {
      try {
        const details = await Promise.all(
          cart.map(async (cartItem) => {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL}/products/${cartItem._id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
                },
              }
            );
            return {
              ...response.data.product,
              quantity: 1,
            };
          })
        );
        setProductDetails(details);
      } catch (error) {
        setProductDetails([]);
      }
    };
    fetchDetails();
  }, [cart]);
  useEffect(() => {
    fetchQuotes();
  }, []);
  const fetchQuotes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotes`);
      const data = await res.json();

      if (res.ok) {
     

        // Find the quote with tag === "For Seller"
        const sellerQuote = data.find((item) => item.tag === "For Add to Cart");

        if (sellerQuote) {
          setQuotes(sellerQuote.quoteText);
        }
      } else {
        console.error("Fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Error fetching quotes:", err);
    }
  };
  const safeCartItems2 = productDetails || [];
  const totalMRP = safeCartItems2.reduce(
    (acc, item) => acc + item.priceToBuyer * (item.quantity || 1),
    0
  );
  const totalDiscount = safeCartItems2.reduce(
    (acc, item) => acc + item.priceToBuyer,
    0
  );
  const platformFee = 40;

  const totalAmount = safeCartItems2.reduce(
    (acc, item) => acc + item.priceToBuyer * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    const userData = localStorage.getItem("user");
    if (!userData || userData?.id) {
      toast.error("please login before place order");
      route.push("/login");
      return;
    }
    route.push("/checkout");
  };
  if (cart.length === 0) {
    return (
      <Layout>
        <div className="p-4 font-sans md:p-8 bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white p-8 rounded-md shadow">
              <div className="flex justify-center mb-6">
                <ShoppingCart className="w-20 h-20 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Hey, it feels so light!
              </h2>
              <p className="text-gray-600 mb-6">
                There is nothing in your bag. Let's add some items.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/"
                  className="bg-orange-600 flex items-center hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-all duration-300 gap-2 font-semibold"
                >
                  <ShoppingBag className="w-5 h-5" /> Continue Shopping
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="p-4 md:p-8 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1 ">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl sm:text-3xl sm:mb-4">
                {/* {cartItems.length} Items in Cart  */}
                Shopping Cart
              </h2>
            </div>
            {quotes && (
                <div className="mb-4 rounded-xl bg-blue-50 border border-blue-200 p-4 shadow-sm">
                  <h2 className="md:text-lg font-semibold text-blue-800 mb">
                    {quotes}
                  </h2>
                </div>
              )}
            {safeCartItems2.map((item) => (
              <Cartitem
                key={item._id || item.id}
                item={item}
                removeItem={removeFromCart}
                updateQuantity={(id, type) => {
                  const cartItem = cart.find((c) => c._id === item._id);
                  if (!cartItem) return;
                  const newQty =
                    type === "inc"
                      ? cartItem.quantity + 1
                      : Math.max(1, cartItem.quantity - 1);
                  updateQuantity(item._id, newQty);
                }}
              />
            ))}
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/3  p-4 sm:border-l">
            <h2 className="font-bold text-lg pb-2 border-b mb-4">
              Price Details (
              {safeCartItems2.reduce(
                (acc, item) => acc + (item.quantity || 1),
                0
              )}{" "}
              Items)
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>{totalMRP} AED</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Discount on MRP</span>
                <span className="text-green-600">- ₹{totalDiscount}</span>
              </div> */}

              {/* <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>₹{platformFee}</span>
              </div> */}
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span>{totalAmount} AED</span>
              </div>
              <hr />

              <div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 transition-all  text-white py-[10px] rounded"
                >
                  Proceed to Buy
                </button>{" "}
                <Link href="/" className="no-underline">
                  <button className="mt-4 w-full border border-green-600 hover:bg-green-700  hover:text-white transition-all  text-green-600 py-[10px] rounded">
                    Continue Shopping{" "}
                  </button>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default CartPage;
