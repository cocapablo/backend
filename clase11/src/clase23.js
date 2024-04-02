import express from "express";
import petsRouter from "./routes/pets.router.js";
import UserRouter from "./routes/users.js";
import SessionRouter from "./routes/loginRouter.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", petsRouter);

const userRouter = new UserRouter();
app.use("/", userRouter.getRouter());

const sessionRouter = new SessionRouter();
app.use("/", sessionRouter.getRouter());

app.listen(port, () => {
    console.log("Servidor corriendo en port " + port);
});


//End Points de Login
