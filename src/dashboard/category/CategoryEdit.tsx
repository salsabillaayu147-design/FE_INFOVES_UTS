import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { z } from "zod";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import InputText from "../../components/ui/InputText";

import Button from "../../components/ui/Button";

// TYPE
type FormData = {
  name: string;
};

// VALIDATION
const schema = z.object({
  name: z.string().min(
    1,
    "Nama category wajib diisi"
  ),
});

export default function CategoryEdit() {

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // FETCH CATEGORY BY ID
  useEffect(() => {

    fetchCategory();

  }, [id]);

  const fetchCategory = async () => {

    try {

      // MENGGUNAKAN ENV VARIABLE UNTUK GET CATEGORY DETAIL
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories/${id}`
      );

      const data = await response.json();

      setValue("name", data.name);

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE CATEGORY
  const onSubmit = async (
    data: FormData
  ) => {

    try {

      // MENGGUNAKAN ENV VARIABLE UNTUK UPDATE CATEGORY (PUT)
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/categories/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Gagal update category"
        );
      }

      alert("Category berhasil diupdate!");

      navigate("/dashboard/category");

    } catch (error) {

      console.log(error);

      alert("Gagal update category");
    }
  };

  return (
    <div className="p-8 flex justify-center bg-[#F3F4F6] min-h-full">

      <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">

        <h2 className="text-2xl font-bold text-[#7B1D3F] mb-8 border-b border-gray-50 pb-4">
          Edit Category
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >

          <InputText
            label="Nama Kategori"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <Button
            label="Update Category"
            variant="primary"
            className="w-full bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-4 rounded-2xl font-bold shadow-md transition-all"
          />

        </form>

      </div>

    </div>
  );
}