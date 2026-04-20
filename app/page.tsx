import Homeclient from "@/components/Homeclient";

export async function generateMetadata() {
  try {
    const res = await fetch("https://api.weavorystudio.com/api/hero", {
      cache: "no-store",
    });

    const data = await res.json();

    return {
      title: data.title || "Weavory Studio",
      description: data.subtitle || "Jasa jahit, sablon dan pembuatan pola kualitas premium",
    };
  } catch {
    return {
      title: "Weavory Studio",
      description: "Jasa jahit, sablon dan pembuatan pola kualitas premium",
      keywords: ["kebaya modern", "jahit kebaya", "tailor wanita", "jahit", "pembuatan pola", "sablon", "jahit baju", "custom apparel", "sablon baju"],
    };
  }
}

export default function Page() {
  return <Homeclient />;
}