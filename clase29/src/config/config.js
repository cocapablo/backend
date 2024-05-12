import dotenv from "dotenv";
import { Command } from "commander";



const MODOBD = "CLOUD";


//Cargo las configuraciones del entorno
const program = new Command();

program
    .option("-modobd <modobd>", "Define si la Base de Datos es local o está en la nube", "CLOUD");
    
program.parse();

console.log("Program Options", program.options);
console.log("Program opts", program.opts());
console.log("Remaining arguments", program.args);

export function configurarEntorno(opciones) {
    let modobd = "LOCAL";
    let config = {};

    opciones.Modobd && (modobd = opciones.Modobd);

    dotenv.config({
        path: modobd === "LOCAL" ? "./src/config/.env.local" : "./src/config/.env.cloud"
    })

    //Configuro config
    config = {
        port: process.env.PORT,
        mongoUrl: process.env.MONGO_URL,
        adminEmail: process.env.ADMIN_EMAIL,
        adminPassword: process.env.ADMIN_PASSWORD,    
        mailUserName : process.env.MAIL_USERNAME,
        mailPassword : process.env.MAIL_PASSWORD
    }

    return config;

}

//Ejecuto primero un configurarEntorno por default
configurarEntorno(program.opts());

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    mailUserName : process.env.MAIL_USERNAME,
    mailPassword : process.env.MAIL_PASSWORD
}