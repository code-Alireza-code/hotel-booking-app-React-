import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";
import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import Loader from "./Loader";
import { useBookmarks } from "../context/BookmarkProvider";

const BASE_GEOCODING_URL =
  "https://us1.api-bdc.net/data/reverse-geocode-client";

const BASE_URL = "http://localhost:5000/bookmarks";

type FormDataType = {
  cityName: string;
  country: string;
  countryCode: string;
};

function AddBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    cityName: "",
    country: "",
    countryCode: "",
  });
  const { createNewBookmark } = useBookmarks();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.cityName || !formData.country) return;

    const newBookmark = {
      ...formData,
      latitude: String(lat), 
      longitude: String(lng),
      id: Date.now(),
      host_location: formData.cityName + " " + formData.country,
    };
    await createNewBookmark(newBookmark);
    navigate("/bookmark");
  };

  useEffect(() => {
    if (!lat || !lng) return;
    async function getLocationData() {
      setIsLoadingGeoCoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        if (!data.countryCode)
          throw new Error(
            "this location is not a city ! please click somewhere else!"
          );
        setFormData({
          cityName: data.city || data.locality,
          country: data.countryName,
          countryCode: data.countryCode,
        });
      } catch (error) {
        const err =
          error instanceof Error
            ? error.message
            : "error while getting location data";
        toast.error(err);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    getLocationData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Bookmark new Location</h2>
      <form onSubmit={handleAddBookmark}>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cityName"
          >
            City Name
          </label>
          <input
            className="textField"
            type="text"
            name="cityName"
            id="cityName"
            value={formData.cityName}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-4 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            Country Name
          </label>
          <input
            className="textField"
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleFormChange}
          />
          <ReactCountryFlag
            svg
            countryCode={formData.countryCode}
            className="absolute top-9.5 right-3"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="flex gap-x-2 items-center justify-between p-2 rounded-lg border border-gray-700"
          >
            <MdArrowBack />
            Back
          </button>
          <button
            type="submit"
            className="py-2 px-4 rounded-lg border bg-primary-light text-white hover:bg-primary-dark"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBookmark;
