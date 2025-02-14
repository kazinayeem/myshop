"use client";

import Link from "next/link";

export const AppSidebar = () => {
  return (
    <aside className="w-1/4 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-4">
        <Link href="/admin" className="block p-2 hover:bg-gray-700 rounded">
          Dashboard
        </Link>
        <Link
          href="/admin/orders"
          className="block p-2 hover:bg-gray-700 rounded"
        >
          Orders
        </Link>
        <Link
          href="/admin/products"
          className="block p-2 hover:bg-gray-700 rounded"
        >
          Products
        </Link>
        <Link
          href="/admin/products/add"
          className="block p-2 hover:bg-gray-700 rounded"
        >
          Add Product
        </Link>
        <Link href="#" className="block p-2 hover:bg-gray-700 rounded">
          Users
        </Link>
      </nav>
    </aside>
  );
};
