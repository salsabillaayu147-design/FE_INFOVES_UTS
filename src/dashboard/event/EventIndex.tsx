import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface EventType {
  id: number;
  name: string;
  location: string;
  dateEvent: string;
  description: string;

  category: {
    id: number;
    name: string;
  };

  speaker: {
    id: number;
    name: string;
  };
}

export default function EventIndex() {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/event`);

      const data = await response.json();

      setEvents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus event ini?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/event/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus event");
      }

      alert("Event berhasil dihapus!");
      fetchEvents();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus event");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7B1D3F]">
            Event
          </h1>

          <p className="text-gray-500 text-sm">
            Daftar semua kegiatan festival
          </p>
        </div>

        <Link
          to="/dashboard/event/new"
          className="bg-[#7B1D3F] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#5a152e] transition-all shadow-lg"
        >
          + Add New Event
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#7B1D3F] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Nama Event</th>
              <th className="px-6 py-4 text-left">Lokasi</th>
              <th className="px-6 py-4 text-left">Kategori</th>
              <th className="px-6 py-4 text-left">Speaker</th>
              <th className="px-6 py-4 text-left">Tanggal</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">{event.name}</td>

                  <td className="px-6 py-4">{event.location}</td>

                  <td className="px-6 py-4">{event.category?.name}</td>

                  <td className="px-6 py-4">{event.speaker?.name}</td>

                  <td className="px-6 py-4">
                    {new Date(event.dateEvent).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <Link
                      to={`/dashboard/event/edit/${event.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-12 text-gray-400 italic"
                >
                  Belum ada data event tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 