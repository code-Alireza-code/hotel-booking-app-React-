import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { MdInfoOutline } from "react-icons/md";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast("please login first !", {
        className: "font-bold !text-primary-light/80",
        icon: <MdInfoOutline className="w-5 h-5" />,
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
