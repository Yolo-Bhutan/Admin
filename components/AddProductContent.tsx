import { useState } from "react";

export function AddProductContent() {
  const [product, setProduct] = useState({
    image: "",
    brand: "",
    title: "",
    color: "",
    quantity: "",
    price: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "radio" ? value : value;
    setProduct((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", product);
    // You can add API call here
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
              onChange={(e) => {
                const file = e.target?.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    handleChange({
                      target: {
                        name: "image",
                        value: reader.result,
                      },
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <p className="text-gray-600">Click to upload an image</p>
          </div>
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
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-300"
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
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <div className="flex items-center space-x-6 bg-gray-300 p-2 rounded">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value="International"
                  checked={product.category === "International"}
                  onChange={handleChange}
                />
                <span>International</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value="National"
                  checked={product.category === "National"}
                  onChange={handleChange}
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
            rows="4"
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
}
