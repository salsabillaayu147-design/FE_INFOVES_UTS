# Invofest Management System

> Tugas Mata Kuliah Pemrograman Web 2 - Aplikasi Manajemen Event Festival, Kategori, dan Pembicara.

Aplikasi web full-stack yang dirancang untuk mengelola data kegiatan festival (Invofest), meliputi manajemen data **Event** (Seminar, Workshop, Competition, Talkshow), data **Kategori**, serta data **Pembicara (Speaker)**.

---

# 🔗 Link Demo Live

- **Frontend (Vercel):** https://fe-infoves-uts-i1ah.vercel.app
- **Backend API (Railway):** https://https://beinfoves-production.up.railway.app

---

# ✨ Fitur Utama

## 1. Autentikasi & Proteksi Halaman
- Login & Register menggunakan validasi NIM dan Password.
- Protected Routes untuk mencegah user yang belum login masuk ke Dashboard.
- State login disimpan menggunakan Zustand & localStorage.

## 2. Dashboard Dinamis
- Sidebar navigasi interaktif.
- Active menu otomatis berdasarkan route halaman.

## 3. Manajemen Kategori (CRUD)
- Menampilkan data kategori event.
- Menambah kategori baru.
- Mengedit kategori.
- Menghapus kategori.

## 4. Manajemen Pembicara / Speaker (CRUD)
- Menampilkan data pembicara seminar.
- Menambahkan data speaker.
- Mengedit speaker.
- Menghapus speaker.

## 5. Manajemen Event (CRUD)
- Menampilkan seluruh data event festival.
- Relasi data antara Event, Kategori, dan Speaker menggunakan PostgreSQL.
- Menambah event baru.
- Mengedit event.
- Menghapus event.

## 6. Halaman Biodata Pengembang
- Menampilkan profil mahasiswa pengembang aplikasi.
- Menampilkan foto dan data diri.

---

# 🛠️ Tech Stack

## Frontend (Client)

- Framework: React.js (Vite + TypeScript)
- Routing: React Router DOM v6
- Form Handling: React Hook Form
- Validation: Zod Schema Validation
- State Management: Zustand
- Styling: Tailwind CSS

## Backend (Server)

- Runtime & Framework: Node.js + Express.js (TypeScript)
- ORM: Prisma ORM
- Database: Supabase PostgreSQL
- Deployment: Railway (Backend) & Vercel (Frontend)

---

# 📁 Struktur Folder Frontend

```bash
src/
├── components/
├── dashboard/
├── layout/
├── pages/
├── store/
├── routes/
└── types/
```

---

# 📁 Struktur Folder Backend

```bash
src/
├── controllers/
├── routes/
├── lib/
└── types/
```

---

# ⚙️ Cara Menjalankan Project

## Frontend

```bash
npm install
npm run dev
```

## Backend

```bash
npm install
npm run dev
```

---

# 👩‍💻 Developer

**Salsabilla Ayu Rizkia**  
Mahasiswa Teknik Informatika  
Universitas Harkat Negeri
