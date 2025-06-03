import {
  Bell,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";

type Order = {
  orderId: number;
  title: string;
  price: number;
  productId: number;
  status: "PLACED" | "DELIVERED" | "PENDING";
};

type Product = {
  id: number;
  name: string;
  price: number;
};

const statusColors: Record<Order["status"], string> = {
  PLACED: "bg-pink-500",
  DELIVERED: "bg-green-500",
  PENDING: "bg-cyan-500",
};

const statusOptions = [
  { label: "Placed", value: "PLACED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Pending", value: "PENDING" },
];

export function OrderContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortStatus, setSortStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:8765/PRODUCT-SERVICE/api/products")
      .then((res) => res.json())
      .then((productsData) => {
        console.log("Fetched products:", productsData);
        if (Array.isArray(productsData)) {
          setProducts(productsData);
        } else {
          console.error("Products response is not an array", productsData);
        }
        return fetch("http://localhost:8765/ORDER-SERVICE/api/orders/all");
      })
      .then((res) => res.json())
      .then((ordersData) => {
        console.log("Fetched orders:", ordersData);
        if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else {
          console.error("Orders response is not an array", ordersData);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleDelete = (orderId: number) => {
    fetch(`http://localhost:8765/ORDER-SERVICE/api/orders/${orderId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
        } else {
          console.error("Failed to delete order:", res.status);
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleStatusUpdate = (orderId: number, newStatus: Order["status"]) => {
    const orderToUpdate = orders.find((order) => order.orderId === orderId);
    if (!orderToUpdate) return;

    const updatedOrder = { ...orderToUpdate, status: newStatus };

    fetch(`http://localhost:8765/ORDER-SERVICE/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedOrder),
    })
      .then((res) => {
        if (res.ok) {
          setOrders((prev) =>
            prev.map((order) =>
              order.orderId === orderId ? { ...order, status: newStatus } : order
            )
          );
        } else {
          console.error("Failed to update status:", res.status);
        }
      })
      .catch((err) => console.error("Update error:", err));

    console.log("Updating status for Order ID:", orderId, "to", newStatus);
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
            <option key="all" value="">Status</option>
            {statusOptions.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-black text-white rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-4">User</th>
                <th>Product Title</th>
                <th>Product Price</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => {
                const product = products.find(
                  (p) => String(p.id) === String(order.productId)
                );

                return (
                  <tr key={order.orderId} className="border-b border-gray-800 h-16">
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                        👤
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      {product?.name || "Loading..."}
                    </td>
                    <td className="whitespace-nowrap">
                      {product?.price ?? "N/A"}
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 text-sm rounded-full text-white ${statusColors[order.status]}`}
                      >
                        {statusOptions.find((s) => s.value === order.status)?.label}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            order.orderId,
                            e.target.value as Order["status"]
                          )
                        }
                        className="bg-black border border-white text-white rounded p-1"
                      >
                        {statusOptions.map(({ label, value }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td
                      className="text-pink-400 cursor-pointer"
                      onClick={() => handleDelete(order.orderId)}
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-center p-4 space-x-2">
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
              <ChevronLeft className="text-white" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentPage === i + 1 ? "bg-purple-500 text-white" : "text-white"
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
