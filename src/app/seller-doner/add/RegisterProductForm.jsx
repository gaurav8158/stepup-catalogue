"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [schoolData, setSchoolData] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredGenders, setFilteredGenders] = useState([]);
  const [filteredItemCategories, setFilteredItemCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  useEffect(() => {
    const selectedSchool = schoolData.find(
      (s) => s.schoolName === formData.schoolName
    );
    setFilteredCategories(selectedSchool?.uniformCategories || []);
  }, [formData.schoolName]);

  useEffect(() => {
    const category = filteredCategories.find(
      (c) => c.uniformCategory === formData.uniformCategory
    );
    setFilteredGenders(category?.genders || []);
  }, [formData.uniformCategory, filteredCategories]);

  useEffect(() => {
    const genderObj = filteredGenders.find((g) => g.gender === formData.gender);
    setFilteredItemCategories(genderObj?.categories || []);
  }, [formData.gender, filteredGenders]);

  useEffect(() => {
    const itemObj = filteredItemCategories.find(
      (c) => c.itemCategory === formData.productCategory
    );
    setFilteredProducts(itemObj?.products || []);
  }, [formData.productCategory, filteredItemCategories]);

  useEffect(() => {
    const productObj = filteredProducts.find(
      (p) => p.productName === formData.productName
    );
    setFilteredSizes(productObj?.sizes || []);
  }, [formData.productName, filteredProducts]);
  // ✅ Fetch all quotes from API
  const fetchSchoolDress = async () => {
    try {
      const res = await fetch(`${BASE_URL}/schoolDress`);
      const data = await res.json();
      if (res.ok) {
        console.log(data.data);
        setSchoolData(data.data);
      } else {
        console.error("Fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Error fetching quotes:", err);
    }
  };

  useEffect(() => {
    fetchSchoolDress();
  }, []);

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
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        alert("User not found or not logged in.");
        return;
      }

      const payload = {
        ...formData,
        userId: user.id, // take userId from localStorage
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/products/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Product registered successfully!");
        setFormData({
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
        setStep(1);
      } else {
        toast.error(result?.message || "Failed to register product.");
      }
    } catch (err) {
      console.error("Product registration error:", err);
      toast.error("Something went wrong while registering the product.");
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
              {schoolData.map((item) => (
                <option key={item._id} value={item.schoolName}>
                  {item.schoolName}
                </option>
              ))}
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
              {filteredCategories.map((uc, idx) => (
                <option key={idx} value={uc.uniformCategory}>
                  {uc.uniformCategory}
                </option>
              ))}
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
              {filteredGenders.map((g, idx) => (
                <option key={idx} value={g.gender}>
                  {g.gender}
                </option>
              ))}
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
              {filteredItemCategories.map((cat, idx) => (
                <option key={idx} value={cat.itemCategory}>
                  {cat.itemCategory}
                </option>
              ))}
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
              {filteredProducts.map((prod, idx) => (
                <option key={idx} value={prod.productName}>
                  {prod.productName}
                </option>
              ))}
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
              {filteredSizes.map((size, idx) => (
                <option key={idx} value={size}>
                  {size}
                </option>
              ))}
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
