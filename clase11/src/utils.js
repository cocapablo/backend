function getDirectorioAnterior(sDirectorio) {
    let directorios = sDirectorio.split("\\");

    //Remuevo el último
    let ultimoDirectorio = directorios.pop();
    console.log("Ultimo directorio: ", ultimoDirectorio);

    let directorioAnterior = directorios.join("\\");
    console.log("Directorio anterior: ", directorioAnterior);

    return directorioAnterior;
}

export default getDirectorioAnterior;