"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { API_BASE_URL, getImageUrl } from "@/lib/api";
import Link from "next/link";

type PortfolioType = {
  id: number;
  title: string;
  description: string;
  material: string; 
  image_url?: string;
};

export default function Portfolio() {
  const [data, setData] = useState<PortfolioType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  fetch(`${API_BASE_URL}/api/portfolios?limit=3`)
    .then((res) => res.json())
    .then((res) => setData(res.data))
    .catch(() => setError("Gagal mengambil data"))
    .finally(() => setLoading(false));
}, []);

  return (
    <section
      id="portfolio"
      className="px-6 py-20 md:px-10"
      style={{
        background:
          "linear-gradient(90deg, #173A8A 0%, #1A3F90 45%, #4E8A87 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Portofolio
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/85 md:text-base">
            Hasil produksi yang dikerjakan dengan detail dan standar kualitas
            tinggi.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <article
              key={item.id}
              className="rounded-[20px] bg-[#F5F5F3] p-4 shadow-sm transition duration-300 hover:-translate-y-1"
            >
              <div>
                <h3 className="text-[20px] font-semibold leading-snug text-slate-900">
                  {item.title} - {item.material}
                </h3>



                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>

              {item.image_url && (
                <div className="relative mt-5 overflow-hidden rounded-[16px]">
                  <img
                    src={getImageUrl(item.image_url)}
                    alt={item.title}
                    className="h-[185px] w-full object-cover"
                  />
                  <Link href={`/portfolio/${item.id}`}>
                  <button
                    className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#6FA29C] text-white shadow-md transition hover:scale-105 hover:bg-[#5B8F89]"
                    aria-label={`Lihat detail ${item.title}`}
                  >
                    <ArrowUpRight size={16} />
                  </button>
                  </Link>
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-[#5D908B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4C7B77]"
          >
            Lihat Lebih Banyak
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20">
              <ArrowUpRight size={12} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}