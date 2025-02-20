import { GetAproduct } from "@/app/action/action";
import ProductPage from "./SingleProduct";

export default async function ProductPageWrapper({
  params,
}: {
  params: { id: string };
}) {
  try {
    if (!params?.id) throw new Error("Invalid product ID");

    const product = await GetAproduct(params.id);

    if (!product) {
      return (
        <div className="text-center py-10 text-gray-500 flex flex-row justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Product not found
          </h1>
        </div>
      );
    }

    return <ProductPage product={product} />;
  } catch (error) {
    return (
      <div className="text-center py-10 text-red-500 flex flex-row justify-center items-center">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p>{(error as Error).message || "An error occurred"}</p>
      </div>
    );
  }
}
