"use client";
import { CreateProduct, GetAllCategories } from "@/app/action/action";
import { Category } from "@/type/type";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

import "react-quill-new/dist/quill.snow.css";
export default function AddProduct() {
  const modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        { header: [3, 4, 5, 6] },
        {
          font: [],
        },
      ],
      [{ size: ["small", false, "large", "huge"] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
    "video",
    "color",
    "background",
    "clean",
  ];

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
    description: "", // This will hold the HTML content from ReactQuill
    price: "",
    stock: "",
    category: "",
    images: [""],
    published: false,
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

  const removeImageField = (index: number) => {
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handlePublishChange = () => {
    setProduct((prev) => ({
      ...prev,
      published: !prev.published,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setProduct((prev) => ({
      ...prev,
      description: value, // Update description with Quill content
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
      published: product.published,
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
        published: false,
      });
    } else {
      setLoading(false);
      alert("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-4xl w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description - ReactQuill Editor */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>

            <ReactQuill
              modules={modules}
              formats={formats}
              theme="snow"
              className="mt-1 block w-full px-3 py-2 border
              border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={product.description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* Price & Stock - Grid Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Category *
            </label>
            <select
              name="category"
              value={product.category}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, category: e.target.value }))
              }
              required
              className="mt-2 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload Section with Preview and Remove */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Product Images
            </label>
            <div className="space-y-2">
              {product.images.map((image, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(e, index)}
                    placeholder="Image URL"
                    className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {/* Image Preview */}
                  {image && (
                    <div className="mt-2">
                      <Image
                        width={80}
                        height={80}
                        src={image}
                        alt={`Image preview ${index}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="text-red-500 hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-blue-500 hover:underline mt-2"
              >
                + Add Image
              </button>
            </div>
          </div>

          {/* Publish Toggle */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Publish Product
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={product.published}
                onChange={handlePublishChange}
                className="toggle toggle-blue"
              />
              <span className="ml-2 text-sm text-gray-600">
                {product.published ? "Published" : "Unpublished"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              {loading ? "Loading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
