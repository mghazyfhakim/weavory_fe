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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error("Failed to fetch about:", err));
  }, []);

  if (!about) {
    return (
      <section id="about" className="bg-white px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl animate-pulse rounded-3xl bg-slate-100 p-10 h-[420px]" />
      </section>
    );
  }

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

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
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