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

app.use(express.static(path.join(__dirname, "public"))); //Nota. Si hay un index.html en public lo prioriza a leer antes de la carpeta views

//Configuracion para handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

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

let ordenes = [
    { name: "Pepperoni", size: "small", price: 19,
      quantity: 10, date:"2021-03-13T08:14:30Z" },
    { name: "Pepperoni", size: "medium", price: 20,
      quantity: 20, date :"2021-03-13T09:13:24Z"},
    { name: "Pepperoni", size: "large", price: 21,
      quantity: 30, date :"2021-03-17T09:22:12Z"},
    { name: "Cheese", size: "small", price: 12,
      quantity: 15, date :"2021-03-13T11:21:39.736Z" },
    { name: "Cheese", size: "medium", price: 13,
      quantity:50, date : "2022-01-12T21:23:13.331Z"},
    { name: "Cheese", size: "large", price: 14,
      quantity: 10, date : "2022-01-12T05:08:13Z"},
    { name: "Vegan", size: "small", price: 17,
      quantity: 10, date : "2021-01-13T05:08:13Z"},
    { name: "Vegan", size: "medium", price: 18,
      quantity: 10, date : "2021-01-13T05:10:13Z"}
 ]


//cargarDatosenBDDesdeArray(orderModel, ordenes).then(resultado => console.log("Resultado: ", resultado)).catch(error => console.log("ERROR: ", error));

//getAggregatesDeOrders(orderModel).then(resultado => console.log("Resultado: ", resultado)).catch(error => console.log("ERROR: ", error));

let students = [{"first_name":"Justino","last_name":"Fidgin","email":"jfidgin0@boston.com","gender":"Male","grade":6,"group":"1B"},
{"first_name":"Ketty","last_name":"Robson","email":"krobson1@prlog.org","gender":"Female","grade":10,"group":"2A"},
{"first_name":"Dierdre","last_name":"Barron","email":"dbarron2@dailymail.co.uk","gender":"Female","grade":9,"group":"1B"},
{"first_name":"Nana","last_name":"Pellew","email":"npellew3@nytimes.com","gender":"Female","grade":6,"group":"1A"},
{"first_name":"Shannan","last_name":"Preshous","email":"spreshous4@paginegialle.it","gender":"Male","grade":8,"group":"2B"},
{"first_name":"Mark","last_name":"Yurchishin","email":"iyurchishin5@google.it","gender":"Male","grade":10,"group":"2B"},
{"first_name":"Tannie","last_name":"Takkos","email":"ttakkos6@mtv.com","gender":"Female","grade":7,"group":"2B"},
{"first_name":"Debbi","last_name":"Eddowis","email":"deddowis7@jigsy.com","gender":"Female","grade":6,"group":"1B"},
{"first_name":"Dugald","last_name":"Toun","email":"dtoun8@java.com","gender":"Male","grade":4,"group":"1A"},
{"first_name":"Lorain","last_name":"Judkin","email":"ljudkin9@bigcartel.com","gender":"Genderqueer","grade":8,"group":"2B"},
{"first_name":"Shelley","last_name":"Crinion","email":"scriniona@wsj.com","gender":"Genderfluid","grade":8,"group":"2A"},
{"first_name":"Kellyann","last_name":"Doel","email":"kdoelb@merriam-webster.com","gender":"Female","grade":8,"group":"1B"},
{"first_name":"Romona","last_name":"Derricoat","email":"rderricoatc@vkontakte.ru","gender":"Female","grade":5,"group":"1A"},
{"first_name":"Lorine","last_name":"McVaugh","email":"lmcvaughd@unc.edu","gender":"Female","grade":4,"group":"2A"},
{"first_name":"Ker","last_name":"Chiese","email":"kchiesee@prlog.org","gender":"Male","grade":8,"group":"1A"},
{"first_name":"Aloisia","last_name":"Hovie","email":"ahovief@simplemachines.org","gender":"Female","grade":8,"group":"2B"},
{"first_name":"Marshall","last_name":"Chatten","email":"mchatteng@creativecommons.org","gender":"Male","grade":9,"group":"2B"},
{"first_name":"Marcelo","last_name":"Rubega","email":"mrubegah@house.gov","gender":"Male","grade":6,"group":"1A"},
{"first_name":"Yves","last_name":"Halsey","email":"yhalseyi@naver.com","gender":"Male","grade":5,"group":"2A"},
{"first_name":"Corene","last_name":"Greed","email":"cgreedj@epa.gov","gender":"Female","grade":8,"group":"1A"}]

//cargarDatosenBDDesdeArray(studentClase17Model, students).then(resultado => console.log("Resultado: ", resultado)).catch(error => console.log("ERROR: ", error));

/* getStudentsDeMejorAPeor(studentClase17Model)
.then(students => console.log("Students: ", JSON.stringify(students, null, 4)))
.catch(error => console.log("ERROR: ", error)); */

/* getStudentsPorGrupo(studentClase17Model)
.then(students => console.log("Students: ", JSON.stringify(students, null, 4)))
.catch(error => console.log("ERROR: ", error)); */

/* getPromedioStudentsDeGrupo(studentClase17Model, "1A")
.then(students => console.log("Students: ", JSON.stringify(students, null, 4)))
.catch(error => console.log("ERROR: ", error)); */

/* getPromedioStudentsDeGrupo(studentClase17Model)
.then(students => console.log("Students: ", JSON.stringify(students, null, 4)))
.catch(error => console.log("ERROR: ", error)); */

/* getPromedioStudentsDeGenero(studentClase17Model, "Male")
.then(students => console.log("Students: ", JSON.stringify(students, null, 4)))
.catch(error => console.log("ERROR: ", error));

getPromedioStudentsDeGenero(studentClase17Model, "Female")
.then(students => console.log("Students: ", JSON.stringify(students, null, 4)))
.catch(error => console.log("ERROR: ", error)); */

getStudentsAprobadosyReprobados(studentClase17Model, 7)
.then(students => console.log("Students: ", JSON.stringify(students, null, 4)))
.catch(error => console.log("ERROR: ", error));

