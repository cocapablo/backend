//Manejo de archivos
const fs = require("fs");

console.log("Clase 4: Manejo de archivos en node");

/*
Funciones sincronicas
readFileSync (lee un archivo)
writeFilesync (escribe un archivo. Lo crea si no existe)
appendFileSync (agrega al final del archivo)
unlinkSync (borra archivo)
mkdirSync (crea un directorio)
*/

/* //Escribir archivo

const data = "Contenido para escribir el archivo dos\r\n";

try {
    fs.writeFileSync("miarchivo.txt", data);
    console.log("Archivo creado correctamente");
}
catch (error) {
    console.log("Error al escribir el archivo", error);
} */

/* //Leer archivo
try {
    const datos = fs.readFileSync("miarchivo.txt", "utf-8")
    console.log("Archivo creado correctamente: ", datos);
}
catch (error) {
    console.log("Error al leer el archivo", error);
} */

/* //Agregar datos
const datosExtra = "Ahora agrego esto\r\n";
try {
    fs.appendFileSync("miarchivo.txt", datosExtra);
    console.log("Datos agregados correctamente");
}
catch (error) {
    console.log("Error al agregar al archivo", error);
} */

//Borrar archivo
/* try {
    fs.unlinkSync("miarchivo.txt")
    console.log("Archivo borrado correctamente");
}
catch (error) {
    console.log("Error al borrar al archivo", error);
} */

//Crear una carpeta
/* try {
    fs.mkdirSync("miCarpeta");
    console.log("Carpeta creada correctamente");
}
catch (error) {
    console.log("Error al crear la carpeta", error);
} */

//Funciones asincronas
//Con Callbakcs

//Leer archivo
function leerArchivoConCallbacks() {
    let bios = [];

    fs.readFile("miarchivo.json", "utf-8", (error, datos) => {
        if (error) return console.log("Error al leer el archivo", error);
        console.log("Archivo leído exitosamente", datos);
        bios = JSON.parse(datos);
        console.log("Mis bio: ", bios);
    });
    
 
}

function escribirArchivoconCallBacks() {
    let bio = {
        nombre: "Pablo",
        apellido: "Coca",
        edad: 51,
        mail: "cocapablo@gmail.com",
        fechaNacimiento: new Date(1972, 2, 25)
    }
    let bios = [];

    bios.push(bio);


    let bioString = JSON.stringify(bios);

    fs.writeFile("miarchivo.json", bioString, (error) => {
        if (error) return console.log("Error al escribir el archivo", error);
        console.log("Archivo escrito exitosamente", bioString);
    });
    
 
}

function agregarArchivoconCallBacks() {
    let bio = {
        nombre: "Emiliano Valentín",
        apellido: "Coca",
        edad: 8,
        mail: "emicoca@gmail.com",
        fechaNacimiento: new Date(2015, 8, 24)
    }

    let bios = [];

    fs.readFile("miarchivo.json", "utf-8", (error, datos) => {
        if (error) return console.log("Error al leer el archivo", error);
        console.log("Archivo leído exitosamente", datos);
        bios = JSON.parse(datos);
        console.log("Mis bios anteriores: ", bios);

        //Paso 2: Agrego la nueva bio
        bios.push(bio);

        let bioString = JSON.stringify(bios);
        
        //Error : para agregar acá hay que sobreescribir el archivo anterior con el nuevo array
        /* fs.appendFile("miarchivo.json", bioString, (error) => {
            if (error) return console.log("Error al agregar al archivo", error);
            console.log("Archivo agregado exitosamente", bioString);
        }); */

        fs.writeFile("miarchivo.json", bioString, (error) => {
            if (error) return console.log("Error al agregar al archivo", error);
            console.log("Archivo agregado exitosamente", bioString);
        });


    });
     
}

//escribirArchivoconCallBacks();
leerArchivoConCallbacks();
agregarArchivoconCallBacks();
console.log("Terminé de procesar el archivo asincronicamente");






