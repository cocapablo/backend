import express from "express";
import * as toysController from "../controllers/toysController.js";

const router = express.Router(); 

router.get("/", toysController.getAllToys);

router.post("/", toysController.createToy);

export default router;