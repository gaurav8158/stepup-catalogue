import { Undo2, X } from "lucide-react";
import React from "react";

const Cartitem = ({ item, removeItem, updateQuantity }) => {
  return (
    <div
      key={item.id}
      className="flex  relative gap-4 border p-4 rounded-md mb-4 bg-gray-50"
    >
      <button
        onClick={() => removeItem(item._id)}
        className="text-red-500 absolute -top-2 right-0 hover:text-red-700 p-2 mt-2"
        title="Remove item"
      >
        <X size={18} />
      </button>

      <img
        src={item.images[0]}
        alt={item.productName}
        className="w-28 h-36 object-cover rounded"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold  font-sans text-sm">
            {item.schoolName}
          </h3>
          <p className="text-sm text-gray-600">{item.productName}</p>
        </div>

        <div className="flex gap-4 mt-2">
          <p className="text-sm font-medium">
            Size: <span className="font-bold">{item.size}</span>
          </p>
        </div>

        <div className="mt-2">
          <p className="text-lg font-bold text-black">{item.priceToBuyer} AED </p>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
