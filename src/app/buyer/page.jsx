"use client";
import React, { useState } from "react";
import OrderCard from "@/components/OrderCard";
import Layout from "@/components/layout";
import BackBtn from "@/components/BackBtn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
const dummyOrders = [
  {
    orderId: "CTH-89765",
    from: "Illinois, United States",
    to: "George’s House, Indonesia",
    estimated: "28 May 2024",
    status: "On Deliver",
    total: 849000,
    items: [
      {
        name: "Japan Green Outer",
        price: 399000,
        qty: 1,
        size: "M",
        image: "/Shirt.png",
      },
      {
        name: "White off jacket 2024",
        price: 450000,
        qty: 1,
        size: "M",
        image: "/Dress.png",
      },
    ],
  },

];

const OrdersPage = () => {
  const [orders, setOrders] = useState(dummyOrders);

  return (

    <div className="container mx-auto px-4 py-6">
      <Link href="/buyer/support">
        <Button
          variant="secondary"
          size="icon"
          className="size-8 fixed bottom-4 right-4 border  border-green-800 text-green-800"
        >
          <Headphones />
        </Button>
      </Link>
      <div className="flex items-center gap-2 mb-6">
        {" "}
        <BackBtn text="Back" link="/" />{" "}
        <h1 className="text-2xl font-semibold ">My Orders</h1>
      </div>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <img src="/NoOrder.svg" alt="No Orders" className="w-60 mb-4" />
          <p className="text-gray-600">You have no orders yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      )}
    </div>

  );
};

export default OrdersPage;
