"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { API_BASE_URL, getImageUrl } from "@/lib/api";
import { H1, P } from "@/components/ui/Typography";
import { motion } from "framer-motion";

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
            <div className="h-3 w-24 bg-slate-300 rounded shimmer" />
          </div>

          <div className="max-w-xl">
            <div className="h-8 w-2/3 bg-slate-300 rounded shimmer" />
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full bg-slate-300 rounded shimmer" />
              <div className="h-3 w-5/6 bg-slate-300 rounded shimmer" />
              <div className="h-3 w-4/6 bg-slate-300 rounded shimmer" />
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-[200px_1fr] items-start">
            <div className="w-full h-[200px] rounded-xl bg-slate-300 shimmer" />

            <div>
              <div className="h-6 w-40 bg-slate-300 rounded shimmer mb-4" />
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-full bg-slate-300 rounded shimmer"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 rounded-xl border border-slate-200">
            <div className="h-10 bg-slate-300 shimmer rounded-t-xl" />
            <div className="p-6">
              <div className="h-3 w-3/4 mx-auto bg-slate-300 shimmer rounded" />
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 p-6">
            <div className="h-5 w-24 bg-slate-300 shimmer mb-6 rounded" />

            <div className="space-y-5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-7 w-7 rounded-full bg-slate-300 shimmer" />
                  <div className="h-3 w-full bg-slate-300 shimmer rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (!data) return null;

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

  // 🟢 MAIN CONTENT (WITH FADE-IN)
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
          <span className="text-slate-700">Tentang Kami</span>
        </div>

        <div className="max-w-xl">
          <H1>{data.title}</H1><br />

          <p className="text-sm md:text-base text-slate-600 leading-relaxed text-justify">
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
            <h3 className="text-3xl font-semibold text-slate-800">
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
                "linear-gradient(90deg, #102F76 0%, #477D7B 100%)",
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
                "linear-gradient(90deg, #102F76 0%, #477D7B 100%)",
            }}
          >
            Misi
          </div>

          <div className="px-6 py-6 space-y-5">
            {data.mission?.map((item, index) => (
              <div key={index} className="flex items-start gap-4">

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#102F76] text-white text-xs font-medium">
                  {index + 1}
                </div>

                <P>{item}</P>
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </motion.main>
  );
}