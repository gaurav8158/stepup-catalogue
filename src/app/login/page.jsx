"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_BASE_URL;

    try {
      const res = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("usertoken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
          router.push("/user");

        // Redirect to your protected route
      } else {
        toast.error(data?.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <div className="flex min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-3 font-sans text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full custom-input-class"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full custom-input-class"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm/6 text-gray-500">
            Not registered?{" "}
            <Link
              href="/register"
              className="font-semibold text-green-600 hover:text-green-500"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
