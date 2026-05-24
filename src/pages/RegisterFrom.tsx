import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

import InputText from "../components/ui/InputText";
import InputPassword from "../components/ui/InputPassword";
import Textarea from "../components/ui/TextArea";

const schema = z
  .object({
    nama: z.string().min(1, "Nama harus diisi"),

    nim: z
      .string()
      .min(1, "NIM harus diisi")
      .regex(/^[0-9]+$/, "NIM hanya boleh angka"),

    password: z.string().min(8, "Password minimal 8 karakter"),

    confirmPassword: z
      .string()
      .min(1, "Konfirmasi password wajib diisi"),

    bio: z
      .string()
      .min(1, "Bio wajib diisi")
      .max(100, "Bio maksimal 100 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);

    const userToSave = {
      nama: data.nama,
      nim: data.nim,
      password: data.password,
      bio: data.bio,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(userToSave)
    );

    setTimeout(() => {
      alert("Registrasi berhasil!");
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4 py-10">
      <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#7B1D3F] mb-1">
            Daftar Akun
          </h1>

          <p className="text-gray-400 text-sm">
            Lengkapi data untuk bergabung di Invofest
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText
            label="Nama Lengkap"
            nama="nama"
            register={register}
            error={errors.nama?.message}
          />

          <InputText
            label="NIM"
            nama="nim"
            register={register}
            error={errors.nim?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputPassword
              label="Password"
              nama="password"
              register={register}
              error={errors.password?.message}
            />

            <InputPassword
              label="Konfirmasi Password"
              nama="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Textarea
            label="Bio Singkat"
            nama="bio"
            register={register}
            error={errors.bio?.message}
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#7B1D3F] hover:bg-[#5a152e] text-white py-4 rounded-2xl font-bold transition-all shadow-md ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {loading ? "Memproses..." : "Daftar Sekarang"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-8 text-gray-500">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-[#7B1D3F] font-bold hover:underline"
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}