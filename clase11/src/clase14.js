import express from "express";
import userRouter from "./routes/users.router.js"

import path from "path";
import { fileURLToPath } from 'url';

import viewsRouter from "./routes/views.router.js";
import getDirectorioAnterior from "./utils.js";

import mongoose from "mongoose";

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

app.use(express.static(path.join(__dirname, "public"))); //Nota. Si hay un index.html en public lo prioriza a leer antes de la carpeta views
app.use("/", viewsRouter);

console.log("Dirname: ", __dirname);

const httpServer= app.listen(port, () => console.log("Conectado al server en port " + port + " con Express"));

//La cadena de conexion habría que leerla de un archivo por seguridad
let cadenaConexionBD = ""; //reemplazar esto con el valor de la cadena de conexion a la BD
cadenaConexionBD = "mongodb+srv://cocapablo:FKITs3H3kYgRNPSy@cluster0.u0b3vak.mongodb.net/coderDB?retryWrites=true&w=majority";

mongoose.connect(cadenaConexionBD)
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch(err => {
    console.log("ERROR al conectarme: ", err);
})


app.use("/api/users", userRouter);







