import Homeclient from "@/components/Homeclient";

export async function generateMetadata() {
  try {
    const controller = new AbortController();

    // ⏱ timeout 3 detik
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch("https://api.weavorystudio.com/api/hero", {
      signal: controller.signal,
      next: { revalidate: 60 },
    });

    clearTimeout(timeout);

    const data = await res.json();

    return {
      title: data.title || "Weavory Studio",
      description:
        data.subtitle ||
        "Jasa jahit, sablon dan pembuatan pola kualitas premium",
    };
  } catch (error) {
    return {
      title: "Weavory Studio",
      description:
        "Jasa jahit, sablon dan pembuatan pola kualitas premium",
    };
  }
}

export default function Page() {
  return <Homeclient />;
}