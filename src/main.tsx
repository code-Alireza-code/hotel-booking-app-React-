import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import HotelProvider from "./context/HotelProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HotelProvider>
      <App />
    </HotelProvider>
  </BrowserRouter>
);
