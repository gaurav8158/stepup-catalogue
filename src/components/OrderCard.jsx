import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const OrderCard = ({ order, fetchOrders }) => {
  // Format date for display
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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 space-y-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:flex-row items-start">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-sm md:text-lg text-gray-900">
            Order ID: {order?.orderId}
          </span>

          <span className="text-sm text-gray-500">
            Order Date: {formatDate(order.orderDate)}
          </span>
          {order?.trackingdetail && (
            <span>Order Details :{order?.trackingdetail}</span>
          )}
        </div>
        <div className="flex gap-2">
          <span
            className={`text-sm font-medium px-4 py-2 rounded-full border ${
              order.status === "Pending"
                ? "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border-orange-200"
                : order.status === "Delivered"
                ? "bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200"
                : order.status === "Cancelled"
                ? "bg-gradient-to-r from-red-100 to-red-50 text-red-700 border-red-200"
                : "bg-gray-100 text-gray-600 border-gray-300"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Buyer Information Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <HiLocationMarker className="text-gray-500 w-5 h-5" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
              Delivery Address
            </h4>
            <div className="space-y-1 text-sm text-gray-700">
              <p className="font-medium">{order.buyerName}</p>
              <p className="text-gray-600">{order.buyerMobile}</p>
              <p className="text-gray-600">{order.buyerEmail}</p>
              <p className="text-gray-600 leading-relaxed">
                {order.buyerAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Information */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
          Order Items
        </h4>
        <div className="space-y-3">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                {item.images && (
                  <div className="flex-shrink-0">
                    <img
                      src={item?.images[0]}
                      alt={item.name || "Product"}
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900 text-base leading-tight">
                      {item.productName || "Product Name"}
                    </h5>
                    {item.schoolName && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.schoolName}
                      </p>
                    )}
                    {item.size && (
                      <p className="text-sm text-gray-500 mt-1">
                        Size: {item.size}
                      </p>
                    )}
                  </div>
                  {item.price && (
                    <div className="flex flex-col mt-2">
                      <span className="text-sm text-gray-500">Item Price</span>
                      <span className="text-lg font-bold text-gray-900">
                        {item.price} AED
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No items found in this order
            </div>
          )}
        </div>
      </div>

      {/* Total Amount Section */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">
            Total Amount:
          </span>
          <span className="text-2xl font-bold text-green-600">
            {order.totalAmount} AED
          </span>
        </div>
      </div>

      {/* Order Metadata */}
      <div className="pt-2 border-t border-gray-100"></div>
    </div>
  );
};

export default OrderCard;
