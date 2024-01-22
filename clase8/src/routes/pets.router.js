import express from "express";

const pets = [];

const router = express.Router();

router.get("/api/pets", (req, res) => {
    res.json(pets);
})

router.post("/api/pets", (req, res) => {
    let pet = req.body;
    pets.push(pet);
    console.log("Mascota: ", pet);
    res.json("Mascota creada");
})

export default router;