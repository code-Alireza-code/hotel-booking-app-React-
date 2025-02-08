import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarkProvider";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function Bookmarks() {
  const { isLoading, bookmarks, currentBookmark } = useBookmarks();

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
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Bookmarks;
