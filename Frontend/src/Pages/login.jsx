import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, User, LockKeyhole } from "lucide-react";
import { login } from "../service/api";

export default function Login({ setIsAuth, setUsuarioLogado }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    try {
      const response = await login(usuario, senha);
      localStorage.setItem("token", response.token);
      localStorage.setItem("usuario", JSON.stringify(response.usuario));
      setUsuarioLogado(response.usuario);
      setIsAuth(true);
      navigate("/sucesso");
    } catch (error) {
      setErro(erro.message);
    }
  }

  return (
    <main className="page-shell">
      <section className="auth-card">
        <div className="brand-icon">
          <LogIn size={28} />
        </div>
        <p className="eyebrow">Área restrita</p>
        <h1>Login</h1>
        <p>Entre para acessar a área protegida</p>

        <form onSubmit={handleLogin}>
          <label>
            Usuário
            <div className="input-wrap">
              <User size={18} />
              <input
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
          </label>

          <label>
            Senha
            <div className="input-wrap">
              <User size={18} />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </label>

          {erro && <p className="error"> {erro} </p>}

          <button className="primary" type="submit">
            Entrar
          </button>
        </form>

        <p className="switch-text">
          Não tem conta?{" "}
          <button className="link-button" onClick={() => navigate("/cadastro")}>
            Cadastre-se
          </button>
        </p>
      </section>
    </main>
  );
}
