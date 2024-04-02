import { authToken } from "../utils.js";

export function handlePolicies(policies) {
    return (req, res, next) => {
        //Paso 1: Obtengo el token
        const token = authToken(req, res, next);

        if (!token && !policies.includes("PUBLIC")) {
            return res.status(401).send({status: "error", error: "El Usuario no tiene el token apropiado"})
        }

        const role = req.user.role;

        if (!policies.includes(role)) {
            return res.status(403).send({status: "error", error: "El Usuario no tiene permisos suficientes para realizar la operación"})    
        }

        //Todo Ok
        next();

    }
}