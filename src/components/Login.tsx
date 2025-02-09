import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({
    email: "user@gmail.com",
    password: "12345",
  });
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.email && formData.password)
      login(formData.email, formData.password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("successfuly loged in !");
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="my-8 mx-auto p-4 max-w-[25rem] rounded-lg border border-gray-600">
      <h2 className="font-bold text-2xl capitalize mb-4 text-center">login</h2>
      <form className="p-4" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            email
          </label>
          <input
            className="textField"
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">
            password
          </label>
          <input
            className="textField"
            type="text"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </div>
        <div className="flex items-center mt-8">
          <button
            type="submit"
            className="py-2 px-4 rounded-lg text-white bg-primary-light w-full"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
