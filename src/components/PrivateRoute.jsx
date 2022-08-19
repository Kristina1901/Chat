import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'context/auth';

const PrivateRoute = ({ redirectPath = '/register', children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to={redirectPath} replace />;
};
export default PrivateRoute;
