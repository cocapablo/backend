import mongoose from "mongoose";

const courseCollection = "courses";

const courseSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        max: 100
    },
    description: {
        type: String, 
        required: true,
        max: 100
    },
    difficulty : Number,
    topics: {
        type: Array,
        default: []
    },
    professor: {
        type: String, 
        required: true,
        max: 50
    },
    students: {
        type: Array,
        default: []
    },

})

const courseModel = mongoose.model(courseCollection, courseSchema);

export default courseModel;