import React from "react";
import RegisterProductForm from "./RegisterProductForm";
import BackBtn from "@/components/BackBtn";

const page = () => {
  return (
    <div className="container mx-auto w-full px-4 ">
      {" "}
     
      <div className="flex justify-between mb-6 mt-4">
        <div className="flex items-center gap-2">
          {" "}
          <BackBtn text="Back" link="/user" />
          <h1 className="text-2xl font-semibold ">
            {" "}
         Register Product
          </h1>
        </div>
      </div>
      <RegisterProductForm />;
    </div>
  );
};

export default page;
