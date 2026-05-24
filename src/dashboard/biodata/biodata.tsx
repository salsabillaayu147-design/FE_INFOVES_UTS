export default function Biodata() {
  return (
    <div className="p-8 bg-[#F3F4F6] min-h-full flex justify-center">

      <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">

        {/* HEADER */}
        <div className="bg-linear-to-r from-[#7B1D3F] to-[#9F2951] text-white p-10">

          <div className="flex flex-col md:flex-row items-center gap-8">

            {/* FOTO */}
            <img
              src="https://i.pinimg.com/1200x/39/66/9b/39669b3252029855bc2155e338115fac.jpg"
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-xl"
            />

            {/* TEXT */}
            <div>

              <h1 className="text-4xl font-bold">
                Salsabilla Ayu Rizkia
              </h1>

              <p className="text-white/80 text-lg mt-2">
                Mahasiswa D4 Teknik Informatika
              </p>

              <div className="flex flex-wrap gap-3 mt-5">

                <span className="bg-white/20 px-4 py-2 rounded-xl text-sm">
                  Fullstack Developer
                </span>

                <span className="bg-white/20 px-4 py-2 rounded-xl text-sm">
                  React Developer
                </span>

                <span className="bg-white/20 px-4 py-2 rounded-xl text-sm">
                  Prisma & Express
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-10">

          {/* BIODATA GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* CARD */}
            <div className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100">

              <h3 className="text-sm text-gray-400 mb-2">
                NIM
              </h3>

              <p className="text-xl font-bold text-[#7B1D3F]">
                24090043
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100">

              <h3 className="text-sm text-gray-400 mb-2">
                Program Studi
              </h3>

              <p className="text-xl font-bold text-[#7B1D3F]">
                D4 Teknik Informatika
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100">

              <h3 className="text-sm text-gray-400 mb-2">
                Fakultas
              </h3>

              <p className="text-xl font-bold text-[#7B1D3F]">
                Sekolah Vokasi
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100">

              <h3 className="text-sm text-gray-400 mb-2">
                Email
              </h3>

              <p className="text-xl font-bold text-[#7B1D3F] break-all">
                salsabillaAyu1407@gmail
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100">

              <h3 className="text-sm text-gray-400 mb-2">
                Asal Daerah
              </h3>

              <p className="text-xl font-bold text-[#7B1D3F]">
                Tegal, Jawa Tengah
              </p>

            </div>

            {/* CARD */}
            <div className="bg-[#F9FAFB] rounded-3xl p-6 border border-gray-100">

              <h3 className="text-sm text-gray-400 mb-2">
                Project
              </h3>

              <p className="text-xl font-bold text-[#7B1D3F]">
                Website Manajemen Event Invofest
              </p>

            </div>

          </div>

          {/* ABOUT */}
          <div className="mt-10 bg-[#F9FAFB] rounded-4xl p-8 border border-gray-100">

            <h2 className="text-2xl font-bold text-[#7B1D3F] mb-5">
              Tentang Saya
            </h2>

            <p className="text-gray-600 leading-relaxed text-lg">
              Saya adalah mahasiswa D4 Teknik Informatika di Universitas Harkat Negeri.
              Website ini dibuat sebagai tugas mata kuliah Pemrograman Web
              Fullstack menggunakan React, Express, Prisma, dan Zustand
              untuk mengelola data event, kategori, dan pembicara.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}