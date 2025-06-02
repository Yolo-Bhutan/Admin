"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Correct import for Next.js 13+
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
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
type FormData = z.infer<typeof formSchema>;

export function Forgotpassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter(); // ✅ Use the correct Next.js router hook

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/send-otp`, // ✅ Make sure this endpoint exists
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("OTP sent! Redirecting...");
        router.push("/otp"); // ✅ This will now work properly
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-[350px] h-[250px] p-5">
      <CardHeader className="text-left pl-1">
        <CardTitle>Email</CardTitle>
        <CardDescription>Recover Your Account.</CardDescription>
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
          </div>

          <Button className="w-full mt-6" type="submit" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
