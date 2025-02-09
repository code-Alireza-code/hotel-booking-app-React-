import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import HotelProvider from "./context/HotelProvider.tsx";
import BookmarkProvider from "./context/BookmarkProvider.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import Providers from "./context/Providers.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Providers>
      <App />
    </Providers>
  </BrowserRouter>
);
