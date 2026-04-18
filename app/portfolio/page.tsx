"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_BASE_URL, getImageUrl } from "@/lib/api";

type PortfolioType = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  material: string;
};

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolios`)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch(() => setError("Gagal mengambil data"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <div className="mb-10 flex items-center gap-3 text-sm text-slate-500">
          <Link href="/" className="text-[#477D7B] hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700">Portofolio</span>
        </div>

        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-slate-900">Portofolio</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            Beberapa hasil produksi yang dikerjakan dengan detail dan standar
            kualitas Weavory Studio.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <article
              key={item.id}
              className="rounded-[18px] border border-slate-100 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)]"
            >
              <div className="mx-auto w-full max-w-[220px]">
                <div className="relative">
                  <div  />

                  <div className="relative z-10 overflow-hidden rounded-[14px] pt-5">
                    <img
                      src={getImageUrl(item.image_url)}
                      alt={item.title}
                      className="h-[180px] w-full rounded-[14px] object-cover"
                    />
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-base font-medium text-slate-800">
                    {item.title} {item.material}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>

                  <Link href={`/portfolio/${item.id}`}>
                    <button className="mt-3 text-xs font-medium text-[#173A8A] hover:underline">
                      Detail produk
                    </button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}