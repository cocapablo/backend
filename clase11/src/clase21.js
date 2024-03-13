import express from "express";
import handlebars from "express-handlebars";
import userRouter from "./routes/users.router.js"
import sessionsRouter from "./routes/sessions.router.js"

import path from "path";
import { fileURLToPath } from 'url';

import viewsRouter from "./routes/views.router.js";
import getDirectorioAnterior, { cargarDatosenBDDesdeArray, getAggregatesDeOrders } from "./utils.js";

import orderModel from "./models/orders.models.js";
import studentClase17Model from "./models/studentsClase17.model.js";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import UserManager from "./dao/UserManagerMongo.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";

//JWT
import jwtRouter from "./routes/jwt.routes.js";

import { cargarDatosenBDdesdeArchivo, getEstadisticas, agregarDocumentoAModelo, agregarCursoAEstudiante, getStudentFull, getStudentsDeMejorAPeor, getStudentsPorGrupo, getPromedioStudentsDeGrupo, getPromedioStudentsDeGenero, getStudentsAprobadosyReprobados } from "./utils.js";



const port = 8080;

const app = express();

const __filename = fileURLToPath(import.meta.url);
console.log("Filename: ", __filename);
let __dirname = path.dirname(__filename); 
//Obtener dirname de una funcion que devuelva el directorio anterior al actual
//__dirname = getDirectorioAnterior(__dirname); 

//La cadena de conexion habría que leerla de un archivo por seguridad
//La cadena de conexion habría que leerla de un archivo por seguridad
let cadenaConexionBD = ""; //reemplazar esto con el valor de la cadena de conexion a la BD
let cadenaConexionAtlas = "mongodb+srv://cocapablo:FKITs3H3kYgRNPSy@cluster0.u0b3vak.mongodb.net/coderDB?retryWrites=true&w=majority";
let cadenaConexionLocal = "mongodb://127.0.0.1:27017/coderDB";
//cadenaConexionBD = cadenaConexionAtlas;
cadenaConexionBD = cadenaConexionLocal;


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const fileStorage = FileStore(session);


const miFirmaSecreta = "pacojeta";
app.use(cookieParser(miFirmaSecreta));

//MongoStore
app.use(session({
    store: MongoStore.create({
            mongoUrl: cadenaConexionBD,
            mongoOtions: {useNewUrlParser: true, useUnifiedTopolofy: true},
            ttl: 10000
            }),
    
    secret: miFirmaSecreta,
    resave: false,
    saveUninitialized: false
    }
))

//Passport
/* initializePassport();

app.use(passport.initialize());
app.use(passport.session); */

//Configuracion para handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

//Routers
//app.use("/", sessionsRouter);
//app.use("/", viewsRouter);

//Passport
initializePassport();

app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use("/", sessionsRouter);
app.use("/", viewsRouter);

//JWT
app.use("/", jwtRouter);




export const userManager = new UserManager();


console.log("Dirname: ", __dirname);

const httpServer = app.listen(port, () => console.log("Conectado al server en port " + port + " con Express"));



mongoose.connect(cadenaConexionBD)
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch(err => {
    console.log("ERROR al conectarme: ", err);
})