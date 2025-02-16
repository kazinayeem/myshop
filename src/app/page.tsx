 
import React from "react";
import { GetAllproduct } from "./action/action";


export const dynamic = "force-dynamic";
export default async function page() {
  const result = await GetAllproduct();
  if (!result || !result.items) {
    return <div>loading...</div>;
  }
  const items = result.items;
  return (
    <div>
      <h1>Products</h1>
      <div className="flex flex-wrap">
        {items?.map((item) => {
          return (
            <div
              // 1 row 3 column
              className="w-1/3 p-4
                border border-gray-300 shadow-md bg-green-500 text-white
              "
              key={item.id}
            >
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
      {/* <Products /> */}
    </div>
  );
}
