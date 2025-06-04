"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/Landing/Header";
import Guest from "@/components/Landing/Guest";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page on component mount
    router.push("/login");
  }, [router]);

  return null; // Optionally return null since redirect happens immediately
}
