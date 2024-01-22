import express from "express";

const router = express.Router();

const users = [];

router.get("/api/users", (req, res) => {
    res.json(users);
})

router.post("/api/users", (req, res) => {
    let user = req.body;
    users.push(user);
    console.log("Usuario: ", user);
    res.send("Usuario creado");
})

export default router;