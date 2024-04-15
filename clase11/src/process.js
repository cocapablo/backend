import { Command } from "commander";
//import config from "./config/config.js";
import { configurarEntorno } from "./config/config.js";

console.log(process.argv.slice(2));

console.log("Directorio actual: " + process.cwd());

console.log("Process id: ", process.pid);

const program = new Command();

program
    .option("-d", "Variable para Desarrollo", false)
    .option("-p <port>", "Puerto en el que ejecuta el Server http", 8080)
    .option("-modobd <modobd>", "Define si la Base de Datos es local o está en la nube", "LOCAL")
    .requiredOption("-saludo <saludo>", "Saludo de bienvenida", "No ha saludado maleducado");
program.parse();

console.log("Program Options", program.options);
console.log("Program opts", program.opts());
console.log("Remaining arguments", program.args);

//Config
//console.log("Config", config);

let config = configurarEntorno(program.opts());

console.log("Config", config);

process.on("exit", () => {
    console.log("Proceso finalizado");
})

process.on("beforeExit", () => {
    console.log("Proceso antes de terminar coño");
})
