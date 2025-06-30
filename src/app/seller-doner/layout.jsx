import Layout from "@/components/layout";
import React from "react";

const layout = ({ children }) => {
  return (
    <Layout>
      <div>{children}</div>{" "}
    </Layout>
  );
};

export default layout;
