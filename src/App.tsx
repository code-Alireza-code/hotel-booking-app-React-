import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="container max-w-7xl ">
      <Toaster />
      <Header />
    </div>
  );
}

export default App;
