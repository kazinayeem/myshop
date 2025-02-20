"use server";

import { prisma } from "@/lib/prisma";

//  add category

export const AddCategory = async (formData: FormData) => {
  const name = formData.get("category") as string;
  await prisma.category.create({
    data: {
      name,
    },
  });
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
      products: {
        include: {
          images: true,
        },
      },
    },
    where: { id },
  });
  return res;
};
