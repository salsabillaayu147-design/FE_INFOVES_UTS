export default function DashboardIndex() {
  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full">

      {/* WELCOME CARD */}
      <div className="bg-linear-to-r from-[#7B1D3F] to-[#9F2951] rounded-[2.5rem] p-10 text-white shadow-xl">

        <h1 className="text-4xl font-bold">
          Dashboard Admin
        </h1>

        <p className="mt-3 text-white/80 text-lg max-w-2xl">
          Selamat datang di sistem manajemen festival. 
          Kelola kategori event, pembicara, dan seluruh kegiatan festival dengan mudah.
        </p>

      </div>
    </div>
  );
}