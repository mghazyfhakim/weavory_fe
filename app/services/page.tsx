"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { API_BASE_URL, getImageUrl } from "@/lib/api";
import { motion } from "framer-motion";

type ServiceType = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

type MaterialType = {
  id: number;
  title: string;
  description: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 FIX FETCH (no double loading bug)
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/services`).then((res) => res.json()),
      fetch(`${API_BASE_URL}/api/materials`).then((res) => res.json()),
    ])
      .then(([servicesRes, materialsRes]) => {
        setServices(servicesRes.data);
        setMaterials(materialsRes.data);
      })
      .catch(() => setError("Gagal mengambil data"))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />

        <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">

          <div className="mb-10 flex gap-3">
            <div className="h-3 w-16 bg-slate-300 rounded shimmer" />
            <div className="h-3 w-4 bg-slate-300 rounded shimmer" />
            <div className="h-3 w-20 bg-slate-300 rounded shimmer" />
          </div>

          <div className="max-w-lg">
            <div className="h-8 w-48 bg-slate-300 rounded shimmer" />
            <div className="mt-4 h-4 w-full bg-slate-300 rounded shimmer" />
            <div className="mt-2 h-4 w-3/4 bg-slate-300 rounded shimmer" />
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">

            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex gap-5 rounded-2xl bg-white p-4 border border-slate-200"
                >
                  <div className="w-10 h-10 bg-slate-300 rounded shimmer" />

                  <div className="flex-1">
                    <div className="h-4 w-32 bg-slate-300 rounded shimmer" />
                    <div className="mt-2 h-3 w-full bg-slate-300 rounded shimmer" />
                    <div className="mt-1 h-3 w-3/4 bg-slate-300 rounded shimmer" />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
              <div className="h-12 bg-slate-300 shimmer" />

              <div className="space-y-6 p-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-slate-300 shimmer" />

                    <div className="flex-1">
                      <div className="h-4 w-32 bg-slate-300 rounded shimmer" />
                      <div className="mt-2 h-3 w-full bg-slate-300 rounded shimmer" />
                      <div className="mt-1 h-3 w-3/4 bg-slate-300 rounded shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // 🟢 DATA READY
  return (
    <motion.main
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <div className="mb-10 flex items-center gap-3 text-sm text-slate-500">
          <Link href="/" className="text-[#477D7B] hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700">Layanan</span>
        </div>

        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-slate-900">
            Layanan Kami
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            Kami menyediakan layanan jahit dan produksi apparel dengan detail tinggi dan kualitas konsisten.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">

          <div className="space-y-6">
            {services.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 items-center rounded-2xl bg-white p-4 shadow-sm border border-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={getImageUrl(item.icon)}
                  className="max-h-10 max-w-10 object-contain"
                />

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">

            <div className="bg-gradient-to-r from-[#102F76] to-[#477D7B] px-6 py-4 text-white font-medium text-center">
              Material yang Kami Gunakan
            </div>

            <div className="space-y-6 p-6">
              {materials.map((item, index) => (
                <div key={item.id} className="flex gap-4">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#102F76] text-white text-sm">
                    {index + 1}
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500 text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </motion.main>
  );
}