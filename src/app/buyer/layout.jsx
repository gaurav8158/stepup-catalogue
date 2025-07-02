"use client";
import Layout from "@/components/layout";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const LayoutWrapper = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const verifyUserToken = async () => {
      const token = localStorage.getItem("usertoken");

      if (!token) {
        // No token → redirect to login
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ token }), // fallback for backend check
          }
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          // Token invalid or expired → clear localStorage and redirect
          localStorage.removeItem("usertoken");
          localStorage.removeItem("user");
          router.push("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("usertoken");
        localStorage.removeItem("user");
        router.push("/login");
      }
    };

    verifyUserToken();
  }, [router]);

  return (
    <Layout>
      <div>{children}</div>
    </Layout>
  );
};

export default LayoutWrapper;
