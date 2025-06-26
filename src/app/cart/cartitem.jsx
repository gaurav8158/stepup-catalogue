import { Undo2, X } from "lucide-react";
import React from "react";

const Cartitem = ({ item, removeItem, updateQuantity }) => {
  return (
    <div
      key={item.id}
      className="flex  relative gap-4 border p-4 rounded-md mb-4 bg-gray-50"
    >
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 absolute -top-2 right-0 hover:text-red-700 p-2 mt-2"
        title="Remove item"
      >
        <X size={18} />
      </button>

      <img
        src={item.image}
        alt={item.name}
        className="w-28 h-36 object-cover rounded"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* <span className="text-xs  bg-green-200 text-green-800 font-bold px-2 py-0.5 rounded-full mr-2">
            NEW
          </span> */}
          <h3 className="text-base font-semibold  font-sans text-sm">
            {item.school}
          </h3>
          <p className="text-sm text-gray-600">{item.name}</p>
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
            <span className="line-through ml-2 text-gray-400 text-[10px]">
              ₹{item.mrp}
            </span>
            <span className="text-[#FF6800] text-xs ml-2">
              ₹{item.discount} OFF
            </span>
          </p>
          <p className="text-sm text-gray-700 flex items-center mt-1">
            <Undo2 className="2-4 h-4" />{" "}
            <span className="font-semibold mr-1">7 days </span> return available
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
