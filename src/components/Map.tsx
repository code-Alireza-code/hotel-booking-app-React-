import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../context/HotelProvider";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useSearchParams } from "react-router-dom";

function Map() {
  const { hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51, 1]);
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  console.log({ lat, lng });

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

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
        <ChangeCenter position={mapCenter} />
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

function ChangeCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position);
  return null;
}
