import mongoose from "mongoose";
const apartmentSchema=new mongoose.Schema({
    adds:{
        type:String,
        require: true   

    },
    beds:{
        type:Number,
        require: true   

    },
    codeCategory:{
        type: mongoose.Types.ObjectId,
        ref: 'category',
        require: true   
  
    },
    codeCity:{
        type: mongoose.Types.ObjectId,
        ref: 'city',
        require: true   
    },
    codeperson:{
        type: mongoose.Types.ObjectId,
        ref: 'person',
        require: true     
    },
    desc:{
        type:String,
        require: true   

    },
    name:{
        type:String,
        require: true   

    },
    
    image:{
        type:String,
        require: true   

    },
    price:{
    type:Number,
    require: true   

    }


})
export default mongoose.model('apartment', apartmentSchema)
