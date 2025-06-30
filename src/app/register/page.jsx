"use client";
import Link from "next/link";
import React, { useState } from "react";

const RegisterUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("User registered successfully!");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          address: "",
          password: "",
          role: "Buyer",
        });
      } else {
        alert(data?.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-dvh flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/logo.png"
          className="mx-auto h-12 w-auto"
        />
        <h2 className="mt-3 font-sans text-center text-2xl font-bold tracking-tight text-gray-900">
          Register Your Account
        </h2>
      </div>

      <div className="mt-10 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6  gap-y-3 md:gap-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 w-full custom-input-class"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Mobile <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="mt-2 w-full custom-input-class"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full custom-input-class"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-2 w-full custom-input-class"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full custom-input-class"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Role <span className="text-red-600">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full custom-input-class"
            >
              {" "}
              <option value="">Select Role</option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Link href="seller-doner">
              <button
                type="submit"
                className="w-full mt-4 rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Register
              </button>{" "}
            </Link>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-green-600 hover:text-green-500"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterUserForm;
