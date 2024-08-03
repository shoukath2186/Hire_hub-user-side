import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('userInfo'); // Example check for an auth token
  };

const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />; // Redirect to the home page or another protected route
  }
  return <>{children}</>;
};

export default AuthRedirect;