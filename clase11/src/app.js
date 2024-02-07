import express from "express";
import handlebars from "express-handlebars";
import {Server} from "socket.io";

import path from "path";
import { fileURLToPath } from 'url';

import viewsRouter from "./routes/views.router.js";
import getDirectorioAnterior from "./utils.js";

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

//Configuracion para handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

const httpServer= app.listen(port, () => console.log("Conectado al server en port " + port + " con Express"));

const socketServer = new Server(httpServer);

const mensajes = [];
const usuarios = {};

socketServer.on("connection", socket => {
    console.log("Nuevo usuario conectado");

    socket.on("nuevoUsuario", usuario => {
        usuarios[socket.id] = usuario;
        socketServer.emit("usuarioConectado", usuario);
    })

    socket.on("bienvenida", datos => {
        console.log(datos);

        socket.emit("gracias", "Hola cliente. Todo bien por acá");
    })

    socket.on("mensaje", mensaje => {
        console.log("Mensaje recibido: ", mensaje);
        const nombreUsuario = usuarios[socket.id];
        //mensajes.push(mensaje);

        //Envío la lista de mensajes a todos los sockets
        socketServer.emit("nuevoMensaje", {nombreUsuario, mensaje});
    })
})




