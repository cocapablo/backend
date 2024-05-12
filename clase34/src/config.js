import dotenv from "dotenv";

const environment = "PROD";

dotenv.config({path: environment === "DEV" ? "./env.dev" : "./env.prod"});

export default {
    env: process.env.ENV
}