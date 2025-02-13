"use client";
import { GetAproduct } from "@/app/action/action";
import { Product } from "@/type/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loading from "@/components/Loading";

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id || "";

  useEffect(() => {
    if (id) {
      GetAproduct(id).then((res) => {
        if (res) {
          setProduct(res as Product);
        }
      });
    }
  }, [id]);

  if (!product)
    return (
      <div className="text-center py-10 text-gray-500 flex flex-row justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900">loading...</h1>

        <Loading />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>

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
          {product.images.map((image) => (
            <SwiperSlide key={image.id}>
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
};

export default ProductPage;
