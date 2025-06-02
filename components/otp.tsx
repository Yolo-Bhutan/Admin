"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import router from "next/router";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
type FormData = z.infer<typeof formSchema>;

export function Otp() {
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const loginData = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (loginData.ok) {
        const response = await loginData.json();
        localStorage.setItem("token", response.token);
        console.log("response", response);
        toast.success("Login successful, Redirecting to dashboard");
        window.localStorage.setItem("loggedIn", "true");
        window.localStorage.setItem("userId", response.data.userData._id);
        window.location.href = "/";
      } else {
        console.log("response", await loginData.json());
        toast.error("Login failed: Invalid email or password");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px] h-[250px] p-5">
      <CardHeader className="text-left pl-1">
        <CardTitle>OTP</CardTitle>
        <CardDescription>Enter your OTP </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 pl-10">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            className="w-full mt-6"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
