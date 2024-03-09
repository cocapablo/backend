import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const studentClase17Collection = "studentsClase17";

const studentClase17Schema = new mongoose.Schema({
    first_name: {
        type: String, 
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
    },
    grade: Number,
    group: String

})

studentClase17Schema.plugin(mongoosePaginate);

const studentClase17Model = mongoose.model(studentClase17Collection, studentClase17Schema);

export default studentClase17Model;