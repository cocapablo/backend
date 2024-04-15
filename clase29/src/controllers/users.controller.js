
import User from "../dao/classes/user.dao.js";

const userService = new User();

export const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    if (!users) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: users});
}

export const getUserById = async (req, res) => {
    const {uid} = req.params;

    const user = await userService.getUserById(uid);
    if (!user) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: user});
}

export const saveUser = async (req, res) => {
    const user = req.body;

    const result = await userService.saveUser(user);
    if (!result) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: result});
}

export const updateUser = async (req, res) => {
    const {uid} = req.params;
    const user = req.body;

    const result = await userService.updateUser(uid, user);
    if (!result) {
        return res.status(500).send({status: "error", error : "Ups. Algo salió mal"})
    }

    res.status(200).send({status: "success", result: result});    
}