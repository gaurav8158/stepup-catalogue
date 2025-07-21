"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import { useCart } from "@/context/CartContext";
import axios from "axios";
import BuyTermsAndConditionsAlert from "./TermsAndConditionsDialog";

const CartPage = () => {
  const { cart } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    comment: "",

    policyOptIn: false,
  });
  const [quotes, setQuotes] = useState("");
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    if (!cart || cart.length === 0) {
      setCartItems([]);
      return;
    }
    const fetchCartItems = async () => {
      try {
        const productDetails = await Promise.all(
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
              quantity: cartItem.quantity || 1,
            };
          })
        );
        setCartItems(productDetails);
      } catch (error) {
        setCartItems([]);
      }
    };
    fetchCartItems();
    fetchQuotes();
  }, [cart]);
  const fetchQuotes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotes`);
      const data = await res.json();

      if (res.ok) {
        console.log(data);

        // Find the quote with tag === "For Seller"
        const sellerQuote = data.find((item) => item.tag === "For Buyer");

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
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      setForm({
        fullName: user?.name || "",
        email: user.email || "",
        mobile: user?.mobile || "",
        address: user?.address || "",
        comment: "",
        policyOptIn: false,
      });
    }
  }, []);
  const router = useRouter();
  const totalMRP = cartItems.reduce((sum, item) => sum + item.mrp, 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount, 0);
  const platformFee = cartItems.reduce(
    (sum, item) => sum + item.platformFee,
    0
  );
  const totalAmount =
    cartItems.reduce((sum, item) => sum + item.price, 0) + platformFee;

  // Variable containing all cart item _id values
  const cartItemIds = cartItems.map((item) => item._id);
  // console.log("cart ", cartItemIds);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("please login to place order");
      router.push("/login");
      return;
    }
    if (!form.policyOptIn) {
      toast.error("please Agree to the Terms and Conditions");
    }
    toast.success("Order Placed Successfully!");
    console.log("Form Data:", form);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/order/place`,
        {
          userId: JSON.parse(storedUser).id,
          buyerName: form.fullName,
          buyerEmail: form.email,
          buyerMobile: form.mobile,
          buyerAddress: form.address,
          orderDate: new Date(),
          comment: form.comment,
          cartItems: cartItemIds,
        }
      );
      console.log("Order Response:", response.data);
    } catch (error) {
      console.log(error);
    }
    console.log("Cart Items:", cartItems);
    setForm({});
    localStorage.removeItem("cart");
    router.push("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center bg-white p-8 shadow rounded-md">
          <ShoppingCart className="mx-auto h-20 w-20 mb-4 text-gray-500" />
          <h2 className="text-xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">
            Add some items to continue shopping!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2 rounded-md hover:bg-orange-700"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-3 font-sans">
        <div>
          <Link
            href="/cart"
            className="flex w-[100px]  font-semibold bg-white rounded-lg  hover:bg-gray-50 shadow px-3  py-2 items-center gap-2 mb-4 text-gray-600 cursor-pointer"
          >
            <ArrowLeft /> Back
          </Link>{" "}
        </div>
        <div className="max-w-5xl  relative mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT: Delivery Address */}
          <div className="md:col-span-2 ">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-6  rounded shadow"
            >
              {quotes && (
                <div className="mb-4 rounded-xl bg-blue-50 border border-blue-200 p-4 shadow-sm">
                  <h2 className="md:text-lg font-semibold text-blue-800 mb">
                    {quotes}
                  </h2>
                </div>
              )}
              <h2 className="text-xl font-bold mb-4">
                Select Delivery Address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="custom-input-class w-full"
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                  className="custom-input-class w-full"
                />
                <input
                  type="tel"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="custom-input-class w-full"
                />

                <input
                  type="text"
                  name="comment"
                  placeholder="comment"
                  value={form.comment}
                  onChange={handleChange}
                  required
                  className="custom-input-class w-full"
                />

                <textarea
                  type="text"
                  name="address"
                  placeholder="Address (Flat, Street, etc)"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="custom-input-class col-span-2 w-full"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="policyOptIn"
                  value={form.policyOptIn}
                  onChange={handleChange}
                  name="policyOptIn"
                  className="w-4 h-4"
                  required
                />
                <label htmlFor="policyOptIn" className="text-sm">
                  I Agree to the Terms and Conditions.{" "}
                  <BuyTermsAndConditionsAlert />
                </label>
              </div>
              <button
                type="submit"
                className="bg-green-600  text-white w-full py-3 rounded font-medium hover:bg-green-700 transition"
              >
                Place Order & Pay on Delivery
              </button>
            </form>
          </div>

          {/* RIGHT: Price Details */}
          <div>
            <div className="bg-white p-6 sticky top-0 rounded shadow">
              <h2 className=" font-semibold text-gray-500 text-sm mb-4">
                Items
              </h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 relative">
                      <Image
                        className="object-cover w-full h-full rounded"
                        src={item.images ? item.images[0] : item.image}
                        alt={item.productName || item.name}
                        width={40}
                        height={50}
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-sm font-medium truncate">
                        {item.productName?.slice(0, 20) || item.name}{" "}
                      </p>

                      <p className="text-xs text-gray-500">
                        {item.priceToBuyer} AED
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-2  text-gray-600">
                Price Details (
                {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}{" "}
                Items)
              </h2>
              <div className="text-sm space-y-2">
                {/* <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>
                    AED
                    {cartItems.reduce(
                      (sum, item) =>
                        sum +
                        (item.mrp || item.priceToBuyer) * (item.quantity || 1),
                      0
                    )}
                  </span>
                </div> */}
                {/* <div className="flex justify-between text-green-600">
                  <span>Discount on MRP</span>
                  <span>
                    - ₹
                    {cartItems.reduce(
                      (sum, item) =>
                        sum + (item.discount || 0) * (item.quantity || 1),
                      0
                    )}
                  </span>
                </div> */}
                {/* <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>
                    ₹
                    {cartItems.reduce(
                      (sum, item) => sum + (item.platformFee || 0),
                      0
                    )}
                  </span>
                </div> */}
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total Amount</span>
                  <span>
                    
                    {cartItems.reduce(
                      (sum, item) =>
                        sum + (item.priceToBuyer || item.price) * 1,
                      0
                    ) +
                      cartItems.reduce(
                        (sum, item) => sum + (item.platformFee || 0),
                        0
                      )} AED
                  </span>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default CartPage;
