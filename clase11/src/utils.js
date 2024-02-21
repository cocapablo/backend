import { access, readFile } from "fs/promises";
import mongoose from "mongoose";

function getDirectorioAnterior(sDirectorio) {
    let directorios = sDirectorio.split("\\");

    //Remuevo el último
    let ultimoDirectorio = directorios.pop();
    console.log("Ultimo directorio: ", ultimoDirectorio);

    let directorioAnterior = directorios.join("\\");
    console.log("Directorio anterior: ", directorioAnterior);

    return directorioAnterior;
}

export async function cargarDatosenBDdesdeArchivo(modelo, archivo) {
    let datos = [];
    let cadenaJson;
    let resultado;

        try {
            //Paso1: Leo los datos desde el archivo
            if (await access(archivo).then(() => true).catch(() => false)) {
                cadenaJson =  await readFile(archivo); 
                datos = JSON.parse(cadenaJson);  

                //Paso 2: Grabo en el modelo especificado
                resultado = await modelo.insertMany(datos);
            
            }
            else {
                throw new Error("ERROR: El archivo " + archivo + " no existe");
            }
        }
        catch (error) {
            console.error("ERROR: ", error);
            throw new Error("ERROR: " + error);
        }

        return resultado;
}

export async function getEstadisticas(modelo, condicion) {

    let respuesta = await modelo.find(condicion).explain("executionStats");

    return respuesta;
}

export async function agregarDocumentoAModelo(modelo, documento) {
    let respuesta = await modelo.create(documento);

    return respuesta;
}

export async function agregarCursoAEstudiante(modeloStudent, idStudent, idCourse) {
    let resultado;

    try {
        let student = await modeloStudent.findOne({_id: idStudent});

        console.log("Student: ", student);

        student.courses.push({course: idCourse});

        let resultado = await modeloStudent.updateOne({_id: idStudent}, student);
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return resultado;
}

export async function getStudentFull(modeloStudent, idStudent) {
    let student;

    try {
        student = await modeloStudent.findOne({_id: idStudent}).populate("courses.course");

        console.log("Student: ", student);
        
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return student;

}

export default getDirectorioAnterior;