import { navigate } from "react-router-dom";

export default function ProtectedRoute({ isAuth, carregando, children }) {
  if (carregando) {
    return <div className="loading">Verificando autentificação...</div>;
  }
  if (!isAuth) {
    return <navigate to="login" replace />;
  }
  return children;
}
