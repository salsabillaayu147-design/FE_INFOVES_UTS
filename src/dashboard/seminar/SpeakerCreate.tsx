import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import InputText from "../../components/ui/InputText";
import Button from "../../components/ui/Button";

type FormData = {
  name: string;
  role: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  role: z.string().min(1, "Role harus diisi"),
});

export default function SpeakerCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/speaker`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            role: data.role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menambahkan speaker");
      }

      alert("Speaker berhasil ditambahkan!");
      navigate("/dashboard/seminar");
    } catch (error) {
      console.log(error);
      alert("Gagal menambahkan speaker");
    }
  };

  return (
    <div className="p-8 flex justify-center bg-[#F3F4F6] min-h-full">
      <div className="w-full max-w-lg bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#7B1D3F]">
            Tambah Speaker
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Lengkapi informasi narasumber baru
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputText
            label="Nama Lengkap Speaker"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <InputText
            label="Jabatan / Role"
            nama="role"
            register={register}
            error={errors.role?.message}
          />

          <div className="pt-4">
            <Button
              label="Simpan Speaker"
              variant="primary"
              className="w-full bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-4 rounded-2xl font-bold shadow-md transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
}