"use client";
import Link from "next/link";
import React, { useState } from "react";
import Cartitem from "./cartitem";
import { ShoppingBag, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const [form, setForm] = useState({
    country: "India",
    fullName: "",
    mobile: "",
    pincode: "",
    flat: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
  });
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Standard Cotton Linen Casual Shirt",
      school: "Gems Modern Academy",
      size: 40,
      price: 949,
      mrp: 2499,
      discount: 1550,
      quantity: 1,
      image: "/Dress.png",
      platformFee: 20,
    },
    {
      id: 2,
      name: "Solid Slim Fit Shirt",
      school: "Gems World Academy",
      size: 42,
      price: 899,
      mrp: 2199,
      discount: 1300,
      quantity: 1,
      image: "/Dress.png",
      platformFee: 20,
    },
  ]);

  const updateQuantity = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.mrp * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + item.discount * item.quantity,
    0
  );
  const platformFee = cartItems.reduce(
    (acc, item) => acc + item.platformFee,
    0
  );
  const totalAmount =
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
    platformFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
    console.log("Submitted Data:", form);
    console.log("Cart Items:", cartItems);
  };
  if (cartItems.length === 0) {
    return (
      <div className="p-4  font-sans md:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white p-8 rounded-md shadow">
            <div className="flex justify-center mb-6">
              <ShoppingCart className="w-20 h-20" />
            </div>

            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
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
    );
  }
  return (
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

          {cartItems.map((item) => (
            <Cartitem
              key={item.id}
              item={item}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3  p-4 sm:border-l">
          <h2 className="font-bold text-lg pb-2 border-b mb-4">
            Price Details (
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items)
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total MRP</span>
              <span>₹{totalMRP}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount on MRP</span>
              <span className="text-green-600">- ₹{totalDiscount}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
            <hr />

            <div>
              <Link href="/checkout" className="no-underline">
                <button className="mt-4 w-full bg-green-600 hover:bg-green-700 transition-all  text-white py-[10px] rounded">
                  Proceed to Buy
                </button>{" "}
              </Link>
              <Link href="/" className="no-underline">
                <button className="mt-4 w-full border border-green-600 hover:bg-green-700  hover:text-white transition-all  text-green-600 py-[10px] rounded">
                  Continue Shopping{" "}
                </button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
