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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolios?limit=3`)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="portfolio"
      className="px-6 py-20 md:px-10"
      style={{
        background:
          "linear-gradient(90deg, #102F76 0%, #173A8A 40%, #477D7B 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="max-w-md">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Portofolio
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/85 md:text-base">
            Hasil produksi dengan standar kualitas tinggi dan detail premium.
          </p>
        </div>

        {/* SKELETON */}
        {loading && (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-[20px] bg-white/90 p-4 animate-pulse"
              >
                <div className="h-5 w-3/4 bg-slate-200 rounded mb-3" />
                <div className="h-4 w-full bg-slate-200 rounded mb-2" />
                <div className="h-4 w-5/6 bg-slate-200 rounded mb-4" />

                <div className="h-[185px] w-full bg-slate-200 rounded-[16px]" />
              </div>
            ))}
          </div>
        )}

        {/* CONTENT */}
        {!loading && (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {data.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.id}`}
                className="group block rounded-[20px] bg-[#F5F5F3] p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* TEXT */}
                <div>
                  <h3 className="text-[20px] font-semibold leading-snug text-slate-900 group-hover:text-[#102F76] transition">
                    {item.title} - {item.material}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* IMAGE */}
                {item.image_url && (
                  <div className="relative mt-5 overflow-hidden rounded-[16px]">
                    <img
                      src={getImageUrl(item.image_url)}
                      alt={item.title}
                      className="h-[185px] w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    {/* OVERLAY HOVER */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />

                    {/* ICON */}
                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#5D908B] text-white shadow-md transition duration-300 group-hover:scale-110">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* BUTTON */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-[#477D7B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#3c6b69]"
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