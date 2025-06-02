import React from "react";
import background from "@/assets/form/formbg.png";
import Image from "next/image";
import {Otp} from "@/components/otp"

const page = () => {
  return (
    <div className="bg-black">
      <div
        style={{
          background: `url(${background.src})`,
          backgroundPosition: "center center",
          backgroundSize: "cover", // Optional: Makes sure the image covers the entire area
          animation: "moveBackground 100s infinite linear", // Adds the animation
        }}
        className="h-dvh w-dvw"
      >
        <div className="h-dvh bg-gradient bg-gradient-to-b from-black/80 via-black/40 to-black/100 flex flex-col justify-center items-start pl-40">
          <Otp />
        </div>
      </div>
    </div>
  );
};

export default page;
