import mongoose from "mongoose";

const studentCollection = "students";

const studentSchema = new mongoose.Schema({
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
    courses :{
        type: [
            {
                course : {
                    type: mongoose.Schema.ObjectId,
                    ref: "courses"
                }
            }
        ],
        default: []
    }

})

const studentModel = mongoose.model(studentCollection, studentSchema);

export default studentModel;