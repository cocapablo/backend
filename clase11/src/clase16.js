import express from "express";
import userRouter from "./routes/users.router.js"

import path from "path";
import { fileURLToPath } from 'url';

import viewsRouter from "./routes/views.router.js";
import getDirectorioAnterior from "./utils.js";

import mongoose from "mongoose";
import userModel from "./models/users.model.js";
import studentModel from "./models/students.model.js";
import { cargarDatosenBDdesdeArchivo, getEstadisticas, agregarDocumentoAModelo, agregarCursoAEstudiante, getStudentFull } from "./utils.js";
import courseModel from "./models/courses.model.js";

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
app.use("/", userRouter);

console.log("Dirname: ", __dirname);

const httpServer= app.listen(port, () => console.log("Conectado al server en port " + port + " con Express"));

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


app.use("/api/users", userRouter);

//Cargo los datos al archivo
//cargarDatosenBDdesdeArchivo(userModel, "Users.json").then(resultado => console.log("Resultado: ", resultado)).catch(error => console.log("ERROR: ", error.toString()));


//Estadisticas de búsqueda
//getEstadisticas(userModel, {first_name: "Celia"}).then(estadisticas => console.log("Estadísticas: ", estadisticas)).catch(error => console.log("ERROR: ", error.toString()));

//Agregar student
let newStudent = {
    first_name: "Analía",
    last_name: "Minichuk",
    email: "correorula@gmail.com",
    gender: "Female"
}


/* agregarDocumentoAModelo(studentModel, newStudent).then(resultado => {
    console.log("Resultado: ", resultado);
    newStudent = {...newStudent,
                id: resultado._id}
})
.catch(error => console.log("ERROR: ", error.toString()));



//Agregar Curso
let newCourse = {
    title: "Curso de BackEnd",
    description: "Es un curso que te permite desarrollar servidores que molan y flipan",
    difficulty: 5,
    topics: ["JavaScript", "Servidores", "Motores de plantillas", "Middlewares", "Bases de datos"],
    professor: "Mauricio"
}

agregarDocumentoAModelo(courseModel, newCourse).then(resultado => {
    console.log("Resultado: ", resultado);
    newCourse = {...newCourse,
            id: resultado._id}
    })
    .catch(error => console.log("ERROR: ", error.toString()));

console.log("Student: ", newStudent);
console.log("Course: ", newCourse); */

//Agregar el curso al estudiante
//agregarCursoAEstudiante(studentModel, "65d574cc1b743094a5797aea", "65d578764a0e4bc89b254077").then(resultado => console.log("Resultado: ", resultado)).catch(error => console.log("ERROR: ", error));


//Student con populate
getStudentFull(studentModel, "65d574cc1b743094a5797aea").then(student => {
    console.log("Student: ", JSON.stringify(student, null, 4))}
).catch(error => console.log("ERROR: ", error));