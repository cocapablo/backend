import express from "express";

import businessRoute from "../routes/business.route.js";
import usersRoute from "../routes/users.route.js";
import ordersRoute from "../routes/orders.route.js";
import mongoose from "mongoose";



const app = express();

const connection = mongoose.connect("mongodb://127.0.0.1:27017/clase29")
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch(err => {
    console.log("ERROR al conectarme: ", err);
})

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/api/users", usersRoute);
app.use("/api/business", businessRoute);
app.use("/api/orders", ordersRoute);


app.listen(4500, () => {
    console.log("Server corriendo en port 4500");
})