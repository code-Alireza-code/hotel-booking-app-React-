import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";
import SingleHotel from "./components/SingleHotel";
import Bookmarks from "./components/Bookmarks";
import SingleBookmark from "./components/SingleBookmark";
import AddBookmark from "./components/AddBookmark";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BookmarkLayout from "./components/BookmarkLayout";

function App() {
  return (
    <div className="container max-w-7xl ">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
        <Route
          path="/bookmark"
          element={
            <ProtectedRoute>
              <BookmarkLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Bookmarks />} />
          <Route path="add" element={<AddBookmark />} />
          <Route path=":id" element={<SingleBookmark />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
