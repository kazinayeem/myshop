"use client";
import { Product } from "@/type/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ShowProductProps {
  product: Product;
}

export default function ShowProduct({ product }: ShowProductProps) {
  return (
    <div className="flex justify-center my-2">
      <div className="max-w-sm w-full rounded-lg shadow-lg overflow-hidden bg-white">
        {/* Product Image */}
        <Image
          width={300}
          height={300}
          loading="lazy"
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-4">
          {/* Product Name */}
          <Link
            href={`/product/${product.id}`}
            className="text-xl font-semibold text-gray-800 hover:underline 
          cursor-pointer transition duration-300 ease-in-out mt-2
          "
          >
            {product.name}
          </Link>
         

          {/* Product Price */}
          <p className="text-2xl font-bold text-gray-900 mt-4">
            ${product.price}
          </p>

          {/* Product Category */}
          <p className="text-gray-500 mt-2">
            Category: {product.category?.name}
          </p>

          {/* Add to Cart Button */}
          <div className="mt-4 flex justify-between items-center">
            <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Add to Cart
            </button>

            {/* show details */}
            <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition mt-2">
              <Link href={`/product/${product.id}`}>Show Details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
