import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { HomePageTitle } from "../../app/const";
import { authState } from "../../features/auth/authSlice";

function AuthRoute({ children }) {
  const { isSignedIn } = useSelector(authState);

  if (isSignedIn) {
    return <Navigate to={HomePageTitle} />;
  }

  return children;
}

export default AuthRoute;
