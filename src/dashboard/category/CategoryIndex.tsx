import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

export default function CategoryIndex() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/category`
      );

      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus kategori?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/category/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus kategori");
      }

      alert("Kategori berhasil dihapus!");
      fetchCategories();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus kategori");
    }
  };

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-8 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#7B1D3F]">
            Kategori Event
          </h2>

          <p className="text-gray-500">
            Kelola jenis kegiatan festival di sini
          </p>
        </div>

        <Link
          to="/dashboard/category/create"
          className="bg-[#7B1D3F] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#5a152e] transition-all shadow-lg text-center"
        >
          + Add New Category
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#7B1D3F] text-white">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Nama Kategori</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100">
                  <td className="px-6 py-4">{category.id}</td>

                  <td className="px-6 py-4 font-medium">
                    {category.name}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/dashboard/category/edit/${category.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-12 text-gray-400 italic"
                >
                  Belum ada data kategori tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}