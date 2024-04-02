import express, { Router } from "express";
import cookieParser from "cookie-parser";
import { generateToken, authToken, authTokenCookie, COOKIE_TOKEN_NAME, passportCall, authorization } from "../utils.js";
import passport from "passport";

const router = express.Router();

const users = [];  //Persistencia en memoria

router.post("/api/jwt/register", (req, res) => {
    const {name, email, password} = req.body;

    const exists = users.find(user => user.email === email);

    if (exists) return res.status(400).send({status: "error", error: "El Usuario ya existe"});

    console.log("Estoy insolitamente acá");

    const user = {
        name,
        email,
        password,
        role: "user" //hardcodeado
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

//JWT con cookies
router.post("/api/jwt/loginCookie", (req, res) => {
    const {email, password} = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) return res.status(400).send({status: "error", error: "Credenciales inválidas"});

    //Generamos el token del usuario
    const access_token = generateToken(user);

    //res.send({status: "success", access_token}) 
    res.cookie(COOKIE_TOKEN_NAME, access_token, {maxAge: 60 * 60 * 1000, httpOnly: true}).send({status: "success", message: "Logueado exitosamente"}); 
})

//Sin passport
/* router.get("/api/jwt/currentCookie", authTokenCookie, (req, res) => {
    console.log("Req.user: ", req.user);
    res.send({status: "success", payload: req.user}); 

}) */

//con Passport
/* router.get("/api/jwt/currentCookie", passport.authenticate("jwt", {session: false}), (req, res) => {
    console.log("Req.user: ", req.user);
    res.send({status: "success", payload: req.user}); 

}) */

//Con Custom Passport
router.get("/api/jwt/currentCookie", passportCall("jwt"), authorization("user"), (req, res) => {
    console.log("Req.user: ", req.user);
    res.send({status: "success", payload: req.user}); 

})



export default router;