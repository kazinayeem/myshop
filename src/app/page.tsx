import React from "react";
import { GetAllproduct } from "./action/action";

export default async function page() {
  const data = await GetAllproduct();
  if (!data?.items) return <div>Loading ....</div>;

  return (
    <div>
      {data.items.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}
