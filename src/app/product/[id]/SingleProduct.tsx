"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Product } from "@/type/type";
import Image from "next/image";

import parse from "html-react-parser";
export default function ProductPage({ product }: { product: Product }) {
  if (!product) {
    return (
      <div className="text-center py-10 text-gray-500 flex flex-row justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      
      {/* show description */}
      <div className="mt-4">{parse(product.description || "")}</div>

      {/* Price and Stock */}

      <div className="mt-4">
        <span className="text-lg font-semibold text-green-600">
          ${product.price}
        </span>
        <span className="ml-4 text-gray-500">Stock: {product.stock}</span>
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        Category: {product.category.name}
      </h2>

      {/* Swiper Image Slider */}
      <div className="mt-6">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          className="w-full rounded-lg"
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[400px]">
                <Image
                  src={image.url}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
