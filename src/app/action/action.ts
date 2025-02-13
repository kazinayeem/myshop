"use server";

import { prisma } from "@/lib/prisma";
export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  images: {
    id: string;
    createdAt: Date;
    url: string;
    productId: string;
  }[];
};

// get a single product by id

export async function GetAproduct(id: string) {
  try {
    const res = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        images: true,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}

// get all categories
export async function GetAllCategories() {
  try {
    const res = await prisma.category.findMany();
    return res;
  } catch (error) {
    console.error(error);
  }
}
