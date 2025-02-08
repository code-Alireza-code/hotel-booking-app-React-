import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import { HotelDataType } from "../types/hotelsData";
import { BookmarkDataType } from "../types/bookmarkData";
import useUrlLocation from "../hooks/useUrlLocation";

type MapPropsType = {
  markerLocations: HotelDataType[] | BookmarkDataType[];
};

function Map({ markerLocations }: MapPropsType) {
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([51, 1]);
  const [lat, lng] = useUrlLocation();

  const {
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
        maxBounds={[
          [-180, -90],
          [180, 90],
        ]}
        className="h-full"
        center={mapCenter}
        zoom={3}
        scrollWheelZoom={true}
        minZoom={2}
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
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations.map((location) => (
          <Marker
            position={[+location.latitude, +location.longitude]}
            key={location.id}
          >
            <Popup>{location.host_location}</Popup>
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

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent("click", (e: LeafletMouseEvent) => {
    navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  });
  return null;
}
