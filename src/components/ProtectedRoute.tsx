// components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth);
  // console.log(12345,isAuthenticated);
  

  if (!isAuthenticated.userInfo){
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;