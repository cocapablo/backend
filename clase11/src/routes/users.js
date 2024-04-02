import Router from "./router.js";

const users = [
    {id: 1, name: "Pablo Coca"},
    {id: 2, name: "Martin Coca"},
    {id: 3, name: "Emiliano Coca"},
    {id: 4, name: "Benjamin Coca"},
    {id: 5, name: "Titito Coca"},
]
export default class UsersRouter extends Router{
    init() {
        this.get("/api/users", ["PUBLIC"], this.getUsers);
        this.get("/api/user/:uid", ["USER"], this.getUser);
        this.get("/api/currentUser", ["USER", "USER_PREMIUM"], this.getCurrentUser);
    }

    async getUsers(req, res) {
        //res.send({status: "success", payload: users});
        res.sendSuccess(users);
    }

    async getUser(req, res) {
        //Obtengo el id
        let idUsuario = null;
        let usuario = null;

        req && req.params && req.params.uid && (idUsuario = req.params.uid) && (idUsuario = parseInt(idUsuario));

        
        if (!idUsuario) {
            return res.sendUserError("id usuario no especificado");
        }

        

        //Obtengo el usuario
        usuario = users.find((user) => user.id === idUsuario);

        if (!usuario) {
            return res.sendUserError("Usuario no encontrado");
        }

        //Devuelvo el usuario 
        res.sendSuccess(usuario);
    }

    async getCurrentUser(req, res) {
        res.sendSuccess(req.user);
    }

}