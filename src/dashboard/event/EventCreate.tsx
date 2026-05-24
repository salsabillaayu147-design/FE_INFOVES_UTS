import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import InputText from "../../components/ui/InputText";
import InputSelectEvent from "../../components/ui/Select";
import InputDate from "../../components/ui/InputDate";
import Textarea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";

interface Category {
  id: number;
  name: string;
}

interface Speaker {
  id: number;
  name: string;
}

const schema = z.object({
  name: z.string().min(1, "Nama event wajib diisi"),
  location: z.string().min(1, "Lokasi wajib diisi"),
  categoryId: z.number().min(1, "Kategori wajib dipilih"),
  speakerId: z.number().min(1, "Speaker wajib dipilih"),
  dateEvent: z.string().min(1, "Tanggal wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
});

type FormData = z.infer<typeof schema>;

export default function EventCreate() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchCategories();
    fetchSpeakers();
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

  const fetchSpeakers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/speaker`
      );

      const data = await response.json();

      setSpeakers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            location: data.location,
            categoryId: data.categoryId,
            speakerId: data.speakerId,
            dateEvent: data.dateEvent,
            description: data.description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menambahkan event");
      }

      alert("Event berhasil ditambahkan!");
      navigate("/dashboard/event");
    } catch (error) {
      console.log(error);
      alert("Gagal menambahkan event");
    }
  };

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full flex justify-center">
      <div className="w-full max-w-3xl bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-[#7B1D3F] mb-8 border-b border-gray-50 pb-4">
          New Event
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputText
            label="Nama Event"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <InputText
            label="Lokasi"
            nama="location"
            register={register}
            error={errors.location?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputSelectEvent
              label="Kategori"
              nama="categoryId"
              register={register}
              setValue={setValue}
              options={categories}
              error={errors.categoryId?.message}
              placeholder="-- Pilih Kategori --"
            />

            <InputSelectEvent
              label="Speaker"
              nama="speakerId"
              register={register}
              setValue={setValue}
              options={speakers}
              error={errors.speakerId?.message}
              placeholder="-- Pilih Speaker --"
            />
          </div>

          <InputDate
            label="Tanggal Event"
            nama="dateEvent"
            register={register}
            setValue={setValue}
            error={errors.dateEvent?.message}
          />

          <Textarea
            label="Deskripsi"
            nama="description"
            register={register}
            error={errors.description?.message}
          />

          <div className="pt-4">
            <Button
              label="Add Event"
              variant="primary"
              className="w-full md:w-auto bg-[#7B1D3F] hover:bg-[#5a152e] text-white px-12 py-4 rounded-2xl font-bold shadow-lg transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
}