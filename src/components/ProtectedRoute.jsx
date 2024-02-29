import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      navigate("/signin", { replace: true });
    }
  }, [navigate, token]);

  return children;
};

export default ProtectedRoute;
