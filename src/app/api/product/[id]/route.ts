import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    });
    if (!response) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching product:", error);
      return new Response("An error occurred", { status: 500 });
    }
  }
}
