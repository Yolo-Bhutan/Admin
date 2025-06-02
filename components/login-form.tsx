"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner"; // ✅ Correctly import toast

// Define the schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

// Define the form data types
type FormData = z.infer<typeof formSchema>;

export function LoginFormComponent() {
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
    <Card className="w-[350px] h-[350px] p-5">
      <CardHeader className="text-left pl-1">
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Sign in to YOLO to get your hands on Fashion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button className="w-full mt-6" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
          <Link
            href={"/forgotpassword"}
            className="text-primary hover:underline"
            style={{ fontSize: 12 }}
          >
            Forgot Password?
          </Link>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="mt-1 text-sm text-center space-y-2">
          <span>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
