"use client";

import React, { useEffect } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

import Image from "next/image";
import { GetAllproduct } from "@/app/action/action";
import { Product } from "@/type/type";

export function ProductTable() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    GetAllproduct(
      page,
      pageSize,
      category,
      search,
      sorting[0]?.desc ? "desc" : "asc"
    )
      .then((res) => {
        if (res) {
          setProducts(res.items as Product[]);
          setTotalPages(Math.ceil((res.totalCount as number) / pageSize));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [page, search, category, sorting]);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.original.category.name}</div>,
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        return (
          <div className="text-right font-medium">${price.toFixed(2)}</div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("stock")}</div>
      ),
    },
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const images = row.original.images;
        return images.length > 0 ? (
          <Image
            width={48}
            height={48}
            src={images[0].url}
            alt="Product"
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <span>No Image</span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return (
    <div className="w-full">
      {/* Search and Filters */}
      <div className="flex items-center py-4 space-x-2">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filter by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
