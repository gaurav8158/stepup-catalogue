import React from "react";
import { FaTruck } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { ConveyDialogue } from "./ConveyDialogue";

const SellerOrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-lg">#{order.orderId}</span>
        <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full">
          {order.status}
        </span>
      </div>

      {/* Shipment Path */}
      <div className="flex gap-4 items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <FaTruck className="text-gray-400" />
          {order.from}
        </div>
        {/* <div className="text-xs">Estimated arrival: {order.estimated}</div> */}
        <div className="flex items-center gap-1">
          <HiLocationMarker className="text-gray-400" />
          {order.to}
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-3">
        <div className="flex gap-3 border rounded-lg p-3 bg-gray-50 items-center">
          <img
            src={order.items.image}
            alt={order.items.name}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex-1">
            <p className="font-medium">{order.items.name}</p>
            <p className="text-sm text-gray-500">
              AMD {order.items.price.toLocaleString()} x{order.items.qty} |{" "}
              {order.items.size}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center pt-3 border-t">
        <span className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-semibold text-gray-800">
            AMD {order.total.toLocaleString()}
          </span>
        </span>
      
        <ConveyDialogue />
      </div>
    </div>
  );
};

export default SellerOrderCard;
