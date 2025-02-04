import { Link } from "react-router-dom";
import Loader from "./Loader";

import { useHotels } from "../context/HotelProvider";

function Hotels() {
  const { hotels, isLoading } = useHotels();

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-lg mb-4">
        Search results ({hotels.length})
      </h2>
      {hotels.map((hotel) => (
        <Link
          key={hotel.id}
          to={`/hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`}
        >
          <div className=" flex gap-4 items-stretch">
            <img
              className="w-24 h-24 object-cover rounded-2xl"
              src={hotel.thumbnail_url}
              alt={hotel.name}
            />
            <div className="">
              <p className="mb-1.5 font-bold ">{hotel.smart_location}</p>
              <p className="mb-1.5 lowercase text-xs text-gray-500">
                {hotel.name}
              </p>
              <p className="mb-1.5 text-sm">{hotel.price}€&nbsp;/&nbsp;day</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Hotels;
