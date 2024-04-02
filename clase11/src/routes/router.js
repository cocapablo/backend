import { Router } from "express";
import { authToken } from "../utils.js";

export default class UserRouter { //UserRouter es una clase abstracta
    constructor() {
        this.router = Router();
        this.init();
    }

    getRouter() {
        return this.router;
    }

    init() {}; //Implemrntada en las subclases

    get(path, policies, ...callbacks) {
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    post(path, policies, ...callbacks) {
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    put(path, policies, ...callbacks) {
        this.router.put(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    delete(path, policies, ...callbacks) {
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks));
    }

    applyCallbacks(callbacks) {
        return callbacks.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params)
            }
            catch (error) {
                console.log("Error: ", error);
                params[1].status(500).send({status: "error", error: error.toString()})   
            }
        })
    }

    generateCustomResponses(req, res, next) {
        res.sendSuccess = payload => res.send({status: "success", payload: payload});
        res.sendUserError = error => res.status(400).send({status: "error", error: error});

        next();
    }

    handlePolicies(policies) {
        return (req, res, next) => {

            if (policies.includes("PUBLIC")) {
                //Cualquiera puede entrar aunque no tenga token
                return next();
            }

            //Paso 2: Obtengo los datos del usuario del token
            authToken(req, res, next);
            
            if (!req.user) {
                return res.status(401).send({status: "error", error: "El Usuario no tiene token"})
            }
    
            const role = req.user.role;
    
            if (!policies.includes(role)) {
                return res.status(403).send({status: "error", error: "El Usuario no tiene permisos suficientes para realizar la operación"})    
            }
    
            //Todo Ok
            next();
    
        }
    }

}