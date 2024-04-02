import express, { Router } from "express";

const router = Router();

const pets = [];

//Middleware para validar el formato de la mascota

function validarNombreMascota(req, res, next) {
    const nombreMascota = req.params.pet;
    const expresion = RegExp("^[a-zA-Z\s]+$");

    if (!expresion.test(nombreMascota)) {
        return res.status(400).json({status: "error", message: "Nombre de mascota inválido"});
    }

    next();

}

//Middleware para obtener la mascota por nombre
router.param("pet", (req, res, next, petName) => {
    const pet = pets.find(pet => pet.name === petName);

    if (!pet) {
        return res.status(404).json({status: "error", message: "Mascota no encontrada"});
    }

    req.pet = pet;

    next();
})

router.get("/api/pets/:pet", validarNombreMascota, (req, res) => {
    //Primero se llama al middleware validarNombreMascota y luego llama automáticamente al middleware router.parm trayendo los datos de la mascota dentro de req.pet
    if (req.pet) {
        const pet = req.pet;
        return res.json({status: "success", pet: pet});
    }
    else {
        return res.status(404).json({status: "error", message: "Mascota no encontrada"});    
    }
})

router.post("/api/pets", (req, res) => {
    const {name, specie} = req.body;

    
    if (!name || !specie) {
        return res.status(400).json({status: "error", message: "Debe especificar nombre y especie de la mascota"});
    }

    console.log("Llegué hasta acá");

    const newPet = {
        name,
        specie
    }

    pets.push(newPet);

    res.status(201).json({status: "success", pet: newPet});
})

//API para marcar una mascota como adoptada
router.put("/api/pets/:pet", validarNombreMascota, (req, res) => {
    //Primero se llama al middleware validarNombreMascota y luego llama automáticamente al middleware router.parm trayendo los datos de la mascota dentro de req.pet
    if (req.pet) {
        const pet = req.pet;
        pet.adopted = true;
        return res.json({status: "success", pet: pet});
    }
    else {
        return res.status(404).json({status: "error", message: "Mascota no encontrada"});    
    }
}) 

router.get("/api/pets", (req, res) => {
    res.json(pets);
})


export default router;