"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { API_BASE_URL, getImageUrl } from "@/lib/api";

type HeroType = {
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
};

export default function Hero() {
  const [hero, setHero] = useState<HeroType | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hero`)
      .then((res) => res.json())
      .then((data) => setHero(data))
      .catch((err) => console.error("Failed to fetch hero:", err));
  }, []);

  if (!hero) {
    return (
      <section
        id="hero"
        className="bg-white px-6 pb-20 pt-32 md:px-10 md:pt-36"
      >
        <div className="mx-auto max-w-7xl animate-pulse rounded-3xl bg-slate-100 p-10 h-[520px]" />
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="bg-white px-6 pb-20 pt-32 md:px-10 md:pt-36"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.2em] text-slate-500">
            WEAVORY STUDIO
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            {hero.title?.split(" ").map((word, index) => {
              if (index === 1) {
                return (
                  <span key={index} className="text-primary-blue">
                    {word}{" "}
                  </span>
                );
              }

              return <span key={index}>{word} </span>;
            })}
            <br />
            <span className="text-slate-900">{hero.subtitle}</span>
          </h1>

          <p className="mt-6 text-base leading-7 text-slate-600 md:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 rounded-full bg-[#102F76] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#0c245a]"
            >
              Lihat Portofolio
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-[#102F76] px-6 py-3 text-sm font-medium text-[#102F76] transition hover:bg-[#102F76] hover:text-white"
            >
              Hubungi Kami
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={getImageUrl(hero.image_url)}
            alt={hero.title}
            className="h-[420px] w-full max-w-[380px] rounded-[28px] object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}