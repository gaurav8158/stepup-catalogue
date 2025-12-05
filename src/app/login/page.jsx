"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // 👈 using lucide-react icons

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const payload = {
      mobile: `+971${formData.mobile}`,
      password: formData.password,
    };
    try {
      const res = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("usertoken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        router.push("/user");
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

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mobile Number */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Mobile Number
              </label>
              <div className="w-full relative mt-2">
                <p className="absolute left-2 top-[9px] text-gray-600">+971</p>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full custom-input-class"
                  style={{ paddingLeft: "50px" }}
                  placeholder="Enter 9 digit number"
                />
              </div>
            </div>

            {/* Email */}
            {/* <div>
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
            </div> */}

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full custom-input-class pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className=" text-end text-sm/6 text-gray-500">
                <Link
                  href="/resetpassword"
                  className="font-semibold text-green-600 hover:text-green-500"
                >
                  Forgot Your Password ?
                </Link>
              </p>
            </div>

            {/* Submit */}
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
          {/* Added Homepage Link Here */}
          <div className="mt-2 text-center text-sm/6 text-gray-500">
            <Link
              href="/"
              className="font-semibold border border-green-600 shadow-md rounded-md px-10 py-1 text-green-600 hover:text-green-500"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
