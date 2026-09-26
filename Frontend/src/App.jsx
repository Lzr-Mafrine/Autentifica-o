import { useEffect, useState } from "react";  
import {  
  BrowserRouter,  
  Routes,  
  Route,  
  Navigate,  
  useNavigate  
} from "react-router-dom";  
  
import Login from "./Pages/login";  
import Cadastro from "./Pages/cadastro";  
import Sucesso from "./Pages/sucesso";  
import ProtectedRoute from "./routes/protectedroute";  
import { validarToken } from "./service/api";  
  
function Rotas() {  
  const [isAuth, setIsAuth] = useState(false);  
  const [usuarioLogado, setUsuarioLogado] = useState(null);  
  const [carregando, setCarregando] = useState(true);  
  const navigate = useNavigate();  
  
  useEffect(() => {  
    async function verificarSessao() {  
      const token = localStorage.getItem("token");  
  
      if (!token) {  
        setCarregando(false);  
        return;  
      }  
  
      try {  
        const response = await validarToken(token);  
        setUsuarioLogado(response.usuario);  
        setIsAuth(true);  
      } catch {  
        localStorage.removeItem("token");  
        localStorage.removeItem("usuario");  
        setIsAuth(false);  
      } finally {  
        setCarregando(false); // faltava isso: senha inválida travava no loading  
      }  
    }  
  
    verificarSessao();  
  }, []);  
  
  function logout() {  
    localStorage.removeItem("token");  
    localStorage.removeItem("usuario");  
    setIsAuth(false);  
    setUsuarioLogado(null);  
    navigate("/login"); // era um caminho de arquivo; deve ser a rota  
  }  
  
  return (  
    <Routes>  
      <Route path="/" element={<Navigate to="/login" replace />} />  
      <Route  
        path="/login"  
        element={<Login setIsAuth={setIsAuth} setUsuarioLogado={setUsuarioLogado} />}  
      />  
      <Route path="/cadastro" element={<Cadastro />} />  
      <Route  
        path="/sucesso"  
        element={  
          <ProtectedRoute isAuth={isAuth} carregando={carregando}>  
            <Sucesso usuario={usuarioLogado} onLogout={logout} />  
          </ProtectedRoute>  
        }  
      />  
      <Route path="*" element={<Navigate to="/login" replace />} />  
    </Routes>  
  );  
}  
  
export default function App() {  
  return (  
    <BrowserRouter>  
      <Rotas />  
    </BrowserRouter>  
  );  
}