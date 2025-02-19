import Image from "next/image";
import { GetAllCategories } from "./action/action";
import Edit_Del_Button from "@/components/Edit_Del_Button";

export const dynamic = "force-dynamic";

const page = async () => {
  const categories = await GetAllCategories();
  if (!categories) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          All Categories
        </h2>
        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index}>
              <details className="bg-gray-200 p-4 rounded-lg">
                <summary className="cursor-pointer font-medium text-lg text-gray-700">
                  {category.name}
                </summary>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                  {category.products.map((product, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg shadow"
                    >
                      {/* fix image width 100 and h 100 */}
                      <div
                        className="flex justify-center 
                    items-center h-28 w-28 bg-gray-100 rounded-lg overflow-hidden
                    "
                      >
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                      </div>
                      <p className="text-center mt-2 font-medium text-gray-800">
                        {product.name}
                      </p>
                    </li>
                  ))}
                </ul>
                {/* edit and delete button */}
              </details>
              <Edit_Del_Button id={category.id} name={category.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
