import express, { Router } from "express";
import { handlePolicies } from "../middlewares/policiesMiddleware.js";


const router = Router();

//Middleware de politicas para esta ruta
router.use("/api/userspolicies/user", handlePolicies(["USER"]));


export default router;