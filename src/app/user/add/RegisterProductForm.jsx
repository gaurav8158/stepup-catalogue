"use client";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Cloudy, Upload, X } from "lucide-react";

const RegisterProductForm = () => {
  const [step, setStep] = useState(1);
  const [schoolData, setSchoolData] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredGenders, setFilteredGenders] = useState([]);
  const [filteredItemCategories, setFilteredItemCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [initialValues, setInitialValues] = useState(null);
  const [quotes, setQuotes] = useState("");
  const route = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);

      setInitialValues({
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
        senderName: user?.name || "",
        senderMobile: user?.mobile || "",
        senderAddress: user?.address || "",
        policyOptIn: false,
      });
    }
  }, []);

  // Validation schema for step 1
  const validationSchemaStep1 = Yup.object({
    schoolName: Yup.string().required("School name is required"),
    uniformCategory: Yup.string().required("Uniform category is required"),
    gender: Yup.string().required("Gender is required"),
    productCategory: Yup.string().required("Product category is required"),
    productName: Yup.string().required("Product name is required"),
    size: Yup.string().required("Size is required"),
    condition: Yup.string().required("Condition is required"),
    isDefectInProduct: Yup.string().required(
      "Please specify if there's any defect"
    ),
    defectDescription: Yup.string().when("isDefectInProduct", {
      is: "Yes",
      then: (schema) => schema.required("Please describe the defect"),
      otherwise: (schema) => schema.notRequired(),
    }),
    isDonated: Yup.string().required("Please specify if this is donated"),

    images: Yup.array()
      .min(1, "At least one image is required")
      .max(4, "You can upload a maximum of 4 images only"),
  });

  // Validation schema for step 2
  const validationSchemaStep2 = Yup.object({
    senderName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    senderMobile: Yup.string()
      .required("Mobile number is required")
      .matches(
        /^(?:50|51|52|54|55|56|58)\d{7}$/,
        "Enter a valid mobile number"
      )
      ,

    senderAddress: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
    policyOptIn: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  // Combined validation schema
  const validationSchema =
    step === 1 ? validationSchemaStep1 : validationSchemaStep2;

  // Fetch school data
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
  const fetchQuotes = async () => {
    try {
      const res = await fetch(`${BASE_URL}/quotes`);
      const data = await res.json();

      if (res.ok) {
        console.log(data);

        // Find the quote with tag === "For Seller"
        const sellerQuote = data.find((item) => item.tag === "For Seller");

        if (sellerQuote) {
          setQuotes(sellerQuote.quoteText);
        }
      } else {
        console.error("Fetch failed:", data.message);
      }
    } catch (err) {
      console.error("Error fetching quotes:", err);
    }
  };

  useEffect(() => {
    fetchQuotes();
    fetchSchoolDress();
  }, []);

  // Filter categories based on school selection
  const updateFilteredCategories = (schoolName) => {
    const selectedSchool = schoolData.find((s) => s.schoolName === schoolName);
    setFilteredCategories(selectedSchool?.uniformCategories || []);
  };

  // Filter genders based on category selection
  const updateFilteredGenders = (uniformCategory) => {
    const category = filteredCategories.find(
      (c) => c.uniformCategory === uniformCategory
    );
    setFilteredGenders(category?.genders || []);
  };

  // Filter item categories based on gender selection
  const updateFilteredItemCategories = (gender) => {
    const genderObj = filteredGenders.find((g) => g.gender === gender);
    setFilteredItemCategories(genderObj?.categories || []);
  };

  // Filter products based on category selection
  const updateFilteredProducts = (productCategory) => {
    const itemObj = filteredItemCategories.find(
      (c) => c.itemCategory === productCategory
    );
    setFilteredProducts(itemObj?.products || []);
  };

  // Filter sizes based on product selection
  const updateFilteredSizes = (productName) => {
    const productObj = filteredProducts.find(
      (p) => p.productName === productName
    );
    setFilteredSizes(productObj?.sizes || []);
  };

  // Handle image addition
  const handleAddImage = (setFieldValue, images) => {
    if (newImageUrl.trim() !== "") {
      setFieldValue("images", [...images, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  // Handle image removal
  const handleRemoveImage = (index, setFieldValue, images) => {
    const updatedImages = images?.filter((_, i) => i !== index);
    setFieldValue("images", updatedImages);
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.id) {
        toast.error("User not found or not logged in.");
        setSubmitting(false);
        return;
      }

      const payload = {
        ...values,
        userId: user.id,
        senderMobile: "+971" + values.senderMobile,
      };
     
      const res = await fetch(`${BASE_URL}/products/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Product registered successfully!");
        resetForm();
        setStep(1);
        route.push("/user");
      } else {
        toast.error(result?.message || "Failed to register product.");
      }
    } catch (err) {
      console.error("Product registration error:", err);
      toast.error("Something went wrong while registering the product.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle next step
  const handleNextStep = async (validateForm, values, setTouched) => {
    const errors = await validateForm(values);
    if (Object.keys(errors).length === 0) {
      setStep(2);
    } else {
      // Mark all fields as touched to show validation errors
      const touchedFields = {};
      Object.keys(errors).forEach((field) => {
        touchedFields[field] = true;
      });
      setTouched(touchedFields);

      // Show toast message for better UX
      toast.error("Please fill in all required fields before proceeding.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {quotes && (
        <div className="my-6 rounded-xl bg-blue-50 border border-blue-200 p-2 sm:p-6 shadow-sm">
          <h2 className="text-sm md:text-lg font-semibold text-blue-800 mb-2">
            {quotes}
          </h2>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          setFieldValue,
          isSubmitting,
          validateForm,
          errors,
          touched,
          setTouched,
        }) => (
          <Form className="space-y-6 bg-gray-50 p-3 sm:p-6 rounded-2xl">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Name */}
                <div>
                  <label
                    htmlFor="schoolName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    School Name *
                  </label>
                  <Field
                    as="select"
                    id="schoolName"
                    name="schoolName"
                    className="custom-input-class"
                    onChange={(e) => {
                      setFieldValue("schoolName", e.target.value);
                      setFieldValue("uniformCategory", "");
                      setFieldValue("gender", "");
                      setFieldValue("productCategory", "");
                      setFieldValue("productName", "");
                      setFieldValue("size", "");
                      updateFilteredCategories(e.target.value);
                    }}
                  >
                    <option value="">Select School Name</option>
                    {schoolData.map((item) => (
                      <option key={item._id} value={item.schoolName}>
                        {item.schoolName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="schoolName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Uniform Category */}
                <div>
                  <label
                    htmlFor="uniformCategory"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Uniform Category *
                  </label>
                  <Field
                    as="select"
                    id="uniformCategory"
                    name="uniformCategory"
                    className="custom-input-class"
                    onChange={(e) => {
                      setFieldValue("uniformCategory", e.target.value);
                      setFieldValue("gender", "");
                      setFieldValue("productCategory", "");
                      setFieldValue("productName", "");
                      setFieldValue("size", "");
                      updateFilteredGenders(e.target.value);
                    }}
                  >
                    <option value="">Select Uniform Category</option>
                    {filteredCategories.map((uc, idx) => (
                      <option key={idx} value={uc.uniformCategory}>
                        {uc.uniformCategory}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="uniformCategory"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Gender *
                  </label>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className="custom-input-class"
                    onChange={(e) => {
                      setFieldValue("gender", e.target.value);
                      setFieldValue("productCategory", "");
                      setFieldValue("productName", "");
                      setFieldValue("size", "");
                      updateFilteredItemCategories(e.target.value);
                    }}
                  >
                    <option value="">Select Gender</option>
                    {filteredGenders.map((g, idx) => (
                      <option key={idx} value={g.gender}>
                        {g.gender}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Product Category */}
                <div>
                  <label
                    htmlFor="productCategory"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Category *
                  </label>
                  <Field
                    as="select"
                    id="productCategory"
                    name="productCategory"
                    className="custom-input-class"
                    onChange={(e) => {
                      setFieldValue("productCategory", e.target.value);
                      setFieldValue("productName", "");
                      setFieldValue("size", "");
                      updateFilteredProducts(e.target.value);
                    }}
                  >
                    <option value="">Select Product Category</option>
                    {filteredItemCategories.map((cat, idx) => (
                      <option key={idx} value={cat.itemCategory}>
                        {cat.itemCategory}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="productCategory"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Product Name */}
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Name *
                  </label>
                  <Field
                    as="select"
                    id="productName"
                    name="productName"
                    className="custom-input-class"
                    onChange={(e) => {
                      setFieldValue("productName", e.target.value);
                      setFieldValue("size", "");
                      updateFilteredSizes(e.target.value);
                    }}
                  >
                    <option value="">Select Product Name</option>
                    {filteredProducts.map((prod, idx) => (
                      <option key={idx} value={prod.productName}>
                        {prod.productName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="productName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Size */}
                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Size *
                  </label>
                  <Field
                    as="select"
                    id="size"
                    name="size"
                    className="custom-input-class"
                  >
                    <option value="">Select Size</option>
                    {filteredSizes.map((size, idx) => (
                      <option key={idx} value={size}>
                        {size}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Condition */}
                <div>
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Condition *
                  </label>
                  <Field
                    as="select"
                    id="condition"
                    name="condition"
                    className="custom-input-class"
                  >
                    <option value="">Select Condition</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </Field>
                  <ErrorMessage
                    name="condition"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Is Defect */}
                <div>
                  <label
                    htmlFor="isDefectInProduct"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Any Defect in Product? *
                  </label>
                  <Field
                    as="select"
                    id="isDefectInProduct"
                    name="isDefectInProduct"
                    className="custom-input-class"
                    onChange={(e) => {
                      setFieldValue("isDefectInProduct", e.target.value);
                      if (e.target.value === "No") {
                        setFieldValue("defectDescription", "");
                      }
                    }}
                  >
                    <option value="">Select Option</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Field>
                  <ErrorMessage
                    name="isDefectInProduct"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Defect Description */}
                {values?.isDefectInProduct === "Yes" && (
                  <div className="md:col-span-2">
                    <label
                      htmlFor="defectDescription"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Defect Description *
                    </label>
                    <Field
                      as="textarea"
                      id="defectDescription"
                      name="defectDescription"
                      placeholder="Please describe the defect in detail"
                      className="custom-input-class"
                    />
                    <ErrorMessage
                      name="defectDescription"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                )}

                {/* Is Donated */}

                <div>
                  <div className="flex items-center gap-3 mb-4 bg-orange-50 px-4 py-2 rounded-lg shadow-sm">
                    <Image
                      src="/humanity.png"
                      alt="humanity"
                      height={28}
                      width={28}
                      className="h-7 w-7 sm:h-8 sm:w-8 "
                    />
                    <p className="text-sm md:text-xl font-semibold text-orange-600">
                      Be the Helping Hands for Humanity
                    </p>
                  </div>

                  <label
                    htmlFor="isDonated"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Is this donated? *
                  </label>
                  <Field
                    as="select"
                    id="isDonated"
                    name="isDonated"
                    className="custom-input-class"
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <ErrorMessage
                    name="isDonated"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Image URL input */}
                {/* <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URLs *
                  </label>
                  <div className="flex  flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Paste image URL"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 custom-input-class"
                    />
                    <button
                      disabled={values?.images?.length >= 4}
                      type="button"
                      onClick={() =>
                        handleAddImage(setFieldValue, values.images)
                      }
                      className="px-4 py-2 text-sm text-green-700 border border-green-700 bg-green-50 rounded-full hover:bg-green-100"
                    >
                      Add
                    </button>
                  </div>
                  <p className="text-green-500">
                    {" "}
                    *You can upload a maximum of 4 pictures.
                  </p>
                  {values?.images?.length > 0 && (
                    <div className="flex gap-3 mt-4 flex-wrap">
                      {values.images?.map((url, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={url}
                            alt={`Product image ${idx + 1}`}
                            className="w-20 h-20 object-cover border rounded"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveImage(
                                idx,
                                setFieldValue,
                                values.images
                              )
                            }
                            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div> */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images (Max 4){" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="flex flex-col items-center justify-center gap-2 px-4 py-6 text-center border-2 border-dashed border-gray-300 rounded-2xl bg-white transition hover:border-green-500 w-full max-w-md">
                    <Cloudy />

                    <p className="text-sm font-medium text-gray-700">
                      Choose a file or drag & drop it here
                    </p>
                    <p className="text-xs text-gray-400">
                      JPEG, JPG, and PNG formats
                    </p>

                    <label
                      htmlFor="image-upload"
                      className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-green-700 cursor-pointer mt-2"
                    >
                      <Upload />
                      Browse File
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        disabled={values?.images?.length >= 4}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const formData = new FormData();
                          formData.append("product", file);

                          try {
                            const res = await fetch(
                              `${BASE_URL}/images/upload`,
                              {
                                method: "POST",
                                body: formData,
                              }
                            );

                            if (!res.ok) throw new Error("Upload failed");

                            const data = await res.json(); // expect { url: "https://..." }
                            const imageUrl = data.url;

                            if (values.images.length < 4) {
                              setFieldValue("images", [
                                ...values.images,
                                imageUrl,
                              ]);
                            }
                          } catch (err) {
                            console.error("Image upload error:", err);
                            alert("Failed to upload image");
                          }

                          e.target.value = "";
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <p className="text-green-600 text-sm mt-1">
                    *You can upload a maximum of 4 images.
                  </p>

                  {values?.images?.length > 0 && (
                    <div className="flex flex-wrap  gap-4 mt-4">
                      {values.images.map((url, idx) => (
                        <div
                          key={idx}
                          className="relative h-24 w-24  sm:h-40 sm:w-40 group"
                        >
                          <img
                            src={url}
                            alt={`Uploaded ${idx + 1}`}
                            className="w-full h-full  object-cover rounded-lg shadow"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveImage(
                                idx,
                                setFieldValue,
                                values.images
                              )
                            }
                            className="absolute top-1 right-1 bg-gray-200 cursor-pointer text-gray-600 p-[2px] rounded-full w-5 h-5 text-xs flex items-center justify-center transition"
                            title="Remove"
                          >
                            <X />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      handleNextStep(validateForm, values, setTouched)
                    }
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sender Name */}
                <div>
                  <label
                    htmlFor="senderName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <Field
                    id="senderName"
                    name="senderName"
                    placeholder="Enter your full name"
                    className="custom-input-class"
                  />
                  <ErrorMessage
                    name="senderName"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Sender Mobile */}
                <div>
                  <label
                    htmlFor="senderMobile"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mobile Number *
                  </label>
                  <div className=" w-full relative">
                    <p className="absolute left-2 top-4">+971</p>
                    <Field
                      id="senderMobile"
                      name="senderMobile"
                      placeholder="Enter 10-digit mobile number"
                      className="mt-2 w-full custom-input-class"
                      style={{ paddingLeft: "50px" }}
                    />
                  </div>

                  <ErrorMessage
                    name="senderMobile"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Sender Address */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="senderAddress"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Pickup Address *
                  </label>
                  <Field
                    as="textarea"
                    id="senderAddress"
                    name="senderAddress"
                    placeholder="Enter your complete address with pincode"
                    className="custom-input-class"
                    rows="3"
                  />
                  <ErrorMessage
                    name="senderAddress"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <Field
                      type="checkbox"
                      id="policyOptIn"
                      name="policyOptIn"
                      className="w-4 h-4"
                    />
                    <label htmlFor="policyOptIn" className="text-sm">
                      I Agree to the Terms and Conditions.{" "}
                      <TermsAndConditionsDialog />
                    </label>
                  </div>
                  <ErrorMessage
                    name="policyOptIn"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

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
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterProductForm;
