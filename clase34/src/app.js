import express from "express";
import { addLogger } from "./utils/logger.js";
//import { addLogger } from "./utils/logger.entorno.js";

const app = express();

app.use(addLogger);

app.get("/", (req, res) => {
    //req.logger.warn("¡ATENTIS! Esto es una alerta");
    //req.logger.warning(`ALERTA!! - ${req.method} en ${req.url} - Dia: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`);
    //req.logger.info(`INFO!! - ${req.method} en ${req.url} - Dia: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`);
    req.logger.fatal(`FATAL!! - ${req.method} en ${req.url} - Dia: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`);
    //req.logger.debug(`FATAL!! - ${req.method} en ${req.url} - Dia: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`);
    //req.logger.error(`ERROR!! - ${req.method} en ${req.url} - Dia: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`);
    res.send({message: "Prueba de logger"});
})

app.get("/test", (req, res) => {
    req.logger.info("Este es un mensaje de información");
    req.logger.warn("Este es un mensaje de error");
    res.send({message: "Logger implementado"});
})

app.get("/opsencilla", (req, res) => {
    let result = 0;
    for (let i = 0; i < 100000; ++i) {
        result += i;
    }

    res.send({resultado: result});
    
})

app.get("/opcompleja", (req, res) => {
    let result = 0;
    for (let i = 0; i < 100000000; ++i) {
        result += i;
    }

    res.send({resultado: result});
})

app.listen(8080, () => console.log("Servidor corriendo"));