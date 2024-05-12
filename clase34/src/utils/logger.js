import winston, { transports } from "winston";

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "blue",
        debug: "white"
    }
};

const logger = winston.createLogger({
    //Custom
    //Levels
    levels: customLevelOptions.levels,
    /* transports: [
        new winston.transports.Console({level: "http"}),
        new winston.transports.File({filename: "./errors.log", level: "warn"})
    ] */

    transports: [
        new winston.transports.Console({
            level: "info",

            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),

        new winston.transports.File({
            filename: "./errors.log",
            level: "warning",
            format: winston.format.simple()
        })
    ]
})

winston.addColors(customLevelOptions.colors);

Object.keys(customLevelOptions.levels).forEach((level) => {
    logger[level] = function (message) {
        logger.log({level: level, message: message});
    }
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    //req.logger.http([`${req.method} en ${req.url} - Dia: ${new Date().toLocaleDateString()} - Hora: ${new Date().toLocaleTimeString()}`]);
    next();
}