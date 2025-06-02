import { Bell, Search, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const initialOrders = [
  { id: 1, status: "Placed" },
  { id: 2, status: "Delivered" },
  { id: 3, status: "Confirmed" },
  { id: 4, status: "Pending" },
  { id: 5, status: "Placed" },
  { id: 6, status: "Delivered" },
  { id: 7, status: "Placed" },
  { id: 8, status: "Delivered" },
  { id: 9, status: "Confirmed" },
  { id: 10, status: "Pending" },
  { id: 11, status: "Placed" },
  { id: 12, status: "Delivered" },
];

const statusColors = {
  Placed: "bg-pink-500",
  Delivered: "bg-green-500",
  Confirmed: "bg-blue-500",
  Pending: "bg-cyan-500",
};

export function OrderContent() {
  const [orders, setOrders] = useState(initialOrders);
  const [sortStatus, setSortStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const filteredOrders = sortStatus
    ? orders.filter((order) => order.status === sortStatus)
    : orders;

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center border border-gray-400 rounded-lg p-2 w-196 bg-white">
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

        <div className="bg-black p-4 rounded-xl mb-6">
          <select
            value={sortStatus}
            onChange={(e) => setSortStatus(e.target.value)}
            className="bg-black text-white border border-white p-2 rounded w-60"
          >
            <option value="">Status</option>
            <option value="Placed">Placed</option>
            <option value="Delivered">Delivered</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="bg-black text-white rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-4">User</th>
                <th>Title</th>
                <th>Price</th>
                <th>ID</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-800 h-16">
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                      👤
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    Unisex Jacket made in Bhutan
                  </td>
                  <td className="whitespace-nowrap">4700</td>
                  <td className="whitespace-nowrap">{order.id}</td>
                  <td>
                    <span
                      className={`px-3 py-1 text-sm rounded-full text-white ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      className="bg-black border border-white text-white rounded p-1"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td
                    className="text-pink-400 cursor-pointer"
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-center p-4 space-x-2">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
              <ChevronLeft className="text-white" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentPage === i + 1
                    ? "bg-purple-500 text-white"
                    : "text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
