import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUserId } = useAppStore();
  const location = useLocation();

  if (!currentUserId || isNaN(currentUserId) || currentUserId <= 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
