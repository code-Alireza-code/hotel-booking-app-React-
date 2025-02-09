import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import BookmarkProvider from "./BookmarkProvider";
import HotelProvider from "./HotelProvider";

function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <HotelProvider>
        <BookmarkProvider>{children}</BookmarkProvider>
      </HotelProvider>
    </AuthProvider>
  );
}

export default Providers;
