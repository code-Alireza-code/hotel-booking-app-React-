import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { HotelDataType } from "../types/hotelsData";
import Loader from "./Loader";
import { useHotels } from "../context/HotelProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getSingleHotel, isLoadingCurrentHotel, currentHotel } = useHotels();

  useEffect(() => {
    if (id) {
      getSingleHotel(id);
    }
  }, [id]);

  if (isLoadingCurrentHotel) return <Loader />;
  return (
    <div className="flex items-stretch justify-between gap-4 my-8 mx-auto">
      <div>
        <h2 className="mb-1 text-base font-semibold">{currentHotel?.name}</h2>
        <div className="mb-4">
          {currentHotel?.number_of_reviews} reviews &bull;
          {currentHotel?.smart_location}
        </div>
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={currentHotel?.xl_picture_url}
          alt={currentHotel?.name}
        />
      </div>
    </div>
  );
}

export default SingleHotel;
