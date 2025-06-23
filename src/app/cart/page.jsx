"use client";
import { Trash2, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const CartPage = () => {
  const [showForm, setShowForm] = useState(false);
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
      brand: "Mast & Harbour",
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
      brand: "Highlander",
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
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <Link
              href="/"
              className="bg-orange-600 hover:bg-orange-600 text-white px-6 py-2 rounded"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg mb-4">
              {cartItems.length} Items in Cart
            </h2>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex relative gap-4 border p-4 rounded-md mb-4 bg-gray-50"
            >
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 absolute -top-2 hover:text-red-700 p-2 mt-2"
                  title="Remove item"
                >
                  <X size={18} />
                </button>
              </div>

              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-36 object-cover rounded"
              />

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs bg-green-200 text-green-800 font-bold px-2 py-0.5 rounded-full mr-2">
                    NEW
                  </span>
                  <h3 className="text-lg font-semibold">{item.brand}</h3>
                  <p className="text-sm text-gray-600">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Sold by: <span className="text-blue-600">STEP UP</span>
                  </p>
                </div>

                <div className="flex gap-4 mt-2">
                  <p className="text-sm font-medium">
                    Size: <span className="font-bold">{item.size}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Qty:</span>
                    <button
                      onClick={() => updateQuantity(item.id, "dec")}
                      className="w-6 h-6 border rounded hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, "inc")}
                      className="w-6 h-6 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-lg font-bold text-black">
                    ₹{item.price}
                    <span className="line-through ml-2 text-gray-400 text-xs">
                      ₹{item.mrp}
                    </span>
                    <span className="text-[#FF6800] text-xs ml-2">
                      ₹{item.discount} OFF
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">7 days</span> return
                    available
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 bg-white p-4 rounded shadow">
          <h2 className="font-bold text-lg mb-4">
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
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Proceed to Buy
              </button>
            )}

            {showForm && (
              <form
                onSubmit={handleSubmit}
                className="bg-white   mt-4 space-y-4"
              >
                <h2 className="text-lg font-bold">Enter a Delivery Address</h2>

                <div>
                  <label className="block text-sm font-medium">
                    Country/Region
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="India">India</option>
                    {/* Add more countries if needed */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Full name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="First and Last name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Mobile number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="May be used to assist delivery"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="6 digits [0-9] PIN code"
                    value={form.pincode}
                    onChange={handleChange}
                    pattern="[0-9]{6}"
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Flat, House no., Building, Company, Apartment
                  </label>
                  <input
                    type="text"
                    name="flat"
                    value={form.flat}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Area, Street, Sector, Village
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="E.g. near Apollo hospital"
                    value={form.landmark}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Town/City</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-green-600 w-full text-white px-6 py-3 rounded hover:bg-green-700"
                >
                  Place Order
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
