import jwt from "jsonwebtoken"

export function autenticar(req, res, next) {
    const authHeader = req.headers.authorization

    // Correção: alterado de startWith para startsWith e adicionado espaço após Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ mensagem: "Token não informado ou inválido" })
    }

    const token = authHeader.split(" ")[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = payload
        next()
    } catch {
        return res.status(401).json({ mensagem: "Token inválido ou expirado" })
    }
}
