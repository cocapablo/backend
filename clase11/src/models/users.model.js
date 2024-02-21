import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        index: true,
        required: true,
        max: 100
    },
    last_name: {
        type: String, 
        required: true,
        max: 100
    },
    email: {
        type: String, 
        required: true,
        max: 50
    },
    gender: {
        type: String,
        required: true,
        max: 10
    }
})

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;