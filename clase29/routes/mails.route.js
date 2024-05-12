import { Router} from "express";
import nodemailer from "nodemailer";
import configuracion from "../src/config/config.js";

const router = Router();

console.log("Config en mailRouter" ,configuracion);

const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: configuracion.mailUserName,
        pass: configuracion.mailPassword
    }
})

router.get("/", async (req, res) => {  // Toda esta parte de mail falta implementarlo en MVC
    const resultado = await transport.sendMail({
        from: "Correo de Prueba <" + configuracion.mailUserName + ">",
        to: configuracion.mailUserName,
        subject: "Correo de Prueba",
        html: `<div> 
                <h1> Este es un genial mail de prueba </h1>
                <div>
                    <p>Amo los caballos salvajes</p>
                </div>
               </div>`,
        attachments:[]

    })

    console.log("Resultado del envío del mail: ", resultado);

    res.send("Correo enviado exitosamente");
})

export default router;