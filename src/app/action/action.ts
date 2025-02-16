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
    return null;
  }
}

// get all prodct with pagination and include category and images and filter
export async function GetAllproduct(
  // page: number = 1,
  // pageSize: number = 10,
  categoryName?: string,
  name?: string,
  sortOrder?: "asc" | "desc"
) {
  try {
    const totalCount = await prisma.product.count({
      where: {
        AND: [
          categoryName
            ? {
                category: {
                  name: { contains: categoryName },
                },
              }
            : {},
          name ? { name: { contains: name } } : {},
        ],
      },
    });

    const data = await prisma.product.findMany({
      where: {
        AND: [
          categoryName
            ? {
                category: {
                  name: { contains: categoryName },
                },
              }
            : {},
          name ? { name: { contains: name } } : {},
        ],
      },
      orderBy: sortOrder
        ? { price: sortOrder === "asc" ? "asc" : "desc" }
        : undefined,
      include: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        images: {
          select: {
            url: true,
          },
        },
      },
      // skip: (page - 1) * pageSize,
      // take: pageSize,
    });

    return {
      items: data,
      totalCount: totalCount,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error);
      return null;
    }
  }
}

// create a new product
export async function CreateProduct(product: {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
}) {
  try {
    const res = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        images: {
          create: product.images.map((url) => ({
            url: url,
          })),
        },
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
