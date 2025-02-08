import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkProvider";
import { useEffect } from "react";
import Loader from "./Loader";
import ReactCountryFlag from "react-country-flag";
import { MdArrowBack } from "react-icons/md";

function SingleBookmark() {
  const { id } = useParams();
  const { currentBookmark, getSingleBookmark, isLoadingCurrentBookmark } =
    useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) getSingleBookmark(id);
  }, [id]);

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex gap-x-2 items-center justify-between p-2 rounded-lg border border-black"
      >
        <MdArrowBack />
        Back
      </button>
      <div
        className={`my-4 border border-secondary-600 p-4 flex items-center justify-between rounded-2xl`}
      >
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        <strong className="grow ml-4">{currentBookmark.cityName}</strong>
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
