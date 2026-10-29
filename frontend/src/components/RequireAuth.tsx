import React from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUserId, setGoogleUserProfile } = useUserStore();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Handle OAuth callback parameters directly in RequireAuth before guard check
  const paramUserId = searchParams.get('userId');
  if (paramUserId) {
    const parsedId = Number(paramUserId);
    if (!isNaN(parsedId) && parsedId > 0) {
      const paramName = searchParams.get('name') || '';
      const paramEmail = searchParams.get('email') || '';
      const paramAvatar = searchParams.get('avatar') || '';
      
      if (currentUserId !== parsedId) {
        setGoogleUserProfile({
          id: parsedId,
          name: paramName,
          email: paramEmail,
          avatar: paramAvatar,
        });
      }
      return <>{children}</>;
    }
  }

  if (!currentUserId || isNaN(currentUserId) || currentUserId <= 0) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
