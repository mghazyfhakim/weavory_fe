export default function Separator() {
  const items = [
    "Presisi dalam setiap jahitan",
    "Material pilihan",
    "Quality control konsisten",
  ];

  return (
    <section
      className="w-full px-0 py-0"
      style={{
        background:
          "linear-gradient(90deg, #173A8A 0%, #1A3F90 45%, #4E8A87 100%)",
      }}
    >
      <div className="mx-auto flex min-h-[52px] max-w-7xl items-center justify-center px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-center gap-3 text-center text-[13px] font-medium text-white/90 md:gap-5">
          {items.map((item, index) => (
            <div key={item} className="flex items-center gap-3 md:gap-5">
              <span>{item}</span>
              {index !== items.length - 1 && (
                <span className="text-white/40">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}