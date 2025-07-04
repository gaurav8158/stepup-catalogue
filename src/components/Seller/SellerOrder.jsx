import React from "react";
import { FaTruck } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { ConveyDialogue } from "./ConveyDialogue";

const SellerOrderCard = ({ order, fetchOrders }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex  flex-col gap-3 sm:flex-row justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-lg text-gray-900">
            #{order.productcode}
          </span>
          <span className="text-sm text-gray-500">Order Details</span>
        </div>
        <div className="flex gap-2 ">
          {order.isConvey === "Pending" ? (
            <div className="flex-shrink-0">
              <ConveyDialogue
                amount={order.priceToSeller}
                orderId={order._id}
                fetchOrders={fetchOrders}
              />
            </div>
          ) : (
            ""
          )}

          <span className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 text-sm font-medium px-4 py-2 rounded-full border border-orange-200">
            {order.sellerProductStage}
          </span>
        </div>
      </div>

      {/* Seller Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <HiLocationMarker className="text-gray-500 w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Seller Information
            </h4>
            <div className="space-y-1 text-sm text-gray-700">
              <p className="font-medium">{order.senderName}</p>
              <p className="text-gray-600">{order.senderMobile}</p>
              <p className="text-gray-600 leading-relaxed">
                {order.senderAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-3  pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
          Product Details
        </h4>
        <div className="flex gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          <div className="flex-shrink-0">
            <img
              src={order?.images[0]}
              alt={order?.productName}
              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h5 className="font-semibold text-gray-900 text-base leading-tight">
                {order.productName}
              </h5>
              <p className="text-sm text-gray-500 mt-1">Size: {order.size}</p>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-sm text-gray-500">Total Amount</span>
              <span className="text-lg font-bold text-gray-900">
                AMD {order.priceToSeller}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderCard;
