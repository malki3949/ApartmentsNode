import mongoose from "mongoose";
const citySchema = new mongoose.Schema({
   name:{
    type: String,
    require: true,
   } ,
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'apartment'
    }],
   
})

export default mongoose.model('city', citySchema)
