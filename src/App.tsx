import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container max-w-7xl ">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
    </div>
  );
}

export default App;
