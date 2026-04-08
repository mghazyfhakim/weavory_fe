"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";

type FormType = {
  name: string;
  email: string;
  contact: string;
  message: string;
};

type ErrorsType = Partial<FormType>;

export default function Contact() {
  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>({});

  const validate = () => {
    const newErrors: ErrorsType = {};

    if (!form.name.trim()) newErrors.name = "Nama wajib diisi";

    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!form.contact.trim()) newErrors.contact = "Kontak wajib diisi";
    if (!form.message.trim()) newErrors.message = "Pesan wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormType, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to submit inquiry");
      }

      setForm({
        name: "",
        email: "",
        contact: "",
        message: "",
      });

      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim inquiry");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary-blue focus:ring-4 focus:ring-blue-100";

  return (
    <section id="contact" className="bg-white px-6 py-20 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-green">
            Kami Siap Membantu
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            Diskusikan <span className="text-primary-blue">Kebutuhan</span>
            <br />
            Produksi Anda
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Kami terbuka untuk diskusi kebutuhan jahit, produksi apparel,
            pembuatan pola, hingga sablon. Sampaikan ide Anda, kami bantu
            prosesnya dengan standar kualitas yang konsisten.
          </p>

          <div className="mt-8 space-y-5 text-sm">
            <div>
              <p className="font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-slate-600">weavorystudio@gmail.com</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">WhatsApp</p>
              <p className="mt-1 text-slate-600">+62 856-2497-6680</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">Instagram</p>
              <p className="mt-1 text-slate-600">@weavory.studio</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-slate-700">Nama</label>
              <input
                value={form.name}
                placeholder="Nama Anda"
                onChange={(e) => handleChange("name", e.target.value)}
                className={inputClassName}
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                value={form.email}
                placeholder="Masukkan email anda"
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputClassName}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Nomor WhatsApp / Akun Instagram
              </label>
              <input
                value={form.contact}
                placeholder="08xxx atau @username"
                onChange={(e) => handleChange("contact", e.target.value)}
                className={inputClassName}
              />
              {errors.contact && (
                <p className="mt-2 text-xs text-red-500">{errors.contact}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Deskripsi Kebutuhan
              </label>
              <textarea
                value={form.message}
                placeholder="Ceritakan kebutuhan, jumlah perkiraan, atau referensi produk Anda"
                onChange={(e) => handleChange("message", e.target.value)}
                className={`${inputClassName} h-32 resize-none`}
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            <button
              disabled={loading}
              className={`w-full rounded-full px-6 py-3 text-sm font-medium text-white transition duration-300 ${loading
                ? "cursor-not-allowed bg-slate-400"
                : "bg-[#102F76] hover:-translate-y-0.5 hover:bg-[#0c245a]"
                }`}
            >
              {loading ? "Mengirim..." : "Kirim Inquiry"}
            </button>

            <p className="text-center text-xs leading-6 text-slate-500">
              Dengan mengirim form ini, Anda menyetujui kami untuk menghubungi
              Anda melalui WhatsApp atau Instagram.
            </p>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 24 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-semibold text-primary-blue">
                Berhasil!
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Inquiry Anda telah dikirim.
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-5 rounded-full bg-[#102F76] px-5 py-2 text-sm font-medium text-white transition duration-300 hover:bg-[#0c245a]"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}