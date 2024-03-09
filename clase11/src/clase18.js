import express from "express";
import handlebars from "express-handlebars";
import userRouter from "./routes/users.router.js"

import path from "path";
import { fileURLToPath } from 'url';

import viewsRouter from "./routes/views.router.js";
import getDirectorioAnterior, { cargarDatosenBDDesdeArray, getAggregatesDeOrders } from "./utils.js";

import orderModel from "./models/orders.models.js";
import studentClase17Model from "./models/studentsClase17.model.js";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";

import { cargarDatosenBDdesdeArchivo, getEstadisticas, agregarDocumentoAModelo, agregarCursoAEstudiante, getStudentFull, getStudentsDeMejorAPeor, getStudentsPorGrupo, getPromedioStudentsDeGrupo, getPromedioStudentsDeGenero, getStudentsAprobadosyReprobados } from "./utils.js";


const port = 8080;

const app = express();

const __filename = fileURLToPath(import.meta.url);
console.log("Filename: ", __filename);
let __dirname = path.dirname(__filename); 
//Obtener dirname de una funcion que devuelva el directorio anterior al actual
//__dirname = getDirectorioAnterior(__dirname); 

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const miFirmaSecreta = "pacojeta";
app.use(cookieParser(miFirmaSecreta));

app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true
})) 

app.get("/session", (req, res) => {
    if (req.session.counter && req.session.nombre) {
        req.session.counter++;
        res.send(req.session.nombre + " ha visitado el sitio " + req.session.counter + " veces");
    }
    else {
        req.session.counter = 1;
        req.session.nombre = "Pablo Coca" //al objeto session le puedo agregar propiedades como a todo objeto (que seguirán vivas dentro de la session)
        res.send("Bienvenido");
    }
})

app.get('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'pepe' || password !== 'pepepass') {
     return res.send('login failed')
     }
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
})

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send("Sesión finalizada")
        else res.send("Error: no se pudo finalizar la sesión: ", err.toString())
    })
})

function auth(req, res, next) {
    if (req.session?.user === 'pepe' && req.session?.admin) {
     return next()
     }
    return res.status(401).send('error de autorización!')
}    

app.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!')
    }
)

app.get("/", (req, res) => {
    res.send("bienvenido");
})

app.get("/set-cookie", (req, res) => {
    res.cookie("miCookie", "valorCookie", {maxAge: 10000, httpOnly: true}).send("Cookie establecida");
    //res.send("Cookie establecida");
})

app.get("/get-cookie", (req, res) => {
    let miCookie = null; 

    console.log(req.cookies);
    req.cookies && req.cookies.miCookie && (miCookie = req.cookies.miCookie);
    //req.cookies?.miCookie ? miCookie = req.cookies.miCookie : miCookie = null
    
    if (miCookie) {
        res.send("Se encontró miCookie con valor: " + miCookie)
    } 
    else {
        res.send("No se encontró miCookie");
    }
})

app.get("/clear-cookie", (req, res) => {
    res.clearCookie("miCookie");
    res.send("miCookie eliminada");
})




app.get("/set-signed-cookie", (req, res) => {
    res.cookie("miCookieFirmada", "valorCookieFirmada", {signed: true}).send("Cookie Firmada establecida");
    //res.send("Cookie establecida");
})

app.get("/get-signed-cookie", (req, res) => {
    let miCookieFirmada = null;

    req.signedCookies && req.signedCookies.miCookieFirmada && (miCookieFirmada = req.signedCookies.miCookieFirmada);
    if (miCookieFirmada) {
        res.send("Se encontró miCookie firmada con valor: " + miCookieFirmada)
    }
    else {
        res.send("No se encontró miCookieFirmada");
    }
})

app.get("/clear-signed-cookie", (req, res) => {
    res.clearCookie("miCookieFirmada");
    res.send("miCookie Firmada eliminada");
})



console.log("Dirname: ", __dirname);

const httpServer = app.listen(port, () => console.log("Conectado al server en port " + port + " con Express"));

//La cadena de conexion habría que leerla de un archivo por seguridad
//La cadena de conexion habría que leerla de un archivo por seguridad
let cadenaConexionBD = ""; //reemplazar esto con el valor de la cadena de conexion a la BD
let cadenaConexionAtlas = "mongodb+srv://cocapablo:FKITs3H3kYgRNPSy@cluster0.u0b3vak.mongodb.net/coderDB?retryWrites=true&w=majority";
let cadenaConexionLocal = "mongodb://127.0.0.1:27017/coderDB";
//cadenaConexionBD = cadenaConexionAtlas;
cadenaConexionBD = cadenaConexionLocal;

mongoose.connect(cadenaConexionBD)
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch(err => {
    console.log("ERROR al conectarme: ", err);
})





