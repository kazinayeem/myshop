"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import {
  GetAllCategories,
  DeleteCategory,
  UpdateCategory,
} from "./action/action";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

// Types
type Category = {
  id: string;
  name: string;
  products: Product[];
};

type Product = {
  id: string;
  name: string;
  images: { url: string }[];
};

// Modal Styles
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    width: "90%",
    maxWidth: "400px",
    border: "none",
    backgroundColor: "#fff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categoryName, setCategoryName] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const router = useRouter();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await GetAllCategories();
      if (data) {
        setCategories(data as Category[]);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // Modal settings
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body");
    }
  }, []);

  const openModal = (category: Category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCategory(null);
  };

  // Edit category
  const editHandler = async () => {
    if (!selectedCategory) return;
    setActionLoading(true);
    await UpdateCategory(selectedCategory.id, categoryName);
    setActionLoading(false);
    alert(`Edited category: ${categoryName}`);
    closeModal();
    router.refresh();
  };

  // Delete category
  const deleteHandler = async (id: string) => {
    setActionLoading(true);
    await DeleteCategory(id);
    setActionLoading(false);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
        <Loading />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No Categories Found...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          All Categories
        </h2>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={category.id}>
              <details
                className="bg-gray-200 p-4 rounded-lg"
                open={index === 0}
              >
                <summary className="cursor-pointer font-medium text-lg text-gray-700">
                  {category.name}
                </summary>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                  {category.products.map((product) => (
                    <li
                      key={product.id}
                      className="bg-gray-50 p-3 rounded-lg shadow"
                    >
                      <div
                        className="flex justify-center items-center h-28 w-28 bg-gray-100 
                        rounded-lg overflow-hidden"
                      >
                        <Image
                          src={product.images[0]?.url || "/placeholder.png"}
                          alt={product.name || "Product Image"}
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                      </div>
                      <p className="text-center mt-2 font-medium text-gray-800">
                        {product.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </details>

              {/* Edit & Delete Buttons */}
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  disabled={actionLoading}
                  onClick={() => openModal(category)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                >
                  {actionLoading ? "Loading..." : "Edit"}
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() => deleteHandler(category.id)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  {actionLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Edit Category */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className="text-lg font-semibold text-center mb-4">
          Edit Category
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={editHandler}
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Page;
