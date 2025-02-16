import { Product } from "@/type/type";
import ShowProduct from "./ShowProduct";
import { GetAllproduct } from "@/app/action/action";

interface ProductListProps {
  page: number;
  pageSize: number;
  categoryName: string;
  name: string;
  sortOrder: string;
}

export const dynamic = "force-dynamic";

export default async function ProductList({
  page,
  pageSize,
  categoryName,
  name,
  sortOrder,
}: ProductListProps) {
  const res = await GetAllproduct(
    page,
    pageSize,
    categoryName,
    name,
    sortOrder as "asc" | "desc"
  );

  if (!res) return <div>No Products Found</div>;
  const products = res?.items;
  return (
    <div>
      <h2>Filtered Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product: Product) => (
          <ShowProduct key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
