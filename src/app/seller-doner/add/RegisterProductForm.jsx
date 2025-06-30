"use client";
import React, { useState } from "react";

const RegisterProductForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    schoolName: "",
    uniformCategory: "",
    gender: "",
    productCategory: "",
    productName: "",
    size: "",
    condition: "",
    isDefectInProduct: "",
    defectDescription: "",
    isDonated: "",
    images: [],
    senderName: "",
    senderMobile: "",
    senderAddress: "",
  });

  const [newImageUrl, setNewImageUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "isDefectInProduct" && value === "No") {
      setFormData((prev) => ({ ...prev, defectDescription: "" }));
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }));
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Product registered successfully");
        setFormData({});
        setStep(1);
      } else {
        const data = await res.json();
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto ">
      <h1 className="text-2xl font-semibold mb-6">Register Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-gray-50 p-6 rounded-2xl"
      >
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School Name */}
            <select
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Select School Name</option>
              <option value="DPS">Delhi Public School</option>
              <option value="KV">Kendriya Vidyalaya</option>
            </select>

            {/* Uniform Category */}
            <select
              name="uniformCategory"
              value={formData.uniformCategory}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Select Uniform Category</option>
              <option value="Core">Core Uniform</option>
              <option value="Winter">Winter Wear</option>
              <option value="Sports">Sports</option>
            </select>

            {/* Gender */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Select Gender</option>
              <option value="Boy">Boy</option>
              <option value="Girl">Girl</option>
              <option value="Unisex">Unisex</option>
            </select>

            {/* Product Category */}
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Select Product Category</option>
              <option value="Shirt">Shirt</option>
              <option value="Skirt">Skirt</option>
              <option value="Trousers">Trousers</option>
              <option value="T-Shirt">T-Shirt</option>
            </select>

            {/* Product Name */}
            <select
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Select Product Name</option>
              <option value="Half Sleeve Shirt">Half Sleeve Shirt</option>
              <option value="Blazer">Blazer</option>
              <option value="Track Suit">Track Suit</option>
            </select>

            {/* Size */}
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Select Size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>

            {/* Condition */}
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Select Condition</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>

            {/* Is Defect */}
            <select
              name="isDefectInProduct"
              value={formData.isDefectInProduct}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Is there any defect?</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>

            {/* Defect Description */}
            {formData.isDefectInProduct === "Yes" && (
              <textarea
                name="defectDescription"
                value={formData.defectDescription}
                onChange={handleChange}
                placeholder="Describe the defect"
                required
                className="custom-input-class md:col-span-2"
              />
            )}

            {/* Is Donated */}
            <select
              name="isDonated"
              value={formData.isDonated}
              onChange={handleChange}
              required
              className="custom-input-class"
            >
              <option value="">Is this donated?</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {/* Image URL input */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URLs
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste image URL"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 custom-input-class"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 text-sm text-green-700 border border-green-700 bg-green-50 rounded-full hover:bg-green-100"
                >
                  Add
                </button>
              </div>

              {formData.images.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {formData.images.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        className="w-20 h-20 object-cover border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              placeholder="Name"
              required
              className="custom-input-class"
            />
            <input
              name="senderMobile"
              value={formData.senderMobile}
              onChange={handleChange}
              placeholder="Mobile"
              required
              className="custom-input-class"
            />
            <textarea
              name="senderAddress"
              value={formData.senderAddress}
              onChange={handleChange}
              placeholder="Address"
              required
              className="custom-input-class md:col-span-2"
            />

            <div className="md:col-span-2 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-50 text-gray-800 shadow px-6 py-2 rounded-full hover:bg-gray-100"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterProductForm;
