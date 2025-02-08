import { createContext, ReactNode, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { BookmarkDataType } from "../types/bookmarkData";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/bookmarks";

type BookmarkContextType = {
  bookmarks: BookmarkDataType[];
  getSingleBookmark: (id: string | number) => Promise<void>;
  isLoading: boolean;
  isLoadingCurrentBookmark: boolean;
  currentBookmark: BookmarkDataType | null;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

function BookmarkProvider({ children }: { children: ReactNode }) {
  const [currentBookmark, setCurrentBookmark] =
    useState<null | BookmarkDataType>(null);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);

  const { data: bookmarks, isLoading } = useFetch<BookmarkDataType[]>(BASE_URL);

  async function getSingleBookmark(id: string | number) {
    setCurrentBookmark(null);
    setIsLoadingCurrentBookmark(true);
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
      setIsLoadingCurrentBookmark(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        getSingleBookmark,
        isLoading,
        isLoadingCurrentBookmark,
        currentBookmark,
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
