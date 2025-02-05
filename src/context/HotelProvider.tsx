import { createContext, ReactNode, useContext, useState } from "react";
import { HotelDataType } from "../types/hotelsData";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/hotels";

type ContextType = {
  hotels: HotelDataType[];
  isLoading: boolean;
  isLoadingCurrentHotel: boolean;
  getSingleHotel: (id: string | number) => void;
  currentHotel: HotelDataType | null;
};

const HotelContext = createContext<ContextType | undefined>(undefined);

function HotelProvider({ children }: { children: ReactNode }) {
  const [currentHotel, setCurrentHotel] = useState<null | HotelDataType>(null);
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = (searchParams.get("destination") as string) || "";
  const room = JSON.parse(searchParams.get("options") as string)?.room || "";
  const { data: hotels, isLoading } = useFetch<HotelDataType[]>(
    BASE_URL,
    `host_location_like=${destination}&accommodates_gte=${room}`
  );

  async function getSingleHotel(id: string | number) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      const err =
        error instanceof Error
          ? error.message
          : "error while fetching hotel data !";
      toast.error(err);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        hotels: hotels || [],
        isLoading,
        getSingleHotel,
        currentHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;

export function useHotels() {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error("useHotel Context must be used within a HotelProvider");
  }
  return context;
}
