import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

/* app.use(express.json());
app.use(express.urlencoded({extended:true})); */

//Rutas
import toysRouter from "./routes/toys.js";
import usersRouter from"./routes/users.js";

app.use("/toys", toysRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log("Server escuchando en port " + PORT);
})