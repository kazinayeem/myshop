import { GetAproduct } from "@/app/action/action";
import ProductPage from "./SingleProduct";

export default async function ProductPageWrapper({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await GetAproduct(id);

  if (!product) {
    return (
      <div className="text-center py-10 text-gray-500 flex flex-row justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900">Product not found</h1>
      </div>
    );
  }

  return <ProductPage product={product} />;
}
