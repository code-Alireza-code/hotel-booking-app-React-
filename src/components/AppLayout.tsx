import { Outlet } from "react-router-dom";
import Map from "./Map";
import { useHotels } from "../context/HotelProvider";

function AppLayout() {
  const { hotels } = useHotels();
  return (
    <div className="mt-4 flex justify-between items-stretch h-[calc(100vh-130px)]">
      <div className="w-[30%] overflow-y-scroll pr-4 ">
        <Outlet />
      </div>
      <Map markerLocations={hotels} />
    </div>
  );
}

export default AppLayout;
