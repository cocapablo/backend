function escribirArchivo(texto, fnCallback) {
    console.log(texto);
    setTimeout(fnCallback, 2000);
    setTimeout(() => {
        fnCallback()
        }
        , 3000);
}

console.log("Inicio del programa");

escribirArchivo("Texto de escribir archivo", () => console.log("Terminé de escribir el archivo"));

console.log("Terminó el programa");