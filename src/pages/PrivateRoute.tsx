import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  redirectPath: string,
  children: ReactElement
}

const PrivateRoute = ({
  redirectPath = '/login',
  children }: PrivateRouteProps) => {
  if (!document.cookie.includes('x_auth')) { // cookie should have x_auth token
    return <Navigate to={ redirectPath } replace />; // redirect to login page
  }
  return children;
}

export default PrivateRoute;