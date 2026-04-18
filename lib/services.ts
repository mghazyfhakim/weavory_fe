import { API_BASE_URL } from "./api";

export async function fetcher(endpoint: string) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!res.ok) {
    throw new Error("Failed fetch");
  }

  const json = await res.json();
  return json.data || json;
}