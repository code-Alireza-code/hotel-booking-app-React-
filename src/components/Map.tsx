import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useHotels } from "../context/HotelProvider";
import { useState } from "react";
import { LatLngExpression } from "leaflet";

function Map() {
  const { hotels, isLoading } = useHotels();
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51, 1]);
  return (
    <div className="grow shrink bg-secondary-100 relative">
      <MapContainer
        className="h-full"
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels.map((hotel) => (
          <Marker position={[hotel.latitude, hotel.longitude]} key={hotel.id}>
            <Popup>{hotel.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
