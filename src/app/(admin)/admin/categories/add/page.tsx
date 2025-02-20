import { AddCategory } from "../action/action";

const Page = () => {
  const AddCategoryHandeler = async (formData: FormData) => {
    "use server";
    const { error, message } = await AddCategory(formData);
    if (error) {
      alert(error);
    }
    alert(message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Add Category
        </h2>
        <form className="space-y-4" action={AddCategoryHandeler}>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
