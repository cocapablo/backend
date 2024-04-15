import * as usersService from "../services/usersService.js"

//Obtener todos los juguetes

export function getAllUsers(req, res) {
    console.log("Estoy en getAllUsers");
    let users = usersService.getAllUsers();
    res.json(users);
}

export function createUser(req, res) {
    const newUser = req.body;

    usersService.createUser(newUser);

    res.status(201).json(newUser);
}