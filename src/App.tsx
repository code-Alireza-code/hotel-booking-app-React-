import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";

function App() {
  return (
    <div className="container max-w-7xl ">
      <Toaster />
      <Header />
      <LocationList />
    </div>
  );
}

export default App;
