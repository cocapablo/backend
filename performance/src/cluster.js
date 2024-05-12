import cluster from "cluster";
import { cpus } from "os";
import express from "express";


//console.log("Info de procesadores: ", cpus());
let cantidadProcesadores = cpus().length;


if (cluster.isPrimary) {
    console.log("Cantidad de procesadores: ", cantidadProcesadores);
    console.log("Soy un proceso primario. Mi id es: " + process.pid);
    for (let i = 0; i < cantidadProcesadores; ++i) {
        cluster.fork();
    }
}
else {
    console.log("Soy un proceso worker!!!. Mi id es: " + process.pid);    

    const app = express();

    app.get("/opsencilla", (req, res) => {
        let result = 0;
        for (let i = 0; i < 100000; ++i) {
            result += i;
        }

        console.log("El resultado es : " + result + ". El proceso que atendió esta petición fué el " + process.pid);
        res.send({resultado: "El resultado es : " + result + ". El proceso que atendió esta petición fué el " + process.pid});
        
    })
    
    app.get("/opcompleja", (req, res) => {
        let result = 0;
        for (let i = 0; i < 10000000000; ++i) {
            result += i;
        }
        
        console.log("El resultado es : " + result + ". El proceso que atendió esta petición fué el " + process.pid);
        res.send({resultado: "El resultado es : " + result + ". El proceso que atendió esta petición fué el " + process.pid});
        
    })

    app.listen(8080, () => console.log("Servidor corriendo"));
}
