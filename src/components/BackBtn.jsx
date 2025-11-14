import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const BackBtn = ({ link, text }) => {
  return (
    <Link href={link}>
      <Button variant="outline" size="sm">
        {" "}
        <ArrowLeft />
        <span className="hidden sm:block"> {text}</span>
      </Button>{" "}
    </Link>
  );
};

export default BackBtn;
