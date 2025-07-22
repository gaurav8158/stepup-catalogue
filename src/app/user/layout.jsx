"use client";

import Layout from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
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
const layout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    // Simulate parsing user data
    const parsedUser = userData ? JSON.parse(userData) : null;

    if (!parsedUser || !parsedUser.id) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  return <Layout>{loading ? <FormSkeleton /> : <div>{children}</div>}</Layout>;
};

export default layout;
