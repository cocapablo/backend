import { access, readFile } from "fs/promises";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

export async function cargarDatosenBDDesdeArray(modelo, datos) {
    let resultado;

    try {
        resultado = await modelo.insertMany(datos);

        console.log("Resultado: ", resultado);
        
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return resultado;    
}

export async function getAggregatesDeOrders(modeloOrder) {
    let orders;

    try {
        orders = await modeloOrder.aggregate(
            [
                {$match: {size: "medium"}},
                {$group: {_id: "$name", totalQuantity: {$sum: "$quantity"} }},
                {$sort: {totalQuantity: -1}},
                {$group: {_id: 1, orders: {$push: "$$ROOT"}}},
                {$project: {_id: 0, orders: "$orders"}},
                {$merge: {into: "reports"}}
            ]
        )

        console.log("Orders: ", JSON.stringify(orders, null, 4));
        
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return orders;     
}

export async function getStudentsDeMejorAPeor(modeloStudent) {
    let students;

    try {
        students = await modeloStudent.aggregate(
            [
                //{$group: {_id: "$grade", cantidadStudents: {$count: {}}}}
                {$group: {_id: "$grade", students: {$push: {first_name: "$first_name", last_name: "$last_name"}}}},
                {$sort: {_id: -1}}
                
            ]
        )

        console.log("Students: ", JSON.stringify(students, null, 4));
        
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return students;     
}

export async function getStudentsPorGrupo(modeloStudent) {
    let students;

    try {
        students = await modeloStudent.aggregate(
            [
                
                {$group: {_id: "$group", students: {$push: "$$ROOT"}}},
                {$project : {_id: 0, group: "$_id", students: "$students"}}
                           
            ]
        )

        console.log("Students: ", JSON.stringify(students, null, 4));
        
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return students;     
}

export async function getPromedioStudentsDeGrupo(modeloStudent, grupo = "ALL") {
    let students;

    try {
        if (!(grupo === "ALL")) {
            students = await modeloStudent.aggregate(
                [
                    {$match: {group: grupo}},
                    {$group: {_id: "$group", promedio: {$avg: "$grade"}}},
                    {$project : {_id: 0, group: "$_id", promedio: "$promedio"}}
                            
                ]
            )}
        else {
            students = await modeloStudent.aggregate(
                [
                    {$group: {_id: 1, promedio: {$avg: "$grade"}}},
                    {$project : {_id: 0, promedio: "$promedio"}}
                               
                ]
        )}


        console.log("Students: ", JSON.stringify(students, null, 4));
        
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return students;     
}

export async function getPromedioStudentsDeGenero(modeloStudent, genero) {
    let students;

    try {
        
        students = await modeloStudent.aggregate(
            [
                {$match: {gender: genero}},
                {$group: {_id: "$gender", promedio: {$avg: "$grade"}}},
                {$project : {_id: 0, genero: "$_id", promedio: "$promedio"}}
                        
            ]
        )
        
        console.log("Students: ", JSON.stringify(students, null, 4));
        
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return students;     
}

export async function getStudentsAprobadosyReprobados(modeloStudent, notaLimite) {
    let students;

    try {
        
        students = await modeloStudent.aggregate(
            [
                {$project : {_id: 1, first_name: 1, last_name: 1, email: 1, gender: 1, grade: 1, group: 1, Aprobado: { $gte: [ "$grade", notaLimite ]} }},
                {$group: {_id: "$Aprobado", students: {$push: "$$ROOT"} }},
                {$project: {_id: 0, Aprobado : "$_id", Students: "$students"}}
                //{$match: {gender: genero}},
                //{$group: {_id: "$gender", promedio: {$avg: "$grade"}}},
                //{$project : {_id: 0, genero: "$_id", promedio: "$promedio"}}
                        
            ]
        )
        
        console.log("Students: ", JSON.stringify(students, null, 4));
        
    }
    catch (error) {
        throw new Error("ERROR: " + error);
    }

    return students;     
}

//Funciones de encriptación

export const createHash = (password) => {
    let passwordEncriptada;

    passwordEncriptada = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    console.log("Password Encriptado: ", passwordEncriptada);

    return passwordEncriptada
}

export const isValidPassword = (user, password) => {
    let isValid;

    isValid = bcrypt.compareSync(password, user.password);

    return isValid;
}


export default getDirectorioAnterior;