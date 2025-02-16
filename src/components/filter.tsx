"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GetAllCategories } from "@/app/action/action";

export default function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State Variables
  const [categories, setCategories] = useState<string[]>([]);
  const [name, setName] = useState(searchParams.get("name") || "");
  const [categoryName, setCategoryName] = useState(
    searchParams.get("categoryName") || ""
  );
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc"
  );

  // Fetch Categories on Load
  useEffect(() => {
    async function fetchCategories() {
      const data = await GetAllCategories();
      if (data) {
        setCategories(data.map((category) => category.name));
      }
    }
    fetchCategories();
  }, []);

  // Auto Update URL Params when Filters Change
  useEffect(() => {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (categoryName) params.set("categoryName", categoryName);
    params.set("page", page.toString());
    params.set("pageSize", "10");
    params.set("sortOrder", sortOrder);

    router.push(`?${params.toString()}`);
  }, [name, categoryName, page, sortOrder, router]); // Runs whenever these change

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg w-full max-w-6xl mx-auto">
    
      {/* Row-Based Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search by Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center col-span-2 md:col-span-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            ⬅ Prev
          </button>
          <span className="text-gray-700 font-medium">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}
