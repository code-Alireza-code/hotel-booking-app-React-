import useFetch from "../hooks/useFetch";
import { HotelDataType } from "../types/hotelsData";

function LocationList() {
  const { data, isLoading } = useFetch<HotelDataType[]>(
    "http://localhost:5000/hotels"
  );

  if (isLoading) return <p className="mt-4">loading location data ....</p>;
  return (
    <div>
      <h2 className="mb-4 font-bold my-4">Nearby Locations</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 ">
        {data.map((item) => (
          <div key={item.id}>
            <img
              className="w-full h-80 object-cover rounded-lg mb-2"
              src={item.xl_picture_url}
              alt={item.name}
            />
            <div className="space-y-2">
              <p className="font-bold">{item.smart_location}</p>
              <p className="">{item.name}</p>
              <p className="flex items-center">
                €{item.price}&nbsp;/&nbsp; day
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationList;
