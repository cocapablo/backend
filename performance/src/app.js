import express from 'express';
import mongoose from 'mongoose';
import sessionsRouter from './routes/sessions.router.js';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = process.env.PORT || 8080;
const urlMongoLocal = "mongodb://127.0.0.1:27017/performance";
const urlMongoAtlas = "mongodb+srv://cocapablo:FKITs3H3kYgRNPSy@cluster0.u0b3vak.mongodb.net/performance?retryWrites=true&w=majority"
const connection = mongoose.connect(urlMongoLocal);


app.use(express.json());


app.use('/api/sessions',sessionsRouter);

//Este endpoint sirve para poder crear el usuario virtual con variables para utilizar en el resto de endpoints
app.get('/api/test/user',(req,res)=>{
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let email = faker.internet.email();
    let password =  faker.internet.password();
    res.send({first_name,last_name,email,password})
})

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))