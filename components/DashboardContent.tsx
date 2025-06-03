import React, { useEffect, useState } from "react";
import {
  Bell,
  User,
  Search,
  ShoppingCartIcon,
  ClipboardListIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function DashboardContent() {
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [productsRes, customersRes, ordersRes] = await Promise.all([
          fetch("http://localhost:8765/PRODUCT-SERVICE/api/products"),
          fetch("http://localhost:8765/USER-SERVICE/api/users/all"),
          fetch("http://localhost:8765/ORDER-SERVICE/api/orders/all"),
        ]);

        const products = await productsRes.json();
        const customers = await customersRes.json();
        const orders = await ordersRes.json();

        setProductCount(products.length);
        setCustomerCount(customers.length);
        setOrderCount(orders.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const chartData = [
    { name: "Customers", count: customerCount },
    { name: "Products", count: productCount },
    { name: "Orders", count: orderCount },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border border-gray-400 rounded-lg p-2 w-190">
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full p-2 outline-none"
          />
        </div>

        <div className="flex items-center space-x-5">
          <Bell className="text-gray-600 cursor-pointer" size={24} />
          <User className="text-gray-600 cursor-pointer" size={24} />
        </div>
      </div>

      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>

      <div className="bg-grey w-294 h-50 flex flex-wrap justify-center items-center gap-15 p-4 mt-6 rounded-lg border border-gray-400">
        {/* Customer Card */}
        <div className="bg-white w-55 h-28 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium">Customer</span>
            <User className="text-black" size={30} />
          </div>
          <h2 className="text-2xl font-bold text-black">+{customerCount}</h2>
          <p className="text-green-600 text-sm">Total registered users</p>
        </div>

        {/* Product Card */}
        <div className="bg-white w-55 h-28 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium">Product</span>
            <ShoppingCartIcon className="text-black" size={30} />
          </div>
          <h2 className="text-2xl font-bold text-black">+{productCount}</h2>
          <p className="text-green-600 text-sm">Total products available</p>
        </div>

        {/* Order Card */}
        <div className="bg-white w-55 h-28 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium">Order</span>
            <ClipboardListIcon className="text-black" size={30} />
          </div>
          <h2 className="text-2xl font-bold text-black">+{orderCount}</h2>
          <p className="text-green-600 text-sm">Total placed orders</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mt-10 bg-white p-4 rounded-lg border border-gray-300">
        <h3 className="text-lg font-semibold mb-2">Platform Statistics</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
