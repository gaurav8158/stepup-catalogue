"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import SellerOrderCard from "@/components/Seller/SellerOrder";
import BackBtn from "@/components/BackBtn";
import Link from "next/link";
import { Headphones, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderCard from "@/components/OrderCard";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [buyorders, setBuyOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("buy");
  useEffect(() => {
    fetchSellOrders();
    fetchBuyOrders();
  }, []);
  const fetchSellOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id;

      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/user/${userId}`
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Fetched products:", data.products);
        setOrders(data.products);
      } else {
        console.error("Failed to fetch buyers:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const fetchBuyOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?._id;

      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/order/userorder/${userId}`
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Fetched products:", data.orders);
        setBuyOrders(data.orders);
      } else {
        console.log("Failed to fetch buyers:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <Link href="/user/support">
        <Button
          variant="secondary"
          className="fixed bottom-4 right-4 border  border-green-800 text-green-800"
        >
          Help
          <Headphones />
        </Button>
      </Link>

      <div className="flex justify-between flex-col md:flex-row gap-2 md:gap-0 mb-4 ">
        <div className="flex items-center gap-2">
          {" "}
          <BackBtn text="Back" link="/" />
          <h1 className="text-2xl font-semibold ">My Orders</h1>
        </div>
        <Link href="/user/add">
          <button className="text-sm flex gap-2 items-center text-green-700 border border-green-700 bg-green-50 rounded-full px-6 py-2 font-semibold ">
            Sell/Donate Uniform
          </button>{" "}
        </Link>
      </div>
      {/* Tab Buttons */}
      <div className="flex gap-4 border-b pb-2">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "buy"
              ? "text-green-700 border-b-2 border-green-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("buy")}
        >
          Buy Orders
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "sell"
              ? "text-green-700 border-b-2 border-green-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("sell")}
        >
          Sell Orders
        </button>
      </div>
      {activeTab === "sell" ? (
        orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <img src="/noorder.svg" alt="No Orders" className="w-60 mb-4" />
            <p className="text-gray-600">You have no orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders?.map((order, index) => (
              <SellerOrderCard
                key={index}
                order={order}
                fetchOrders={fetchSellOrders}
              />
            ))}
          </div>
        )
      ) : buyorders?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img src="/noorder.svg" alt="No Orders" className="w-60 mb-4" />
          <p className="text-gray-600">You have no orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {buyorders?.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
