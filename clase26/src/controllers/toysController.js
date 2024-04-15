import * as toysService from "../services/toysService.js"

//Obtener todos los juguetes

export function getAllToys(req, res) {
    let toys = toysService.getAllToys();
    res.json(toys);
}

export function createToy(req, res) {
    const newToy = req.body;

    toysService.createToy(newToy);

    res.status(201).json(newToy);
}

