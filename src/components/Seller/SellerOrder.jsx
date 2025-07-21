import React from "react";
import { FaTruck } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { ConveyDialogue } from "./ConveyDialogue";

const SellerOrderCard = ({ order, fetchOrders }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white  rounded-xl shadow-lg border border-gray-100 p-6 space-y-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex  flex-col gap-3 sm:flex-row  items-start">
        <div className="flex flex-col  gap-1">
          <span className="font-bold text-sm md:text-lg text-gray-900">
            Product Code : {order?.productcode}
          </span>

          <span className="text-sm text-gray-500">
            Order Date: {formatDate(order?.createdAt)}
          </span>
          <span className="ext-sm text-gray-500">Order No. {order._id}</span>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
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
          <span
            className={`text-sm font-bold px-4 py-2 rounded-full border
    ${
      order.sellerProductStage === "Under Review"
        ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border-orange-200"
        : order.sellerProductStage === "Approved"
        ? "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200"
        : order.sellerProductStage === "Reject"
        ? "bg-gradient-to-r from-red-100 to-red-50 text-red-700 border-red-200"
        : "bg-red-500 hover:bg-red-600 text-white border-transparent shadow-sm transition duration-200"
    }
  `}
          >
            {order.sellerProductStage === "Reject By Seller"
              ? "Price Rejected by Seller"
              : order.sellerProductStage}
          </span>
        </div>
      </div>
      {order.sellerProductStage === "Reject By Seller" && (
        <div className="w-full">
          <span className="bg-red-100 inline-block rounded-xl px-4  text-xs sm:text-sm py-2 text-red-800">
            As per agreed T&C, please get the Uniform picked up from our office
            within two working days.
          </span>
        </div>
      )}
      {/* Seller Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <HiLocationMarker className="text-gray-500 w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Pickup Address
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
            {order.priceToSeller && (
              <div className="flex flex-col mt-2">
                <span className="text-sm text-gray-500">Total Amount</span>
                <span className="text-lg font-bold text-gray-900">
                   {order.priceToSeller} AED
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderCard;
