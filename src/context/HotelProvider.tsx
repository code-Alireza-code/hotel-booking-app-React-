import { createContext, ReactNode, useContext } from "react";
import { HotelDataType } from "../types/hotelsData";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type ContextType = {
  hotels: HotelDataType[];
  isLoading: boolean;
};

const HotelContext = createContext<ContextType | undefined>(undefined);

function HotelProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = (searchParams.get("destination") as string) || "";
  const room = JSON.parse(searchParams.get("options") as string)?.room || "";
  const { data: hotels, isLoading } = useFetch<HotelDataType>(
    "http://localhost:5000/hotels",
    `host_location_like=${destination}&accommodates_gte=${room}`
  );

  return (
    <HotelContext.Provider value={{ hotels: hotels || [], isLoading }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;

export function useHotels() {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
}
