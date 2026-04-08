export default function Footer() {
  return (
    <footer
      className="px-6 py-16 text-white md:px-10"
      style={{
        background:
          "linear-gradient(90deg, #173A8A 0%, #1A3F90 45%, #4E8A87 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-md">
            <div className="text-lg font-bold tracking-wide text-white">
              WEAVORY STUDIO
            </div>

            <p className="mt-4 text-sm leading-7 text-white/80">
              Weavory Studio membantu mewujudkan ide menjadi pakaian
              dengan standar kualitas yang konsisten.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-white/80">
            <a href="#about" className="transition hover:text-white">
              Tentang Kami
            </a>
            <a href="#services" className="transition hover:text-white">
              Layanan
            </a>
            <a href="#portfolio" className="transition hover:text-white">
              Portofolio
            </a>
            <a href="#contact" className="transition hover:text-white">
              Kontak
            </a>
          </div>
        </div>

        <div className="my-8 border-t border-white/15" />

        <div className="flex flex-col justify-between gap-4 text-sm text-white/70 md:flex-row">
          <p>Bandung, Indonesia</p>
          <p>© 2026 Weavory Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}