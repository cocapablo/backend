import express from "express";
import studentClase17Model from "../models/studentsClase17.model.js";
import { usuarioLogueado, usuarioNoLogueado } from "../middlewares/sessionMiddleware.js";

const router = express.Router();

router.get("/", usuarioLogueado, (req, res) => {
    let usuario = {};

    //Obtengo el usuario de la session actual
    req.session && req.session.user && (usuario = req.session.user);

    console.log("Usuario en la Session: ", usuario);

    res.render("index", {user: usuario});
})

router.get('/students', usuarioLogueado, async (req,res)=>{
    let page = parseInt(req.query.page);
    if(!page) page=1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    let result = await studentClase17Model.paginate({},{page,limit:5,lean:true})
    console.log("Pagina devuelta: ", result);
    result.prevLink = result.hasPrevPage?`http://localhost:8080/students?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/students?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    console.log("Resultado a pasar a View: ", result);
    res.render('students',result)
})

router.get("/login", usuarioNoLogueado, (req, res) => {
    let error = false;
    let mensajeError = "";

    req.query && req.query.error && (error = (req.query.error === "true" ? true : false));
    console.log("Error: ", error);
    req.query && req.query.mensajeError && (mensajeError = req.query.mensajeError);
    console.log("Mensaje Error: ", mensajeError);

    res.render("login", {error, mensajeError});
})

router.get("/register", usuarioNoLogueado, (req, res) => {
    let error = false;
    let mensajeError = "";

    req.query && req.query.error && (error = (req.query.error === "true" ? true : false));
    console.log("Error: ", error);
    req.query && req.query.mensajeError && (mensajeError = req.query.mensajeError);
    console.log("Mensaje Error: ", mensajeError);

    res.render("register", {error, mensajeError});
})

router.get("/profile", usuarioLogueado, (req, res) => {
    let usuario = {};

    //Obtengo el usuario de la session actual
    req.session && req.session.user && (usuario = req.session.user);

    console.log("Usuario en la Session: ", usuario);

    res.render("profile", {user: usuario});
})

router.get("/changePassword", usuarioNoLogueado, (req, res) => {
    let error = false;
    let mensajeError = "";

    req.query && req.query.error && (error = (req.query.error === "true" ? true : false));
    console.log("Error: ", error);
    req.query && req.query.mensajeError && (mensajeError = req.query.mensajeError);
    console.log("Mensaje Error: ", mensajeError);

    res.render("changePassword", {error, mensajeError});
})


export default router;