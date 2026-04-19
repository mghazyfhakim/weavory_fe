export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "//api.weavorystudio.com";

export const getImageUrl = (path?: string) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }
  
  return `${API_BASE_URL}/${path}`;
};