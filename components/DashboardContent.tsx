import {
  Bell,
  User,
  Search,
  ShoppingCartIcon,
  ClipboardListIcon,
  CatIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", lastMonth: 25000, thisMonth: 37590 },
  { name: "Week 2", lastMonth: 22000, thisMonth: 34210 },
  { name: "Week 3", lastMonth: 28000, thisMonth: 39000 },
  { name: "Week 4", lastMonth: 26000, thisMonth: 37000 },
];

export function DashboardContent() {
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
        <div className="bg-white w-55 h-28 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium mt-2 p-2">Customer</span>
            <User className="text-black pr-3 mt-3" size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">+172</h2>
            <p className="text-green-600 text-sm">+22% from last month</p>
          </div>
        </div>

        <div className="bg-white w-55 h-28 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium mt-2 p-2">Product</span>
            <ShoppingCartIcon className="text-black pr-3 mt-3" size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">+77</h2>
            <p className="text-green-600 text-sm">+10% from last month</p>
          </div>
        </div>
        <div className="bg-white w-55 h-28 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium mt-2 p-2">Order</span>
            <ClipboardListIcon className="text-black pr-3 mt-3" size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">+88</h2>
            <p className="text-green-600 text-sm">+32% from last month</p>
          </div>
        </div>
        <div className="bg-white w-55 h-28 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-black font-medium mt-2 p-2">Feedback</span>
            <CatIcon className="text-black pr-3 mt-3" size={30} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">+102</h2>
            <p className="text-green-600 text-sm">+21% from last month</p>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Customer Fulfillment</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="lastMonth" stroke="#8884d8" />
            <Line type="monotone" dataKey="thisMonth" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
