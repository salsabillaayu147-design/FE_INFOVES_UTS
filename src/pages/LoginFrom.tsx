import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

// Import komponen UI
import InputText from "../components/ui/InputText";
import InputPassword from "../components/ui/InputPassword";
import Button from "../components/ui/Button";
import { authStore } from "../store/authStore";

// Schema validasi
const schema = z.object({
  nim: z.string().trim().min(1, "NIM wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
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
    if (loading) return;

    setLoading(true);

    const cleanNim = data.nim.trim();
    const cleanPassword = data.password.trim();

    // Login manual sesuai ketentuan kredensial tugas
    if (
      cleanNim === "24090043" &&
      cleanPassword === "Salsabilla123"
    ) {
      // PERBAIKAN: Hapus localStorage manual, serahkan token/session ke fungsi store zustand
      authStore.getState().login(cleanNim);

      alert("Login berhasil!");

      navigate("/dashboard");
    } else {
      alert("NIM atau password salah!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4">
      <div className="w-full max-w-112.5 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-[#7B1D3F] mb-3">
          Selamat Datang!
        </h1>

        <p className="text-gray-500 mb-10">
          Silakan login untuk melanjutkan
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-left space-y-6"
        >
          <InputText
            label="NIM"
            nama="nim"
            register={register}
            error={errors.nim?.message}
          />

          <InputPassword
            label="Password"
            nama="password"
            register={register}
            error={errors.password?.message}
          />

          <div className="pt-4">
            <Button
              label={loading ? "Loading..." : "Login"}
              variant="primary"
              className="w-full bg-[#7B1D3F] hover:bg-[#631732] text-white py-4 rounded-xl transition-all duration-300 font-bold text-lg shadow-md disabled:opacity-50"
            />
          </div>
        </form>

        {/* Register */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-[#7B1D3F] font-bold hover:underline"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}