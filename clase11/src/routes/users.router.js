import express, { Router } from "express";
import mongoose from "mongoose";
import userModel from "../models/users.model.js";


const router = Router();

router.get("/api/users", async (req, res) => {
    try {
        let users = await userModel.find();
        res.send({result: "success", payload: users});
    }
    catch (error) {

    }
})

router.post("/api/users", async (req, res) => {
    let {first_name, last_name, email, gender} = req.body;

    if (!first_name || !last_name || !email || !gender) {
        res.send({status: "error", error: "Faltan datos"})
    }

    let result = await userModel.create({first_name, last_name, email, gender});
    res.send({result: "success", payload: result});
})

router.put("/api/users/:uid", async (req, res) => {
    let {uid} = req.params;
    let userToReplace = req.body;
    if (!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email || !userToReplace.gender) {
        res.send({status: "error", error: "Faltan datos"});    
    }

    let result = await userModel.updateOne({_id: uid}, userToReplace);

    res.send({result: "success", payload: result});
})


router.delete("/api/users/:uid", async (req, res) => {
    let {uid} = req.params;
    
    let result = await userModel.deleteOne({_id: uid});

    res.send({result: "success", payload: result});
})

export default router;