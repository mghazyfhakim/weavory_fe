import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  metadataBase: new URL("https://weavorystudio.com"),
  title: {
    default: "Weavory Studio",
    template: "%s | Weavory Studio",
  },
  description:
    "Weavory Studio menyediakan jasa jahit kebaya, kemeja, dan custom outfit premium.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="font-body bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
