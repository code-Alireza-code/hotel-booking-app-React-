import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div className="text-secondary-600 flex items-center gap-4 my-auto mx-4">
      <p>Loading data ....</p>
      <LoaderIcon className="w-6 h-6" />
    </div>
  );
}

export default Loader;
