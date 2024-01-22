import express from "express";

import path from "path";
import { fileURLToPath } from 'url';

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import getDirectorioAnterior from "./utils.js";
import multer from "multer";


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

app.use(express.static(path.join(__dirname, "public")));
console.log("Dirname: ", __dirname);

app.use("/", usersRouter);
app.use("/", petsRouter)

app.get("/", (req, res) => {
    res.sendFile(__dirname, "public", "uploadFiles.html");
})  
//Nota: esta función la agrego porque la agregamos en clase, pero en realidad está demas. 
//Con especificar app.use(express.static(path.join(__dirname, "public"))) todo lo que esté en "public" se accede como archivo estático

const storage = multer.diskStorage({
    destination :  (req, file, cb) => {
        cb(null, "routerMulter\\descargas");   
    },
    filename: (req, file, cb) => {
        const timeStamp = Date.now();
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        cb(null, `${timeStamp}-${originalName}`);
    } 
})

const upload = multer({storage});

app.post("/descargas", upload.single("archivo"), (req, res) => {
    res.json({message: "Archivo subido correctamente"});
})

app.listen(port, () => console.log("Conectado al server en port " + port + " con Express"));


