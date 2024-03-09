import express from "express";
import session from "express-session";

export function usuarioLogueado(req, res, next) {
    let usuario = null;
    
    req.session && req.session.user && (usuario = req.session.user);
    
    if (usuario) {
        //El usuario está logueado 
        return next()
    }
    
    //El usuario no está logueado : lo redirecciono al login
    res.redirect("/login");

      
}

export function usuarioNoLogueado(req, res, next) {
    let usuario = null;
    
    console.log("Estoy en usuarioNoLogueado");
    
    req.session && req.session.user && (usuario = req.session.user);
    
    if (usuario) {
        //El usuario está logueado : lo redirecciono a home
        res.redirect("/");
        
    }
    
    //El usuario no está logueado : lo dejo loguearse o registrarse
    return next()
      
}

