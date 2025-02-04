import { Outlet } from "react-router-dom";
import Map from "./Map";

function AppLayout() {
  return (
    <div className="mt-4 flex justify-between items-stretch h-[calc(100vh-130px)]">
      <div className="w-[30%] overflow-y-scroll pr-4 ">
        <Outlet />
      </div>
      <Map />
    </div>
  );
}

export default AppLayout;
