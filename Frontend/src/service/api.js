const API = "http://localhost:3000";

async function tratarResposta(response) {
  const dados = await response.json();

  if (!response.ok) {
    throw new Error(dados.mensagem || "Erro na requisição");
  }
  return dados;
}

export async function cadastrar(usuario, senha) {
  const response = await fetch(`${API}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, senha }),
  });
  return tratarResposta(response);
}
 
export async function login(usuario,senha){
    const response = await fetch(`${API}/login`, {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usuario, senha})
    })

    return tratarResposta(response)
}

export async function validarToken(token) {
    
    const response = await fetch (`${API}/auth/me`,{
        headers: { Authorization: `Bearer ${token}`}
    })
    return tratarResposta(response)
}