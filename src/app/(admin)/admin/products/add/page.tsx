"use client";
import { CreateProduct, GetAllCategories } from "@/app/action/action";
import { Category } from "@/type/type";
import { useEffect, useState } from "react";

export default function AddProduct() {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    GetAllCategories().then((data) => {
      if (data) {
        setCategory(data);
        setLoading(false);
      }
      setLoading(false);
    });
  }, []);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newImages = [...product.images];
    newImages[index] = e.target.value;
    setProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await CreateProduct({
      name: product.name,
      description: product.description,
      price: +product.price,
      stock: +product.stock,
      categoryId: product.category,
      images: product.images,
    });

    if (res) {
      setLoading(false);
      alert("Product added successfully");
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        images: [""],
      });
    } else {
      setLoading(false);
      alert("Failed to add product");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, category: e.target.value }))
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            "
            >
              <option value="">Select a category</option>
              {category.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Links */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Product Images
            </label>
            <div className="space-y-3">
              {product.images.map((image, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(e, index)}
                    placeholder="Image URL"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-blue-500 hover:underline flex items-center mt-2"
              >
                + Add Image
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
