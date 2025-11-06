import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //Leeriamos del contexto si está autenticado
  const isAuth = false;

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
