import express from "express";

import businessRoute from "../routes/business.route.js";
import usersRoute from "../routes/users.route.js";
import ordersRoute from "../routes/orders.route.js";
import mailsRoute from "../routes/mails.route.js";

import mongoose from "mongoose";

import { Command } from "commander";
import { configurarEntorno } from "./config/config.js";

//Cargo las configuraciones del entorno
const program = new Command();

program
    .option("-modobd <modobd>", "Define si la Base de Datos es local o está en la nube", "CLOUD");
    
program.parse();

console.log("Program Options", program.options);
console.log("Program opts", program.opts());
console.log("Remaining arguments", program.args);

//Config
//console.log("Config", config);



const config = configurarEntorno(program.opts());

console.log("Config", config);

const port = config.port || 4500;

let cadenaConexionBD = config.mongoUrl || "mongodb://127.0.0.1:27017/clase29";

const app = express();

const connection = mongoose.connect(cadenaConexionBD)
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch(err => {
    console.log("ERROR al conectarme: ", err);
})

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/users", usersRoute);
app.use("/api/business", businessRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/mail", mailsRoute);

app.listen(port, () => {
    console.log("Server corriendo en port " + port);
})

export const configuracion = config;

