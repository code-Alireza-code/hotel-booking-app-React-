import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
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

type InitialStateType = {
  bookmarks: [] | BookmarkDataType[];
  isLoading: boolean;
  currentBookmark: null | BookmarkDataType;
  error: null | Error | string;
};

const initialState: InitialStateType = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};

type ActionType =
  | { type: "loading"; payload?: never }
  | { type: "bookmarks/loaded"; payload: BookmarkDataType[] }
  | { type: "bookmark/loaded"; payload: BookmarkDataType }
  | { type: "bookmark/created"; payload: BookmarkDataType }
  | { type: "bookmark/deleted"; payload: number }
  | { type: "rejected"; payload: string | Error };

function bookmarkReducer(state: InitialStateType, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        bookmarks: payload,
        isLoading: false,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        currentBookmark: payload,
        bookmarks: [...state.bookmarks, payload],
      };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: payload };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        currentBookmark: null,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== payload
        ),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
  }
}

function BookmarkProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    async function getAllBookmarks() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(BASE_URL);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        const err =
          error instanceof Error
            ? error.message
            : "error while fetching bookmarks !";
        toast.error(err);
        dispatch({ type: "rejected", payload: err });
      }
    }
    getAllBookmarks();
  }, []);

  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  async function getSingleBookmark(id: string | number) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      const err =
        error instanceof Error
          ? error.message
          : "error while fetching bookmark data !";
      toast.error(err);
      dispatch({ type: "rejected", payload: err });
    }
  }

  async function createNewBookmark(data: newBookmarkType) {
    try {
      await axios.post(BASE_URL, data);
      dispatch({ type: "bookmark/created", payload: data });
      toast.success("bookmark added !");
    } catch (error) {
      const err =
        error instanceof Error
          ? error.message
          : "error while adding new bookmark !";
      toast.error(err);
      dispatch({ type: "rejected", payload: err });
    }
  }

  async function removeBookmark(id: number) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
      toast.success("bookmark removed !");
    } catch (error) {
      const err =
        error instanceof Error
          ? error.message
          : "error while removing bookmark !";
      toast.error(err);
      dispatch({ type: "rejected", payload: err });
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
