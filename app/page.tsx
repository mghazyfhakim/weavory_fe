import Homeclient from "@/components/Homeclient";

export async function generateMetadata() {
  try {
    const res = await fetch("https://api.weavorystudio.com/api/hero", {
      next: { revalidate: 3600 },
    });

    const data = await res.json();

    return {
      title: "Weavory Studio - Jasa Jahit & Custom Apparel",
      description:
        data?.subtitle ||
        "Weavory Studio adalah jasa jahit yang menyediakan layanan pembuatan kebaya, custom apparel, sablon baju, dan pembuatan pola berkualitas.",
    };
  } catch (error) {
    console.error("SEO FETCH ERROR:", error);

    return {
      title: "Weavory Studio - Jasa Jahit & Custom Apparel",
      description:
        "Weavory Studio adalah jasa jahit yang menyediakan layanan pembuatan kebaya, custom apparel, sablon baju, dan pembuatan pola berkualitas.",
    };
  }
}

export default function Page() {
  return <Homeclient />;
}