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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Failed to fetch services:", err));
  }, []);

  return (
    <section id="services" className="bg-white px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
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

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
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

                <p className="mt-3 text-sm leading-7 text-slate-600">
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