import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Speaker {
  id: number;
  name: string;
  role: string;
}

export default function SeminarIndex() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    fetchSpeakers();
  }, []);

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

  const deleteSpeaker = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus speaker?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/speaker/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus speaker");
      }

      alert("Speaker berhasil dihapus!");
      fetchSpeakers();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus speaker");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7B1D3F]">
            Seminar & Pembicara
          </h1>

          <p className="text-gray-500 text-sm">
            Kelola narasumber acara
          </p>
        </div>

        <Link
          to="/dashboard/seminar/speaker"
          className="bg-[#7B1D3F] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#5a152e] transition-all shadow-lg"
        >
          + Add New Speaker
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#7B1D3F] text-white">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Nama</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {speakers.length > 0 ? (
              speakers.map((speaker) => (
                <tr key={speaker.id} className="border-b border-gray-100">
                  <td className="px-6 py-4">{speaker.id}</td>

                  <td className="px-6 py-4 font-medium">{speaker.name}</td>

                  <td className="px-6 py-4">{speaker.role}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/dashboard/seminar/speaker/edit/${speaker.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteSpeaker(speaker.id)}
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
                  colSpan={4}
                  className="text-center py-12 text-gray-400 italic"
                >
                  Belum ada data pembicara tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}