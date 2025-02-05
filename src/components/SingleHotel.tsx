import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { HotelDataType } from "../types/hotelsData";
import Loader from "./Loader";

function SingleHotel() {
  const { id } = useParams();
  const { data, isLoading } = useFetch<HotelDataType>(
    `http://localhost:5000/hotels/${id}`
  );

  if (isLoading) return <Loader />;
  if (Array.isArray(data)) return null;
  return (
    <div className="flex items-stretch justify-between gap-4 my-8 mx-auto">
      <div>
        <h2 className="mb-1 text-base font-semibold">{data.name}</h2>
        <div className="mb-4">
          {data?.number_of_reviews} reviews &bull;{data?.smart_location}
        </div>
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={data?.xl_picture_url}
          alt={data?.name}
        />
      </div>
    </div>
  );
}

export default SingleHotel;
