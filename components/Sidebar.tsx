"use client";

import { usePathname } from "next/navigation";
import { Home, User, ShoppingCart, Clipboard, Box, LogOut } from "lucide-react";
import Link from "next/link";

export function Sidebar({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const pathname = usePathname(); //Get the current route

  return (
    <div
      className={`bg-white text-black w-64 p-5 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button onClick={toggle} className="mb-10 text-black">
        Toggle
      </button>
      <ul className="flex flex-col h-full space-y-2">
        <li>
          <Link href="/admin/Dashboard" className="w-full block">
            <button
              className={`w-full text-left p-2 rounded flex items-center ${
                pathname === "/admin/Dashboard"
                  ? "bg-black text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </button>
          </Link>
        </li>

        {/* <li>
          <Link href="/admin/Customer" className="w-full block">
            <button
              className={`w-full text-left p-2 rounded flex items-center ${
                pathname === "/admin/Customer"
                  ? "bg-black text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              <User className="h-5 w-5 mr-2" />
              Customer
            </button>
          </Link>
        </li> */}

        <li>
          <Link href="/admin/Product" className="w-full block">
            <button
              className={`w-full text-left p-2 rounded flex items-center ${
                pathname === "/admin/Product"
                  ? "bg-black text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Product
            </button>
          </Link>
        </li>

        <li>
          <Link href="/admin/Order" className="w-full block">
            <button
              className={`w-full text-left p-2 rounded flex items-center ${
                pathname === "/admin/Order"
                  ? "bg-black text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              <Clipboard className="h-5 w-5 mr-2" />
              Order
            </button>
          </Link>
        </li>

        <li>
          <Link href="/admin/AddProduct" className="w-full block">
            <button
              className={`w-full text-left p-2 rounded flex items-center ${
                pathname === "/admin/AddProduct"
                  ? "bg-black text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              <Box className="h-5 w-5 mr-2" />
              Add Product
            </button>
          </Link>
        </li>

        <li className="mt-87">
          <button className="w-full text-left p-2 rounded flex items-center hover:bg-gray-300">
            <LogOut className="h-5 w-5 mr-2" />
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
