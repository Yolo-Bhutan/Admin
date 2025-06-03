"use client";
import React, { useState } from "react";

type Category = "NATIONAL" | "INTERNATIONAL";

interface Product {
  image: string | null;   // for preview
  file?: File;            // actual file for upload
  brand: string;
  name: string;
  color: string;
  quantity: string;
  price: string;
  description: string;
  category: Category | "";  // only these two values allowed
}

export function AddProductContent() {
  const [product, setProduct] = useState<Product>({
    image: null,
    file: undefined,
    brand: "",
    name: "",
    color: "",
    quantity: "",
    price: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          image: reader.result as string | null,
          file: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("quantity", product.quantity);
      formData.append("accountId", "1");

      if (product.brand) formData.append("brand", product.brand);
      if (product.color) formData.append("color", product.color);
      // Append category exactly as backend expects (uppercase)
      if (product.category) formData.append("category", product.category);

      if (product.file) {
        formData.append("image", product.file);
      }

      const response = await fetch(
        "http://localhost:8765/PRODUCT-SERVICE/api/products/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "Failed to add product");
      }

      setSuccess("Product added successfully!");
      setProduct({
        image: null,
        file: undefined,
        brand: "",
        name: "",
        color: "",
        quantity: "",
        price: "",
        description: "",
        category: "",
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 ml-70">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="text-black p-6 rounded-lg w-full max-w-4xl space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <div className="relative w-full border-2 border-dashed border-gray-400 rounded-lg p-4 bg-gray-100 text-center cursor-pointer hover:bg-gray-200">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <p className="text-gray-600">
              {product.image ? "Image Selected" : "Click to upload an image"}
            </p>
          </div>
          {product.image && (
            <img
              src={product.image}
              alt="Preview"
              className="mt-2 max-h-40 mx-auto"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Color</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-300"
              min={0}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-300"
              min={0}
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Category</label>
            <div className="flex items-center space-x-6 bg-gray-300 p-2 rounded">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value="INTERNATIONAL"
                  checked={product.category === "INTERNATIONAL"}
                  onChange={handleChange}
                  required
                />
                <span>International</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value="NATIONAL"
                  checked={product.category === "NATIONAL"}
                  onChange={handleChange}
                  required
                />
                <span>National</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-300"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "ADD PRODUCT"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>
    </div>
  );
}
