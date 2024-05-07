import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("access_token");
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    if (isAuthenticated && (isLoginPage || isRegisterPage)) {
      navigate("/");
    }
  }, [navigate, location]);

  return null;
};

export default AuthCheck;
