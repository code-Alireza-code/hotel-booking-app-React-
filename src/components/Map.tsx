import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../context/HotelProvider";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";

function Map() {
  const { hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51, 1]);
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  const {
    error,
    getPosition,
    isLoading: isLoadingGeoLocation,
    position: userPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if ((userPosition?.lat, userPosition?.lng))
      setMapCenter([userPosition.lat, userPosition.lng]);
  }, [userPosition]);

  return (
    <div className="grow shrink bg-secondary-100 relative">
      <MapContainer
        className="h-full"
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <button
          onClick={getPosition}
          className="px-1.5 py-2 capitalize font-bold rounded-2xl absolute bottom-4 left-4 bg-primary-dark shadow-lg shadow-secondary-400 text-white z-[999] hover:bg-primary-light"
        >
          {isLoadingGeoLocation ? "Loading..." : "use your location"}
        </button>
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
