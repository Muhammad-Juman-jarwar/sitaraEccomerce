import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    console.log("ProtectedAdminRoute - Token:", !!token, "IsAdmin:", isAdmin);

    if (token && isAdmin) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      if (!token) {
        alert("Please login to access the admin panel");
      } else if (!isAdmin) {
        alert("Access denied. Admin privileges required.");
      }
    }
    setIsChecking(false);
  }, []);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
