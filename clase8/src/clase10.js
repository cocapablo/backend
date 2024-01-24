import express from "express";
import handlebars from "express-handlebars";
import {Server} from "socket.io";

import path from "path";
import { fileURLToPath } from 'url';

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import viewsRouter from "./routes/views.routes.js";
import getDirectorioAnterior from "./utils.js";



const port = 8080;

const app = express();

const __filename = fileURLToPath(import.meta.url);
console.log("Filename: ", __filename);
let __dirname = path.dirname(__filename); 
//Obtener dirname de una funcion que devuelva el directorio anterior al actual
__dirname = getDirectorioAnterior(__dirname); 

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(express.static(path.join(__dirname, "public"))); //Nota. Si hay un index.html en public lo prioriza a leer antes de la carpeta views
app.use("/", viewsRouter);

console.log("Dirname: ", __dirname);

//Configuracion para handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

let users = [
    {
        nombre: "Pablo",
        apellido: "Coca",
        edad: 51,
        correo: "cocapablo@gmail.com",
        telefono: "11-5808-5180",
        role: "admin"
    },
    {
        nombre: "Ruben",
        apellido: "Ojeda",
        edad: 70,
        correo: "ojeda@gmail.com",
        telefono: "11-2222-3333",
        role: "admin"
    },
    {
        nombre: "Martin",
        apellido: "Coca",
        edad: 48,
        correo: "mcoca@gmail.com",
        telefono: "11-4444-6666",
        role: "public"
    },
    {
        nombre: "Ramiro",
        apellido: "Berdasagar",
        edad: 34,
        correo: "ramirito@gmail.com",
        telefono: "11-6666-3333",
        role: "public"
    },
    {
        nombre: "Fernanda",
        apellido: "Pereira",
        edad: 23,
        correo: "fpereira@gmail.com",
        telefono: "11-7890-3333",
        role: "admin"
    }

];

let comidas = [
    {
        nombre: "Hamburguesa",
        precio: 1000
    },
    {
        nombre: "Lomito",
        precio: 2000
    },
    {
        nombre: "Choripan",
        precio: 1500
    },
    {
        nombre: "Pizza",
        precio: 3000
    },
    {
        nombre: "Empanadas",
        precio: 1100
    }
]

/* app.get("/", (req, res) => {
        
    let user;

    let indiceUser = getRandomInt(0, users.length - 1);

    user = users[indiceUser];

    res.render("index", {
        user,
        isAdmin: user.role === "admin",
        comidas
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
} */

const httpServer= app.listen(port, () => console.log("Conectado al server en port " + port + " con Express"));

const socketServer = new Server(httpServer);

const mensajes = [];

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado");

    socket.on("bienvenida", datos => {
        console.log(datos);

        socket.emit("gracias", "Hola cliente. Todo bien por acá");
    })

    socket.on("mensaje", mensaje => {
        console.log("Mensaje recibido: ", mensaje);
        mensajes.push(mensaje);

        //Envío la lista de mensajes a todos los sockets
        socketServer.emit("listaMensajes", mensajes);
    })
})



//NOTA: Pasar la carpeta public y views dentro de src

