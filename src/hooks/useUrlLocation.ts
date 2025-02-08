import { useSearchParams } from "react-router-dom";

export default function useUrlLocation() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  return [lat, lng];
}
