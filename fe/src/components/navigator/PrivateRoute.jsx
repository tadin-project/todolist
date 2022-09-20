import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoginPageTitle } from "../../app/const";
import { authState } from "../../features/auth/authSlice";

function PrivateRoute({ children }) {
  const { isSignedIn } = useSelector(authState);

  if (!isSignedIn) {
    return <Navigate to={LoginPageTitle} />;
  }

  return children;
}

export default PrivateRoute;
