import express from "express";
import usersRouter from "../routes/users.routes.js";
import compression from "express-compression";
import errorHandler from "../middlewares/errors/index.js";

import config from "../config/config.js";


const app = express();

const PORT = config.port || 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/users", usersRouter);

app.use(errorHandler); //Los middlewares de manejo de errores se configuran al final de todas las rutas y se activan si algun endpoint lanza un error

//Middleware compresion
//app.use(compression());  //por default comprime con gzip
app.use(compression({brotli:{enabled: true}, zlib: {}})); //Comprime con brotli

//Ruta para un string
app.get("/string", (req, res) => {
    let string = "Hola soy Pablo Coca el grande";

    for (let i = 0; i < 100000; ++i) {
        string += "Hola soy Pablo Coca el grande - " + i;
    }

    res.send({status: "success", payload: string});
})

app.listen(PORT, () => console.log("Servidor corriendo en port " + PORT));




