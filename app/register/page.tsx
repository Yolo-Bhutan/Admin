import React from "react";
import logo from "@/assets/goldlogo.png";
import background from "@/assets/form/formbg.png";
import Image from "next/image";
import { RegisterFormComponent } from "@/components/register-form";

const Register = () => {
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
          <RegisterFormComponent />
        </div>
      </div>
    </div>
  );
};

export default Register;
