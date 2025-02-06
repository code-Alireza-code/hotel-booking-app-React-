import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import HotelProvider from "./context/HotelProvider.tsx";
import BookmarkProvider from "./context/BookmarkProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HotelProvider>
      <BookmarkProvider>
        <App />
      </BookmarkProvider>
    </HotelProvider>
  </BrowserRouter>
);
