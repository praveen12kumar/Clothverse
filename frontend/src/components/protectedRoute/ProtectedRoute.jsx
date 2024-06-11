import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({isAdmin, children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // if(isAdmin === true && isAuthenticated === true){
  //   return <Navigate to="/admin/dashboard" state={{ from: location }} />;
  // }

  return children;
};

export default ProtectedRoute;
