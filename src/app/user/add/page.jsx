import React from "react";
import RegisterProductForm from "./RegisterProductForm";
import BackBtn from "@/components/BackBtn";

const page = () => {
  return (
    <div className="container mx-auto w-full px-4 py-6">
      {" "}
      <div>
        <BackBtn text="Back To Home" link="/user" />
      </div>
      <RegisterProductForm />;
    </div>
  );
};

export default page;
