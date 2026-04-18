"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { API_BASE_URL, getImageUrl } from "@/lib/api";
import { H1, P } from "@/components/ui/Typography";

type AboutType = {
  title: string;
  description: string;
  profile: string;
  vision: string;
  mission: string[];
  image_url: string;
};

export default function AboutPage() {
  const [data, setData] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/about`)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch(() => setError("Gagal mengambil data"))
      .finally(() => setLoading(false));
  }, []);

  if (!data) {
    return <div className="p-10">Loading...</div>;
  }

  function splitParagraph(text: string, maxLength = 300) {
    if (!text) return [];

    const words = text.split(" ");
    const paragraphs: string[] = [];

    let current = "";

    words.forEach((word) => {
      if ((current + word).length > maxLength) {
        paragraphs.push(current.trim());
        current = word + " ";
      } else {
        current += word + " ";
      }
    });

    if (current.trim()) {
      paragraphs.push(current.trim());
    }

    return paragraphs;
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">

        <div className="mb-10 flex items-center gap-3 text-sm text-slate-500">
          <Link href="/" className="text-[#477D7B] hover:underline">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700">Tentang Kami</span>
        </div>

        <div className="max-w-xl">
          <H1>
            {data.title}
          </H1><br />

          <p className="text-sm md:text-base font-body text-slate-600 leading-relaxed text-justify">
            {data.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[200px_1fr] items-start">
          <div className="overflow-hidden rounded-xl shadow-md">
            <img
              src={getImageUrl(data.image_url)}
              alt="About Weavory"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-3xl font-heading font-semibold text-slate-800">
              Profil Kami
            </h3><br />

            <div className="space-y-4">
              {splitParagraph(data.profile, 300).map((para, index) => (
                <p
                  key={index}
                  className="text-slate-600 leading-relaxed text-justify"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-xl border border-slate-200">
          <div
            className="px-6 py-3 text-center text-white font-medium"
            style={{
              background:
                "linear-gradient(90deg, #173A8A 0%, #4E8A87 100%)",
            }}
          >
            Visi
          </div>

          <div className="px-6 py-6 text-sm text-slate-600 leading-7 text-center">
            {data.vision}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-slate-200">
          <div
            className="px-6 py-3 text-center text-white font-medium"
            style={{
              background:
                "linear-gradient(90deg, #173A8A 0%, #4E8A87 100%)",
            }}
          >
            Misi
          </div>

          <div className="px-6 py-6 space-y-5">
            {data.mission?.map((item, index) => (
              <div key={index} className="flex items-start gap-4">

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#173A8A] text-white text-xs font-medium">
                  {index + 1}
                </div>

                <P >
                  {item}
                </P>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}