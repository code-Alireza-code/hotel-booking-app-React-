import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useFetch<T>(url: string, query: string = "") {
  const [data, setData] = useState<T | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${url}?${query}`);
        setData(data);
      } catch (error) {
        const err =
          error instanceof Error
            ? error.message
            : "خطا در هنگام دریافت اطلاعات";
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, url]);

  return { isLoading, data };
}
