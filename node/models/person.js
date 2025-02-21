import mongoose from "mongoose";
const personSchema = new mongoose.Schema({
   
    email: {
        type: String,
        require: true,
       //  match: /^[A-Za-z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
    },
    password: {
        type: String,
        require: true
    },
    fhone:{
        type: String,
        require: true ,
        maxLength: 50
    },
    anotherFhone:{
        type: String,
        require: false ,
        maxLength: 50
    },
    description: String,
   // שדה של מערך - הגדרה לכל איבר במערך
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'apartment'
    }]
})
export default mongoose.model('person', personSchema)