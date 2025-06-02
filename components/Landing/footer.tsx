import React from "react";
import logo from "@/assets/whitelogo.png";
import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="flex flex-col  items-center w-full space-y-4">
        <Image src={logo} width={50} height={50} alt="logo-yolo-infinity" />
        <div className="border-[0.25px] border-white w-3/4" />
        <p className="font-serif">You Only Live Once</p>
        <div className="flex flex-col space-y-1 w-full items-center">
          <div className="border-[0.25px] border-white w-3/4" />
          <div className="border-[0.25px] border-white w-3/4" />
        </div>
      </div>
      <div className="container mx-auto text-center pt-4">
        <p>&copy; YOLO, All rights reserved 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
