"use client";

import Layout from "@/components/layout";
import Loadermain from "@/components/Loadermain";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const FormSkeleton = () => (
  <div className="space-y-6 px-4 container mx-auto mb-20 mt-4 w-full min-h-dvh">
    {/* Simulated form field 1 */}
    {[...Array(8)].map((_, idx) => (
      <div key={idx} className="space-y-2">
        <Skeleton className="h-4 w-24 rounded" /> {/* Label */}
        <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
      </div>
    ))}

    {/* Simulated submit button */}
    <div className="pt-4">
      <Skeleton className="h-10 w-32 rounded-md" />
    </div>
  </div>
);
export const Loader = () => (
  <div className="h-dvh w-full flex justify-center items-center">
    <Loadermain />
  </div>
);
const AuthLayoutClient = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get("id");

    if (id) {
      // Save token to localStorage
      localStorage.setItem("usertoken", id);
      const decoded = parseJwt(id);
      localStorage.setItem("user", JSON.stringify({ id: decoded.id }));

      const currentPath = window.location.pathname; // /user/add
      router.replace(currentPath); //  without query
    }

    const userData = localStorage.getItem("user");
    const userToken = localStorage.getItem("usertoken");

    // Simulate parsing user data
    const parsedUser = userData ? JSON.parse(userData) : null;

    // if (!parsedUser || !parsedUser.id) {
    //   router.push("/login");
    // } else {
    //   setLoading(false);
    // }
    if (!userToken) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router, searchParams]);

  function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  }

 
  return <Layout>{loading ? <Loader /> : <div>{children}</div>}</Layout>;
};

export default AuthLayoutClient;
