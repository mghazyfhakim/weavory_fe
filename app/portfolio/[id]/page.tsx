"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { API_BASE_URL, getImageUrl } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

type PortfolioDetailType = {
  id: number;
  title: string;
  material: string;
  teknik_jahit: string;
  finishing: string;
  layanan: string;
  image_url: string;
  images: string[];
};

export default function PortfolioDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [data, setData] = useState<PortfolioDetailType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/api/portfolios/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch(() => setError("Gagal mengambil data"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!data) return;

    const images = data.images?.length
      ? data.images
      : [data.image_url];

    images.forEach((img) => {
      const image = new Image();
      image.src = getImageUrl(img);
    });
  }, [data]);

  const images =
    data?.images?.length ? data.images : data ? [data.image_url] : [];

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

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

          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <div className="h-8 w-3/4 bg-slate-300 rounded shimmer" />

              <div className="mt-8 space-y-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between max-w-sm">
                    <div className="h-3 w-24 bg-slate-300 rounded shimmer" />
                    <div className="h-3 w-32 bg-slate-300 rounded shimmer" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-[320px] h-[320px] md:w-[360px] md:h-[360px] rounded-2xl bg-slate-300 shimmer" />

              <div className="mt-4 flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full bg-slate-300 shimmer"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (!data) return null;

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
          <Link href="/portfolio" className="hover:underline">
            Portofolio
          </Link>
          <span>/</span>
          <span className="text-slate-700">Detail</span>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-center">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {data.title}
            </h1>

            <div className="mt-8 space-y-5 text-sm">
              {[
                ["Material", data.material],
                ["Teknik Jahit", data.teknik_jahit],
                ["Finishing", data.finishing],
                ["Layanan", data.layanan],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="flex justify-between max-w-sm"
                >
                  <span className="text-slate-500">{label}</span>
                  <span className="text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-[320px] h-[320px] md:w-[360px] md:h-[360px] overflow-hidden rounded-2xl">

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={getImageUrl(images[currentIndex])}
                  alt={data.title}
                  onClick={() => setLightbox(true)}
                  className="h-full w-full object-cover cursor-zoom-in"

                  initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>

              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 p-3 shadow hover:scale-110"
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 p-3 shadow hover:scale-110"
              >
                ›
              </button>
            </div>

            <div className="mt-4 flex gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === currentIndex
                      ? "bg-[#102F76]"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <motion.img
              src={getImageUrl(images[currentIndex])}
              className="max-h-[90%] max-w-[90%] rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.main>
  );
}