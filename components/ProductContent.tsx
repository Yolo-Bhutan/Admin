import React, { useState, useEffect, ChangeEvent } from "react";
import { Bell, ChevronLeft, ChevronRight, Search, User } from "lucide-react";

interface Product {
  id: number;
  image?: string;
  name: string;
  category?: string;
  price: number;
  quantity?: number;
  brand?: string;
  color?: string;
  description?: string;
}

const colors = [
  "Red", "Blue", "Green", "Yellow", "Black",
  "White", "Purple", "Orange", "Gray", "Brown"
];

export function ProductContent() {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    brand: "",
    name: "",
    color: "",
    quantity: 0,
    price: 0,
    category: "",
    description: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("price_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:8765/PRODUCT-SERVICE/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
      setPreviewImage(editingProduct.image || null);
      setImageFile(null);
    }
  }, [editingProduct]);

  const sortedProducts = [...products].sort((a, b) => {
    return sortOption === "price_desc" ? b.price - a.price : a.price - b.price;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`http://localhost:8765/PRODUCT-SERVICE/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete product");
        return res.text();
      })
      .then(() => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Check console for details.");
      });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({
      id: 0,
      brand: "",
      name: "",
      color: "",
      quantity: 0,
      price: 0,
      category: "",
      description: "",
      image: "",
    });
    setPreviewImage(null);
    setImageFile(null);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleUpdate = () => {
    if (!editingProduct) return;

    setLoading(true);

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("price", formData.price.toString());
    formPayload.append("description", formData.description || "");
    formPayload.append("quantity", (formData.quantity || 0).toString());
    formPayload.append("accountId", "1"); // replace with actual accountId if available
    formPayload.append("category", formData.category || "");
    if (formData.brand) formPayload.append("brand", formData.brand);
    if (formData.color) formPayload.append("color", formData.color);

    if (imageFile) {
      formPayload.append("image", imageFile);
    }

    fetch(`http://localhost:8765/PRODUCT-SERVICE/api/products/${editingProduct.id}`, {
      method: "PUT",
      body: formPayload,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update product");
        return res.json();
      })
      .then((updatedProduct: Product) => {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        setEditingProduct(null);
        setPreviewImage(null);
        setImageFile(null);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update product. Check console for details.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center border border-gray-400 rounded-lg p-2 w-187.5">
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

      {!editingProduct ? (
        // Product List
        <div className="p-4 bg-gray-900 text-white rounded-lg">
          <div className="mb-4">
            <label className="block mb-2">Sort by</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border p-2 rounded bg-gray-800 text-white"
            >
              <option value="price_desc">High to Low</option>
              <option value="price_asc">Low to High</option>
            </select>
          </div>

          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 p-2">Image</th>
                <th className="border border-gray-600 p-2">Name</th>
                <th className="border border-gray-600 p-2">Category</th>
                <th className="border border-gray-600 p-2">Price</th>
                <th className="border border-gray-600 p-2">Quantity</th>
                <th className="border border-gray-600 p-2">Update</th>
                <th className="border border-gray-600 p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="border border-gray-700">
                  <td className="p-2">
                    <img
                      src={product.image || "https://via.placeholder.com/50"}
                      alt="Product"
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">Nu.{product.price.toFixed(2)}</td>
                  <td className="p-2">{product.quantity}</td>
                  <td className="p-2">
                    <button
                      className="text-blue-400 underline hover:text-blue-600"
                      onClick={() => setEditingProduct(product)}
                    >
                      Update
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      className="text-red-400 underline hover:text-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-l disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-4 py-1 border-t border-b">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-r disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        // Compact Update Form
        <div className="p-4 bg-gray-900 text-white rounded-lg max-w-xl mx-auto shadow-lg">
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">
            Update Product
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1" htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="category">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="price">
                  Price (NU) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min={0}
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={0}
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="brand">
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1" htmlFor="color">
                  Color
                </label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
                >
                  <option value="">Select Color</option>
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 rounded border border-gray-700 bg-gray-800 text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1" htmlFor="image">
                Upload Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-white"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2 rounded max-h-40 object-contain"
                />
              )}
            </div>

            <div className="flex space-x-3 justify-end pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}





