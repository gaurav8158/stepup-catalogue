"use client";

import React, { useState } from "react";
import { ShoppingCart, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import { useCart } from "@/context/CartContext";
import axios from "axios";

const CartPage = () => {
  const { cart } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [cartItems, setCartItems] = useState([]);
  React.useEffect(() => {
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
              deliveryDate: cartItem.deliveryDate || "3 days from now",
            };
          })
        );
        setCartItems(productDetails);
      } catch (error) {
        setCartItems([]);
      }
    };
    fetchCartItems();
  }, [cart]);
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
  const cartItemIds = cartItems.map(item => item._id);
  // console.log("cart ", cartItemIds);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Order Placed Successfully!");
    console.log("Form Data:", form);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/order/place`, {
        buyerName: form.fullName,
        buyerEmail: form.email,
        buyerMobile: form.mobile,
        buyerAddress: form.address,
        orderDate: new Date(),
        comment: "ss",
        cartItems: cartItemIds,
      })
      console.log("Order Response:", response.data);
    } catch (error) {
      console.log(error)
    }
    console.log("Cart Items:", cartItems);
    setForm({});
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
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="custom-input-class w-full"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="custom-input-class w-full"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  pattern="[0-9]{6}"
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
                Delivery Estimates
              </h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item._id || item.id} className="flex items-center gap-3">
                    <Image
                      src={item.images ? item.images[0] : item.image}
                      alt={item.productName || item.name}
                      width={40}
                      height={50}
                    />
                    <div>
                      <p className="text-sm font-medium truncate">
                        {item.productName || item.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        delivery by {" "}
                        <span className="font-semibold">
                          {item.deliveryDate}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-2  text-gray-600">
                Price Details ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} Items)
              </h2>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>₹{cartItems.reduce((sum, item) => sum + ((item.mrp || item.priceToBuyer) * (item.quantity || 1)), 0)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount on MRP</span>
                  <span>- ₹{cartItems.reduce((sum, item) => sum + (item.discount || 0) * (item.quantity || 1), 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹{cartItems.reduce((sum, item) => sum + (item.platformFee || 0), 0)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total Amount</span>
                  <span>₹{cartItems.reduce((sum, item) => sum + ((item.priceToBuyer || item.price) * (item.quantity || 1)), 0) + cartItems.reduce((sum, item) => sum + (item.platformFee || 0), 0)}</span>
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
