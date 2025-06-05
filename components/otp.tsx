

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function Otp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const [newPassword, setNewPassword] = useState<string | null>(null);
  const [value, setValue] = useState(""); // OTP
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedPassword = localStorage.getItem("newPassword");
    setNewPassword(storedPassword);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !newPassword || !value) {
      toast.error("Missing email, password, or OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8765/USER-SERVICE/api/users/verify-admin-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newPassword,
          otp: value,
        }),
      });

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }

      if (res.ok) {
        toast.success("login successful!");
        localStorage.removeItem("newPassword"); // clean up
        router.push("/admin/Dashboard");
      } else {
        toast.error(result.message || "login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occured while logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px] h-[250px] p-5">
      <CardHeader className="text-left pl-1">
        <CardTitle>OTP</CardTitle>
        <CardDescription>Enter the OTP sent to your email</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 pl-10">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(val) => setValue(val)}
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button className="w-full mt-6" type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
