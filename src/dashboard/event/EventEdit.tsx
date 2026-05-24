import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import InputText from "../../components/ui/InputText";
import InputSelectEvent from "../../components/ui/Select";
import InputDate from "../../components/ui/InputDate";
import Textarea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";

// TYPE CATEGORY
interface Category {
  id: number;
  name: string;
}

// TYPE SPEAKER
interface Speaker {
  id: number;
  name: string;
}

// VALIDATION
const schema = z.object({
  name: z.string().min(1, "Nama event wajib diisi"),

  location: z.string().min(1, "Lokasi wajib diisi"),

  categoryId: z.preprocess(
    (value) => Number(value),
    z.number().min(1, "Kategori wajib dipilih")
  ),

  speakerId: z.preprocess(
    (value) => Number(value),
    z.number().min(1, "Speaker wajib dipilih")
  ),

  dateEvent: z.string().min(1, "Tanggal wajib diisi"),

  description: z.string().min(1, "Deskripsi wajib diisi"),
});

type FormData = z.infer<typeof schema>;

export default function EventEdit() {

  const navigate = useNavigate();

  const { id } = useParams();

  // STATE
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [speakers, setSpeakers] =
    useState<Speaker[]>([]);

  // FORM
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
  });

  // FETCH DATA
  useEffect(() => {

    fetchCategories();

    fetchSpeakers();

    fetchEvent();

  }, []);

  // FETCH CATEGORY
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

  // FETCH SPEAKER
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

  // FETCH EVENT BY ID
  const fetchEvent = async () => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/event/${id}`
      );

      const data = await response.json();

      setValue("name", data.name);

      setValue("location", data.location);

      setValue("categoryId", data.categoryId);

      setValue("speakerId", data.speakerId);

      setValue(
        "dateEvent",
        data.dateEvent.split("T")[0]
      );

      setValue(
        "description",
        data.description
      );

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE EVENT
  const onSubmit: SubmitHandler<FormData> = async (
    data
  ) => {

    try {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/event/${id}`,
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
          "Gagal update event"
        );
      }

      alert("Event berhasil diupdate!");

      navigate("/dashboard/event");

    } catch (error) {

      console.log(error);

      alert("Gagal update event");
    }
  };

  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full flex justify-center">

      <div className="w-full max-w-3xl bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">

        <h2 className="text-3xl font-bold text-[#7B1D3F] mb-8 border-b border-gray-50 pb-4">
          Edit Event
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

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

          <Button
            label="Update Event"
            variant="primary"
            className="w-full md:w-auto bg-[#7B1D3F] hover:bg-[#5a152e] text-white px-12 py-4 rounded-2xl font-bold shadow-lg transition-all"
          />

        </form>

      </div>

    </div>
  );
}