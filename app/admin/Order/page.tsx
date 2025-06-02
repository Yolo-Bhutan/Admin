"use client";
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { OrderContent } from "@/components/OrderContent";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-col flex-1">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <OrderContent />
      </div>
    </div>
  );
}
