import winston from "winston";
import config from "../config.js";

const devLogger = winston.createLogger({

    transports: [
        new winston.transports.Console({level: "verbose"}),
        
    ]
})

const prodLogger = winston.createLogger({

    transports: [
        new winston.transports.Console({level: "http"}),
        new winston.transports.File({filename: "./errors-entorno.log", level: "warn"})
    ]
})

export const addLogger = (req, res, next) => {
    const env = process.env.ENV || "development";

    req.logger = env === "production" ? prodLogger : devLogger;

    //req.logger.http([`${req.method} en ${req.url} - Dia: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`]);
    next();
}