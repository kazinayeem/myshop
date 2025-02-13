import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categoryName = searchParams.get("categoryName");
  const name = searchParams.get("name");
  const sortOrder = searchParams.get("sortOrder");
  const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10); // Default to 10 items per page

  try {
    // Get the total count of products matching the filters
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

    // Fetch the paginated products
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
      skip: (page - 1) * pageSize, // Skip items for previous pages
      take: pageSize, // Limit the number of items per page
    });

    return NextResponse.json({
      items: data, // The paginated list of products
      totalCount: totalCount, // The total number of products (for pagination)
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error);
      return NextResponse.error();
    }
  }
}

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const categoryName = searchParams.get("categoryName");
//   const name = searchParams.get("name");
//   const sortOrder = searchParams.get("sortOrder");

//   try {
//     const data = await prisma.product.findMany({
//       where: {
//         AND: [
//           categoryName
//             ? {
//                 category: {
//                   name: { contains: categoryName },
//                 },
//               }
//             : {},
//           name ? { name: { contains: name } } : {},
//         ],
//       },
//       orderBy: sortOrder
//         ? { price: sortOrder === "asc" ? "asc" : "desc" }
//         : undefined,
//       include: {
//         category: {
//           select: {
//             name: true,
//             id: true,
//           },
//         },
//         images: {
//           select: {
//             url: true,
//           },
//         },
//       },
//       take: 10,
//     });
//     return NextResponse.json(data);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Error fetching products:", error);
//       return NextResponse.error();
//     }
//   }
// }

// add a new product

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const categoryName = searchParams.get("categoryName");
//   const name = searchParams.get("name");
//   const sortOrder = searchParams.get("sortOrder");
//   const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided
//   const pageSize = parseInt(searchParams.get("pageSize") || "10", 10); // Default to 10 items per page

//   try {
//     const data = await prisma.product.findMany({
//       where: {
//         AND: [
//           categoryName
//             ? {
//                 category: {
//                   name: { contains: categoryName },
//                 },
//               }
//             : {},
//           name ? { name: { contains: name } } : {},
//         ],
//       },
//       orderBy: sortOrder
//         ? { price: sortOrder === "asc" ? "asc" : "desc" }
//         : undefined,
//       include: {
//         category: {
//           select: {
//             name: true,
//             id: true,
//           },
//         },
//         images: {
//           select: {
//             url: true,
//           },
//         },
//       },
//       skip: (page - 1) * pageSize, // Skip items for previous pages
//       take: pageSize, // Limit the number of items per page
//     });

//     return NextResponse.json(data);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Error fetching products:", error);
//       return NextResponse.error();
//     }
//   }
// }

export async function POST(request: NextRequest) {
  try {
    const { name, description, price, stock, categoryId, images } =
      await request.json();
    const data = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
        images: {
          create: images,
        },
      },
      include: {
        category: true,
        images: true,
      },
    });
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating product:", error);
      return NextResponse.error();
    }
  }
}
