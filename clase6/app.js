//Servidores web
//console.log("Curso de Backend en Coder Lunes y Miércoles");

/* const http = require("http");

const server = http.createServer((request, response) => response.end("Mi primer servidor con un modulo nativo"));

server.listen(8080, () => console.log("Servidor escuchando en el port 8080")); */

//Express
const express = require("express");

const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Endpoint
app.get("/api", (req,res) => res.json({
    Mensaje: "Metodo GET"
}));

app.post("/api", (req, res) => {
    res.json({
        Mensaje: "Metodo POST"
    })
})

app.put("/api", (req, res) => {
    res.json({
        Mensaje: "Metodo PUT"
    })
})

app.delete("/api", (req, res) => {
    res.json({
        Mensaje: "Metodo DELETE"
    })
})

app.get("/inicio", (req, res) => res.send("Pagina de inicio de mi servidor"));
app.get("/", (req, res) => res.send("Pagina default de mi servidor"));
app.get("/bienvenida", (req, res) => {
    htmlRespuesta = "<p style='color: blue' > Bienvenido </p>";

    res.send(htmlRespuesta);
})

app.get("/usuarios", (req, res) => {

    const usuario = {
        nombre: "Pablo",
        apellido: "Coca",
        email: "cocapablo@gmail.com"
    }

    res.json(usuario);
})

app.get("/parametro/:nombre", (req, res) => {
    console.log(req.params.nombre);
    res.send("Bienvenido " + req.params.nombre);
})

const usuarios = [
    {id: 1, nombre: "Pablo", apellido: "Coca"},
    {id: 2, nombre: "Ramón", apellido: "Perez"},
    {id: 3, nombre: "Jorge", apellido: "Cosito"}
]

app.get("/listausuarios", (req, res) => {
    res.send(usuarios);
})

app.get("/listausuarios/:userid", (req, res) => {
    const idUsuario = req.params.userid;

    console.log(idUsuario);

    let usuario = usuarios.find((u) => u.id == idUsuario);
    console.log("Usuario: ", usuario);
    if (!usuario) {
        return res.send("ERROR: Usuario no encontrado");
    }
    else {
        res.send(usuario);
    }

})



app.post("/api/usuario", (req, res) => {

    let usuario = req.body;

    if (!usuario.nombre || !usuario.apellido) {
        return res.status(400).send({
            status: "ERROR",
            error: "Faltan campos"
        })
    }

    usuarios.push(usuario);

    res.send({
        status: "success",
        message: "Usuario creado"
    })

})

app.delete("/api/usuario/:idUsuario", (req, res) => {
    let idUsuario;

    if (idUsuario = parseInt(req.params.idUsuario)) {
        usuarios = usuarios.filter(usuario => usuario.id !== idUsuario);
        res.send({
            status: "success",
            message: "Usuario eliminado"    
        })
    }
    else {
        res.status(404).send({
            status : "ERROR",
            error: "idUsuario inválido"
        })
    }
})

const frase = "Comision 50035 de CoderHouse";

app.get("/api/frase", (req, res) => {
    res.json({frase});
})

app.get("/api/palabras/:pos", (req, res) => {
    let pos;

    if (pos = parseInt(req.params.pos)) {
        const palabras = frase.split(" ");
        if (pos < 0 || pos > palabras.length) {
            res.status(404).json({
                status : "ERROR",
                error: "pos fuera de rango"
            })     
        }
        else {
            const palabraElegida = palabras[pos -1];
            res.json({
                palabra : palabraElegida
            })
        }
        
    }
    else {
        res.status(404).json({
            status : "ERROR",
            error: "pos inválida"
        })    
    }
})


/* app.get("/products", (req, res) => {
    let limite = parseInt(req.query.limite);

    let productosLimitados = [...productos];

    if (!isNaN(limite) && )


} ) */

app.listen(port, () => console.log("Conectado al server en port " + port + " con Express"));



