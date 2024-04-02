import Router from "./router.js";
import { generateToken} from "../utils.js";

export default class SessionRouter extends Router {
    init() {
        this.post("/login", ["PUBLIC"], (req, res) => {
            //Login Hardcodeado
            const {email, password} = req.body;

            //Creo un usuario con role hardcodeado
            const user = {
                name: "Pablo El Magnifico",
                email,
                password,
                role: "USER"    
            }

            
            //Generamos el token del usuario
            const access_token = generateToken(user);

            res.sendSuccess(access_token);
        })
    }        
}
