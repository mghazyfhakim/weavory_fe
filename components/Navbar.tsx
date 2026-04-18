"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const menus = [
  { id: "hero", label: "Home", href: "/#hero" },
  { id: "about", label: "Tentang Kami", href: "/about" },
  { id: "services", label: "Layanan", href: "/services" },
  { id: "portfolio", label: "Portofolio", href: "/portfolio" },
  { id: "contact", label: "Kontak", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [active, setActive] = useState(() => {
  if (pathname === "/contact") return "contact";
  if (pathname.startsWith ("/about")) return "about";
  if (pathname.startsWith ("/services")) return "services";
  if (pathname.startsWith("/portfolio")) return "portfolio";
  return "hero";
});

  const [scrolled, setScrolled] = useState(false);
  const [navReady, setNavReady] = useState(false);

  const refs = {
    hero: useRef<HTMLAnchorElement | null>(null),
    about: useRef<HTMLAnchorElement | null>(null),
    services: useRef<HTMLAnchorElement | null>(null),
    portfolio: useRef<HTMLAnchorElement | null>(null),
    contact: useRef<HTMLAnchorElement | null>(null),
  };

  useEffect(() => {
  if (pathname === "/contact") setActive("contact");
  else if (pathname.startsWith ("/about")) setActive ("about");
  else if (pathname.startsWith ("/services")) setActive ("services");
  else if (pathname.startsWith("/portfolio")) setActive("portfolio");
  else setActive("hero");
}, [pathname]);

  useEffect(() => {
    setNavReady(false);

    const frame = requestAnimationFrame(() => {
      setNavReady(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, active]);

  useEffect(() => {
    if (!isHomePage) {
      const onScroll = () => setScrolled(window.scrollY > 10);
      onScroll();
      window.addEventListener("scroll", onScroll);

      return () => window.removeEventListener("scroll", onScroll);
    }

    const handleScroll = () => {
      const sections = ["hero", "about", "services"];

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

      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        const top = portfolioSection.offsetTop - 120;
        const bottom = top + portfolioSection.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive("portfolio");
        }
      }

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const top = contactSection.offsetTop - 120;
        const bottom = top + contactSection.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive("contact");
        }
      }

      const aboutSection = document.getElementById("contact");
      if (aboutSection) {
        const top = aboutSection.offsetTop - 120;
        const bottom = top + aboutSection.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive("contact");
        }
      }

      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const activeEl = navReady
    ? refs[active as keyof typeof refs]?.current
    : null;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="text-lg font-bold tracking-wide text-[#102F76]"
        >
          WEAVORY STUDIO
        </Link>

        <div className="relative hidden items-center gap-8 md:flex">
          {menus.map((menu) => {
            const isActive = active === menu.id;

            return (
              <Link
                key={menu.id}
                href={menu.href}
                ref={refs[menu.id as keyof typeof refs]}
                className={`relative pb-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#102F76]"
                    : "text-slate-600 hover:text-[#477D7B]"
                }`}
              >
                {menu.label}
              </Link>
            );
          })}

          {activeEl && (
            <motion.div
              key="underline"
              layout
              className="absolute bottom-0 h-[2px] rounded-full bg-[#477D7B]"
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