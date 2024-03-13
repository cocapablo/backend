import express, { Router } from "express";
import { generateToken, authToken } from "../utils.js";

const router = express.Router();

const users = [];  //Persistencia en memoria

router.post("/api/jwt/register", (req, res) => {
    const {name, email, password} = req.body;

    const exists = users.find(user => user.email === email);

    if (exists) return res.status(400).send("El Usuario ya existe");

    console.log("Estoy insolitamente acá");

    const user = {
        name,
        email,
        password
    }

    users.push(user);

    //Generamos el token del usuario
    const access_token = generateToken(user);

    res.send({status: "success", access_token})
})

router.post("/api/jwt/login", (req, res) => {
    const {email, password} = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) return res.status(400).send({status: "error", error: "Credenciales inválidas"});

    //Generamos el token del usuario
    const access_token = generateToken(user);

    res.send({status: "success", access_token}) 
})

router.get("/api/jwt/current", authToken, (req, res) => {
    console.log("Req.user: ", req.user);
    res.send({status: "success", payload: req.user}); 

})


export default router;