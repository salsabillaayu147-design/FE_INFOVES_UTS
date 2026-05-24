import { useEffect } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import InputText from "../../components/ui/InputText";

import Button from "../../components/ui/Button";

// TYPE
type FormData = {
  name: string;
  role: string;
};

// VALIDATION
const schema = z.object({
  name: z.string().min(
    1,
    "Nama wajib diisi"
  ),

  role: z.string().min(
    1,
    "Role wajib diisi"
  ),
});

export default function SpeakerEdit() {

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

  // FETCH SPEAKER
  useEffect(() => {

    fetchSpeaker();

  }, []);

  const fetchSpeaker = async () => {

    try {

      // MENGGUNAKAN ENV VARIABLE UNTUK GET SPEAKER DETAIL
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/speakers/${id}`
      );

      const data = await response.json();

      setValue("name", data.name);

      setValue("role", data.role);

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE SPEAKER
  const onSubmit = async (
    data: FormData
  ) => {

    try {

      // MENGGUNAKAN ENV VARIABLE UNTUK UPDATE SPEAKER (PUT)
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/speakers/${id}`,
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
          "Gagal update speaker"
        );
      }

      alert("Speaker berhasil diupdate!");

      navigate("/dashboard/seminar");

    } catch (error) {

      console.log(error);

      alert("Gagal update speaker");
    }
  };

  return (
    <div className="p-8 flex justify-center bg-[#F3F4F6] min-h-full">

      <div className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-[#7B1D3F]">
            Edit Speaker
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Update data pembicara
          </p>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >

          <InputText
            label="Nama Speaker"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <InputText
            label="Role"
            nama="role"
            register={register}
            error={errors.role?.message}
          />

          <Button
            label="Update Speaker"
            variant="primary"
            className="w-full bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-4 rounded-2xl font-bold shadow-md transition-all"
          />

        </form>

      </div>

    </div>
  );
}