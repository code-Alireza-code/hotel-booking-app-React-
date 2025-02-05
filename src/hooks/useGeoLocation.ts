import { useState } from "react";

type PositionType = {
  lat: number;
  lng: number;
};

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<null | PositionType>(null);
  const [error, setError] = useState<null | string>(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("your browser does not support geolocation!");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  }

  return {
    isLoading,
    error,
    position,
    getPosition,
  };
}
