"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

export function ConveyDialogue({ orderId, fetchOrders, amount }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/isConvey/${orderId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isConvey: "Yes" }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Conveyed successfully:", data);
        fetchOrders();
        setOpen(false);
      } else {
        console.error("Error conveying:", data.error);
      }
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleReject = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/catalogue/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sellerProductStage: "Reject By Seller",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        fetchOrders();
        setOpen(false);
      } else {
        toast.error("failed to move", data.error);
      }
    } catch (err) {
      toast.error("Request failed:", err);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-green-700 bg-green-50 rounded-full px-6 py-2 font-semibold hover:bg-green-100 transition"
        >
          Convey Price
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm: Convey the price?</AlertDialogTitle>
          <AlertDialogDescription>
            The order, valued at AMD {amount}, will be marked as{" "}
            <strong>"Confirmed"</strong> for conveyance.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={handleReject} disabled={loading} variant="outline">
            Reject
          </Button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
          >
            Confirm
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
