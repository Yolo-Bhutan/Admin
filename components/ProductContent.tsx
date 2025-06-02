import { useState, useEffect } from "react";
import { Bell, ChevronLeft, ChevronRight, Search, User } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    image: "https://via.placeholder.com/50",
    title: "Unisex Jacket",
    category: "Jacket",
    price: 4000,
    quantity: 50,
    brand: "Brand A",
    color: "Red",
    description: "A stylish unisex jacket made of durable fabric.",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/50",
    title: "Handwoven Scarf",
    category: "Accessories",
    price: 1500,
    quantity: 30,
    brand: "Brand B",
    color: "Blue",
    description: "A handwoven scarf, perfect for winter.",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/50",
    title: "Leather Wallet",
    category: "Accessories",
    price: 3000,
    quantity: 20,
    brand: "Brand C",
    color: "Brown",
    description: "A premium leather wallet with multiple compartments.",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/50",
    title: "Traditional Boots",
    category: "Footwear",
    price: 5000,
    quantity: 10,
    brand: "Brand D",
    color: "Black",
    description: "Traditional boots designed for durability and comfort.",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/50",
    title: "Woolen Sweater",
    category: "Clothing",
    price: 3500,
    quantity: 40,
    brand: "Brand E",
    color: "Gray",
    description: "A cozy woolen sweater to keep you warm during winters.",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/50",
    title: "Cotton T-shirt",
    category: "Clothing",
    price: 2000,
    quantity: 60,
    brand: "Brand F",
    color: "White",
    description: "A comfortable cotton t-shirt for everyday wear.",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/50",
    title: "Handmade Earrings",
    category: "Jewelry",
    price: 2500,
    quantity: 25,
    brand: "Brand G",
    color: "Gold",
    description: "Handmade earrings with intricate designs.",
  },
  {
    id: 8,
    image: "https://via.placeholder.com/50",
    title: "Silk Shawl",
    category: "Accessories",
    price: 4500,
    quantity: 15,
    brand: "Brand H",
    color: "Purple",
    description: "A luxurious silk shawl, perfect for evening wear.",
  },
  {
    id: 9,
    image: "https://via.placeholder.com/50",
    title: "Casual Sneakers",
    category: "Footwear",
    price: 5500,
    quantity: 35,
    brand: "Brand I",
    color: "Blue",
    description: "Comfortable casual sneakers for everyday use.",
  },
  {
    id: 10,
    image: "https://via.placeholder.com/50",
    title: "Leather Belt",
    category: "Accessories",
    price: 2200,
    quantity: 45,
    brand: "Brand J",
    color: "Black",
    description: "A classic leather belt that pairs well with any outfit.",
  },
];

const colors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Black",
  "White",
  "Purple",
  "Orange",
  "Gray",
  "Brown",
];

export function ProductContent() {
  const [formData, setFormData] = useState({
    brand: "",
    title: "",
    color: "",
    quantity: "",
    price: "",
    category: "",
    description: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [sortOption, setSortOption] = useState("price_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const itemsPerPage = 5;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price_desc") return b.price - a.price;
    if (sortOption === "price_asc") return a.price - b.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Use effect to update form data when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        brand: editingProduct.brand || "",
        title: editingProduct.title || "",
        color: editingProduct.color || "",
        quantity: editingProduct.quantity || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "",
        description: editingProduct.description || "",
      });
    }
  }, [editingProduct]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleUpdate = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? { ...product, ...formData } : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="p-6">
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
                <th className="border border-gray-600 p-2">Title</th>
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
                  <td className="border border-gray-700 p-2">
                    <img src={product.image} alt="Product" className="w-10" />
                  </td>
                  <td className="border border-gray-700 p-2">
                    {product.title}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {product.category}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {product.price}
                  </td>
                  <td className="border border-gray-700 p-2">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-700 p-2">
                    <button
                      className="text-blue-400 underline"
                      onClick={() => setEditingProduct(product)}
                    >
                      Update
                    </button>
                  </td>
                  <td className="border border-gray-700 p-2">
                    <button
                      className="text-red-400 underline"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 mx-1 bg-gray-800 rounded disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`p-2 mx-1 rounded ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 mx-1 bg-gray-800 rounded disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center p-6 bg-gray-200 min-h-screen">
          <h2 className="text-2xl font-bold mb-6">Update Product</h2>

          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
            {/* Image Upload */}
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center mb-6">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover mb-4"
                />
              ) : (
                <span className="text-gray-500">Click to choose an image</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-md mt-2"
              >
                Choose Image
              </label>
            </div>
            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="p-2 bg-black text-white rounded-md w-full"
                placeholder="Brand"
              />

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="p-2 bg-black text-white rounded-md w-full"
                placeholder="Title"
              />

              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="p-2 bg-black text-white rounded-md w-full"
              >
                <option value="">Select Color</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="p-2 bg-black text-white rounded-md w-full"
                placeholder="Quantity"
              />

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="p-2 bg-black text-white rounded-md w-full"
                placeholder="Price"
              />

              {/* Category Selection */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="category"
                    value="International"
                    checked={formData.category === "International"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="w-4 h-4 bg-purple-600 rounded-full"></span>
                  <span>International</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="category"
                    value="National"
                    checked={formData.category === "National"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="w-4 h-4 border-2 border-gray-500 rounded-full"></span>
                  <span>National</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-4 p-2 bg-black text-white rounded-md w-full h-24"
              placeholder="Description"
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={handleUpdate}
              className="w-half bg-purple-600 text-white p-2 mt-4 rounded-md font-semibold"
            >
              UPDATE PRODUCT
            </button>
            <button
              onClick={handleCancel}
              className="w-half bg-red-600 text-black p-2 mt-2 ml-5 rounded-md font-semibold"
            >
              CANCEL UPDATE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
