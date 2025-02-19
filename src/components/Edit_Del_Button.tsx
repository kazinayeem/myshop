"use client";

import {
  DeleteCategory,
  UpdateCategory,
} from "@/app/(admin)/admin/categories/action/action";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

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

export default function EditDelButton({
  id,
  name,
}: {
  id: string;
  name?: string;
}) {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement("body");
    }
  }, []);

  useEffect(() => {
    setCategoryName(name || "");
  }, [name]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const deleteHandler = async (id: string) => {
    setLoading(true);
    await DeleteCategory(id);
    setLoading(false);
    router.refresh();
  };

  const editHandler = async (id: string) => {
    setLoading(true);
    await UpdateCategory(id, categoryName);
    setLoading(false);
    alert(`Edited category: ${categoryName}`);
    closeModal();
    router.refresh();
  };

  return (
    <div className="p-4">
      <div className="flex justify-end space-x-2">
        <button
          disabled={loading}
          onClick={openModal}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Loading..." : "Edit"}
        </button>
        <button
          disabled={loading}
          onClick={() => deleteHandler(id)}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>

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
              onClick={() => editHandler(id)}
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
}
