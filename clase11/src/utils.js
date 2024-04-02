import { access, readFile } from "fs/promises";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import passport from "passport";
import jwt from "jsonwebtoken";

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


//jsonwebtoken

export const PRIVATE_KEY = "ClavePrivadaDePabloCoca";

export const COOKIE_TOKEN_NAME = "cookieToken";

export const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, {expiresIn: "24h"});
    return token;
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({status: "error", error : "Usuario No Autenticado"});

    const token = authHeader.split(" ")[1]; //Se hace el split para retirar la palabra Bearer y te quedás con el resto

    console.log("Token recibido", token);

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({status: "error", error : "Usuario No Autorizado"});

        console.log("Credentials: ", credentials);

        req.user = {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password, //Después sacar el password por ser info sensible
            role: credentials.role
        }

        next();
    })
}

export const authTokenCookie = (req, res, next) => {
    //Obtengo el token de una cookie
    let token = null;

    token = cookieExtractor(req);

    if (!token) return res.status(401).send({status: "error", error : "Usuario No Autenticado"});

    console.log("Token recibido", token);

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({status: "error", error : "Usuario No Autorizado"});

        console.log("Credentials: ", credentials);

        req.user = {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password, //Después sacar el password por ser info sensible
            role: credentials.role
        }

        next();
    })
}

export const cookieExtractor = (req) => {
    //Obtengo el token de una cookie
    let token = null;

    req && req.cookies && (token = req.cookies[COOKIE_TOKEN_NAME]);

    return token;
}

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err);

            if (!user) {
                return res.status(401).send({status: "error", error: info.messages ? info.messages : info.toString()});
            }

            req.user = user;

            next();
        }) (req, res, next)
    }
}

export const authorization = (role) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).send({status: "error", error: "Usuario no logueado"});

        if (req.user.role != role) return res.status(403).send({status: "error", error: "Usuario no autorizado"})

        next();
    }
}


export default getDirectorioAnterior;