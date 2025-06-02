import { Bell, User, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { UserIcon } from "lucide-react";

const data = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 65 },
  { month: "May", value: 75 },
  { month: "Jun", value: 85 },
];

const customers = [
  { name: "Mr. Anup", email: "example@gmail.com" },
  { name: "Mr. Rinchen", email: "example@gmail.com" },
  { name: "Mr. Anup", email: "example@gmail.com" },
  { name: "Mr. Anup", email: "example@gmail.com" },
  { name: "Mr. Anup", email: "example@gmail.com" },
];

export function CustomerContent() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border border-gray-400 rounded-lg p-2 w-187.5">
          <Search className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full p-2 outline-none bg-transparent text-black"
          />
        </div>

        <div className="flex items-center space-x-5">
          <Bell className="text-gray-600 cursor-pointer" size={24} />
          <User className="text-gray-600 cursor-pointer" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Customer Growth Card */}
        <Card className="bg-black mt-3 text-white p-4 col-span-1 flex flex-col justify-between h-32">
          <div>
            <p className="text-sm">Customer</p>
            <h2 className="text-2xl font-bold">+172</h2>
          </div>
          <p className="text-green-500">+22% from last month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Monthly User Participation Chart */}
        <Card className="bg-black text-white p-6 flex flex-col justify-between h-100">
          <div>
            <h3 className="text-lg font-semibold">
              Monthly User Participation
            </h3>
            <p className="text-sm text-gray-400">January - June 2024</p>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data}>
              <XAxis dataKey="month" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip cursor={{ fill: "rgba(255, 255, 255, 0.2)" }} />
              <Bar dataKey="value" fill="white" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-400">
            Trending up by 5.2% this month
          </p>
        </Card>

        {/* Loyal Customers */}
        <Card className="bg-black text-white p-6 flex flex-col justify-between h-100">
          <h3 className="text-lg font-semibold">Loyal Customers</h3>
          <ul className="flex-grow overflow-auto">
            {customers.map((customer, index) => (
              <li key={index} className="flex items-center gap-2 py-2">
                <UserIcon className="w-5 h-5" />
                <div>
                  <p>{customer.name}</p>
                  <p className="text-gray-400 text-sm">{customer.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
