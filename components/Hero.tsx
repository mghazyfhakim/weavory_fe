"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { API_BASE_URL, getImageUrl } from "@/lib/api";
import Link from "next/link";

type HeroType = {
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
};

export default function Hero() {
  const [hero, setHero] = useState<HeroType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hero`)
      .then((res) => res.json())
      .then((res) => setHero(res.data))
      .catch(() => setError("Gagal mengambil data"))
      .finally(() => setLoading(false));
  }, []);

  if (!hero) {
    return (
      <section
        id="hero"
        className="relative overflow-hidden bg-white px-6 pb-20 pt-32 md:px-10 md:pt-36"
      >
        <div className="relative z-10 mx-auto h-[520px] max-w-7xl animate-pulse rounded-3xl bg-slate-100 p-10" />
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white px-6 pb-20 pt-32 md:px-10 md:pt-36"
    >

      <img
        src="/ornament-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-6 z-0 w-[170px] opacity-80 md:w-[210px]"
      />

      <img
        src="/ornament-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-6 z-0 w-[190px] opacity-80 md:w-[500px]"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.2em] text-slate-500">
            WEAVORY STUDIO
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            {hero.title?.split(" ").map((word, index) => {
              if (index === 1) {
                return (
                  <span key={index} className="text-[#102F76]">
                    {word}{" "}
                  </span>
                );
              }

              return <span key={index}>{word} </span>;
            })}
            <br />
            <span className="text-slate-900">{hero.subtitle}</span>
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-600 md:text-lg text-justify">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
  <Link
    href="/portfolio"
    className="group inline-flex items-center gap-3 rounded-full bg-[#102F76] px-6 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0c245a]"
  >
    Lihat Portofolio
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
      <ArrowRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </span>
  </Link>

  <Link
    href="/contact"
    className="inline-flex items-center rounded-full border border-[#102F76] px-6 py-3 text-sm font-medium text-[#102F76] transition duration-300 hover:bg-[#102F76] hover:text-white"
  >
    Hubungi Kami
  </Link>
</div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="h-[420px] w-full max-w-[380px] overflow-hidden rounded-[28px] shadow-xl">
            {hero.image_url ? (
              <img
                src={getImageUrl(hero.image_url)}
                alt={hero.title}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                No Image
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}