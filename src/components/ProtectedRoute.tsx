import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { MdInfoOutline } from "react-icons/md";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast(
        <div>
          please
          <Link to="/login" className="underline text-blue-600">
            &nbsp;login&nbsp;
          </Link>
          first !
        </div>,
        {
          className: "font-bold ",
          icon: <MdInfoOutline className="w-5 h-5" />,
          duration: 5000,
        }
      );
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
