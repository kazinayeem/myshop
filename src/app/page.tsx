import Filter from "@/components/filter";
import ProductList from "@/components/Products";

interface SearchParams {
  page?: string;
  pageSize?: string;
  categoryName?: string;
  name?: string;
  sortOrder?: string;
}


export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = parseInt(searchParams.pageSize || "10");
  const categoryName = searchParams.categoryName || "";
  const name = searchParams.name || "";
  const sortOrder = searchParams.sortOrder || "asc";

  return (
    <div className="container mx-auto">
      <Filter />
      <ProductList
        page={page}
        pageSize={pageSize}
        categoryName={categoryName}
        name={name}
        sortOrder={sortOrder}
      />
    </div>
  );
}
