import { Router} from "express";
import { generateUser } from "../test/utils.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateErrorInfo } from "../services/errors/info.js";


const router = Router();

router.get("/", (req, res) => {
    let users = [];

    for (let i= 0; i < 100; ++i) {
        let user = generateUser();

        users.push(user);
    }
    
    res.send({status: "success", payload: users});
});


//data
let users = [];

router.post("/", (req, res) => {
    const {first_name, last_name, age, email} = req.body;

    const user = {first_name, last_name, age, email};

    //Manejo de errores
    if (!first_name || !last_name || !email) {
        const miError = CustomError.createError({
            name: "Error creando el Usuario",
            cause: generateErrorInfo({first_name, last_name, age, email}),
            message: "Error al intentar crear el Usuario",
            code: EErrors.INVALID_TYPES_ERROR
        })

        //return next(miError);
    }

    if (users.length === 0) {
        user.id = 1;
    }
    else {
        user.id = users[users.length - 1].id + 1;
    }

    users.push(user);

    res.send({status: "success", payload: user});
})




export default router;