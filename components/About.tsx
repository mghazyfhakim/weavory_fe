"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "@/lib/api";

type AboutType = {
  title: string;
  description: string;
  image_url: string;
};

export default function About() {
  const [about, setAbout] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/about`)
      .then((res) => res.json())
      .then((res) => setAbout(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="about" className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-slate-200 rounded shimmer" />
            <div className="h-8 w-1/2 bg-slate-200 rounded shimmer" />

            <div className="mt-6 space-y-3">
              <div className="h-3 w-full bg-slate-200 rounded shimmer" />
              <div className="h-3 w-full bg-slate-200 rounded shimmer" />
              <div className="h-3 w-5/6 bg-slate-200 rounded shimmer" />
              <div className="h-3 w-4/6 bg-slate-200 rounded shimmer" />
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="h-[420px] w-full max-w-[460px] rounded-[28px] bg-slate-200 shimmer" />
          </div>

        </div>
      </section>
    );
  }

  if (!about) return null;

  return (
    <section id="about" className="bg-white px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

        <div className="order-2 md:order-1">
          <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {about.title.split(" ").map((word, index) => {
              if (index === 1) {
                return (
                  <span key={index} className="text-primary-green">
                    {word}{" "}
                  </span>
                );
              }

              if (index === 2) {
                return (
                  <span key={index} className="text-primary-blue">
                    {word}{" "}
                  </span>
                );
              }

              return <span key={index}>{word} </span>;
            })}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 text-justify">
            {about.description}
          </p>
        </div>

        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <img
            src={getImageUrl(about.image_url)}
            alt={about.title}
            className="h-[420px] w-full max-w-[460px] rounded-[28px] object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}