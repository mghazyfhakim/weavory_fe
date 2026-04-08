"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const menus = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Tentang Kami" },
  { id: "services", label: "Layanan" },
  { id: "portfolio", label: "Portofolio" },
  { id: "contact", label: "Kontak" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const refs = {
    hero: useRef<HTMLAnchorElement | null>(null),
    about: useRef<HTMLAnchorElement | null>(null),
    services: useRef<HTMLAnchorElement | null>(null),
    portfolio: useRef<HTMLAnchorElement | null>(null),
    contact: useRef<HTMLAnchorElement | null>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "services", "portfolio", "contact"];

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop - 120;
        const bottom = top + el.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive(id);
          break;
        }
      }

      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeEl = refs[active as keyof typeof refs]?.current;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 shadow-sm backdrop-blur-md border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#hero"
          className="text-lg font-bold tracking-wide text-primary-blue"
        >
          WEAVORY STUDIO
        </a>

        <div className="relative hidden items-center gap-8 md:flex">
          {menus.map((menu) => (
            <a
              key={menu.id}
              href={`#${menu.id}`}
              ref={refs[menu.id as keyof typeof refs]}
              className={`relative pb-2 text-sm font-medium transition-colors ${
                active === menu.id
                  ? "text-primary-blue"
                  : "text-slate-600 hover:text-primary-green"
              }`}
            >
              {menu.label}
            </a>
          ))}

          {activeEl && (
            <motion.div
              layout
              className="absolute bottom-0 h-[2px] rounded-full bg-primary-green"
              initial={false}
              animate={{
                left: activeEl.offsetLeft,
                width: activeEl.offsetWidth,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}