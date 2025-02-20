"use server";

import { prisma } from "@/lib/prisma";

//  add category

export const AddCategory = async (formData: FormData) => {
  const name = formData.get("category") as string;

  // already exist
  const category = await prisma.category.findFirst({
    where: {
      name,
    },
  });
  if (category) {
    return {
      error: "Category already exist",
    };
  }
  await prisma.category.create({
    data: {
      name,
    },
  });
  return { message: "Category added successfully" };
};

// show category

export const GetAllCategories = async () => {
  const res = await prisma.category.findMany({
    include: {
      products: {
        include: {
          images: true,
        },
      },
    },
  });
  return res;
};
// edit category

export const UpdateCategory = async (id: string, name: string) => {
  const res = await prisma.category.update({
    where: { id },
    data: {
      name,
    },
  });
  return res;
};
// delete category

export const DeleteCategory = async (id: string) => {
  const res = await prisma.category.delete({
    where: { id },
  });
  return res;
};
// get category by id

export const GetCategoryById = async (id: string) => {
  const res = await prisma.category.findUnique({
    include: {
      products: true,
    },
    where: { id },
  });
  return res;
};
