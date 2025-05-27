import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import LoadingScreen from '../ui/LoadingScreen';

const ProtectedRoute = () => {
  const { user, isLoading, initialize, initialized } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  // Show loading screen while checking authentication
  if (isLoading || !initialized) {
    return <LoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login\" state={{ from: location }} replace />;
  }

  // Render the protected content
  return <Outlet />;
};

export default ProtectedRoute;