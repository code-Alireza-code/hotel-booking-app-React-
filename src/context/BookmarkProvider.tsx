import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookmarkDataType } from "../types/bookmarkData";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/bookmarks";

type BookmarkContextType = {
  bookmarks: BookmarkDataType[];
  getSingleBookmark: (id: string | number) => Promise<void>;
  isLoading: boolean;
  currentBookmark: BookmarkDataType | null;
  createNewBookmark: (data: newBookmarkType) => Promise<void>;
  removeBookmark: (id: number) => Promise<void>;
};

type newBookmarkType = {
  cityName: string;
  country: string;
  countryCode: string;
  latitude: string;
  longitude: string;
  host_location: string;
  id: number;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

function BookmarkProvider({ children }: { children: ReactNode }) {
  const [currentBookmark, setCurrentBookmark] =
    useState<null | BookmarkDataType>(null);
  const [bookmarks, setBookmarks] = useState<BookmarkDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getAllBookmarks() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(BASE_URL);
        setBookmarks(data);
      } catch (error) {
        const err =
          error instanceof Error
            ? error.message
            : "error while fetching bookmarks !";
        toast.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getAllBookmarks();
  }, []);

  async function getSingleBookmark(id: string | number) {
    setCurrentBookmark(null);
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentBookmark(data);
    } catch (error) {
      const err =
        error instanceof Error
          ? error.message
          : "error while fetching bookmark data !";
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createNewBookmark(data: newBookmarkType) {
    try {
      await axios.post(BASE_URL, data);
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, data]);
      toast.success("bookmark added !");
    } catch (error) {
      const err =
        error instanceof Error
          ? error.message
          : "error while adding new bookmark !";
      toast.error(err);
    }
  }

  async function removeBookmark(id: number) {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setCurrentBookmark(null);
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
      toast.success("bookmark removed !");
    } catch (error) {
      const err =
        error instanceof Error
          ? error.message
          : "error while removing bookmark !";
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        getSingleBookmark,
        isLoading,
        currentBookmark,
        createNewBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error(
      "useBookmarks Context must be used within a BookmarkProvider"
    );
  }
  return context;
}
