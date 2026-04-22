"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "@/lib/api";

type ServiceType = {
  id: number;
  title: string;
  description: string;
  icon?: string;
};

export default function Services() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then((res) => res.json())
      .then((res) => setServices(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="bg-white px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Layanan Kami
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Dari{" "}
            <span className="font-semibold text-primary-green">
              ide
            </span>{" "}
            hingga menjadi{" "}
            <span className="font-semibold text-primary-blue">
              pakaian
            </span>{" "}
            yang siap digunakan.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          
          {/* LOADING SKELETON */}
          {loading &&
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8"
              >
                <div className="flex min-h-[220px] flex-col">
                  
                  {/* ICON */}
                  <div className="mb-6 h-16 w-16 rounded-2xl bg-slate-200 shimmer" />

                  {/* TITLE */}
                  <div className="h-5 w-3/4 bg-slate-200 rounded shimmer" />

                  {/* TEXT */}
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full bg-slate-200 rounded shimmer" />
                    <div className="h-3 w-5/6 bg-slate-200 rounded shimmer" />
                    <div className="h-3 w-4/6 bg-slate-200 rounded shimmer" />
                  </div>
                </div>
              </div>
            ))}

          {/* REAL DATA */}
          {!loading &&
            services.map((s) => (
              <div
                key={s.id}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex min-h-[220px] flex-col">
                  
                  {s.icon && (
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <img
                        src={getImageUrl(s.icon)}
                        alt={s.title}
                        className="max-h-10 max-w-10 object-contain"
                      />
                    </div>
                  )}

                  <h3 className="text-xl font-semibold text-primary-blue">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 text-justify">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}