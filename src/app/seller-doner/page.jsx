"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import SellerOrderCard from "@/components/Seller/SellerOrder";
import BackBtn from "@/components/BackBtn";
import Link from "next/link";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
const dummyOrders = [
  {
    orderId: "CTH-89765",
    from: "Illinois, United States",
    to: "George’s House, Indonesia",
    estimated: "28 May 2024",
    status: "On Deliver",
    total: 849000,
    items: {
      name: "Japan Green Outer",
      price: 399000,
      qty: 1,
      size: "M",
      image: "/Shirt.png",
    },
  },
  // You can add more orders here
];

const OrdersPage = () => {
  const [orders, setOrders] = useState([]); // start with empty array

  useEffect(() => {
   
    fetchOrders();
  }, []);
   const fetchOrders = async () => {
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

  return (
    <div className="container mx-auto px-4 py-6">
      {/* <div>
        <BackBtn text="Back To Catalogue" link="/" />
      </div> */}
      <Link href="/seller-doner/support">
        <Button
          variant="secondary"
          size="icon"
          className="size-8 fixed bottom-4 right-4 border  border-green-800 text-green-800"
        >
          <Headphones />
        </Button>
      </Link>
      <div className="flex justify-between mb-6 mt-4">
        <div className="flex items-center gap-2">
          {" "}
          <BackBtn text="Back" link="/" />
          <h1 className="text-2xl font-semibold ">My Orders</h1>
        </div>
        <Link href="/seller-doner/add">
          <button className="text-sm text-green-700 bg-green-50 rounded-full px-6 py-2 font-semibold ">
            Add Product
          </button>{" "}
        </Link>
      </div>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img src="/NoOrder.svg" alt="No Orders" className="w-60 mb-4" />
          <p className="text-gray-600">You have no orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
         
           <SellerOrderCard key={index} order={order} fetchOrders={fetchOrders}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
