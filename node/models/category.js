import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
   name:{
    type: String,
    require: true,
   } ,
   description: String,
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'apartment'
    }]
})
export default mongoose.model('category', categorySchema)
