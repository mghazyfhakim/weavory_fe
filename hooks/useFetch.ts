import { useEffect, useState } from "react";


export function useFetch<T>(fn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fn()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}