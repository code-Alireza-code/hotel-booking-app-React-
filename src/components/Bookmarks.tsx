import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarkProvider";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import React from "react";

function Bookmarks() {
  const { isLoading, bookmarks, currentBookmark, removeBookmark } =
    useBookmarks();

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    await removeBookmark(id);
  };

  if (isLoading) return <Loader />;
  return (
    <div>
      <h2 className="font-bold text-lg">Bookmark List</h2>
      {bookmarks.map((bookmark) => (
        <Link
          to={`${bookmark.id}?lat=${bookmark.latitude}&lng=${bookmark.longitude}`}
          key={bookmark.id}
        >
          <div
            className={`my-4 border border-secondary-600 p-4 flex items-center justify-between rounded-2xl hover:bg-gray-200 ${
              bookmark.id === currentBookmark?.id &&
              "border-[3px] rounded-2xl border-primary-dark"
            }`}
          >
            <ReactCountryFlag svg countryCode={bookmark.countryCode} />
            <strong className="grow ml-4">{bookmark.cityName}</strong>
            <span>
              {bookmark?.country?.length > 14
                ? `${bookmark.country.slice(0, 14)}...`
                : bookmark.country}
            </span>
            <button
              className="bg-red-50 ml-4 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(e, bookmark.id);
              }}
            >
              <FaTrashAlt className="text-rose-500" />
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Bookmarks;
