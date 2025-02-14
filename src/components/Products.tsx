"use client";
import { Category, Product } from "@/type/type";
import React, { Suspense, useEffect, useState } from "react";
import ShowProduct from "./ShowProduct";
import { GetAllCategories, GetAllproduct } from "@/app/action/action";
import Loading from "./Loading";

export default function Products() {
  const [categoryName, setCategoryName] = useState<string>("");
  const [category, setCategory] = useState<Category[]>([]);
  const [name, setName] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    GetAllproduct(
      page,
      pageSize,
      categoryName,
      name,
      sortOrder as "asc" | "desc"
    )
      .then((res) => {
        if (res) {
          setLoading(false);
          setProducts(res.items as Product[]);
          setTotalPages(Math.ceil((res.totalCount as number) / pageSize));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    // fetch(
    //   `/api/product?categoryName=${categoryName}&sortOrder=${sortOrder}&name=${name}&page=${page}&pageSize=${pageSize}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setLoading(false);
    //     setProducts(data.items);
    //     setTotalPages(Math.ceil(data.totalCount / pageSize));
    //   });
  }, [categoryName, name, sortOrder, page, pageSize]);

  useEffect(() => {
    setLoading(true);
    GetAllCategories()
      .then((res) => {
        if (res) {
          setLoading(false);
          setCategory(res as Category[]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <Loading />}
      {/* Header & Filters */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Explore our latest collection
        </p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {/* Category Dropdown */}
        <select
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg px-4 py-2"
        >
          <option value="">Select Category</option>
          {category.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Product Name Input */}
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg px-4 py-2"
        />

        {/* Sort Order Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-lg px-4 py-2"
        >
          <option value="">Sort Order</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          {products.length > 0 ? (
            products.map((product) => (
              <ShowProduct key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>
          )}
        </Suspense>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 rounded-lg transition ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-800 dark:text-white">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className={`px-4 py-2 rounded-lg transition ${
            page >= totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
