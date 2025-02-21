import apartment from "../models/apartment.js"
import category from "../models/category.js"
 import city from "../models/city.js"
import person from "../models/person.js"
 import Person from "../models/person.js"
import { app } from "../../app.js"
import multer from 'multer';


///כל הדירות


export const getAllapart = (req, res) => {
    // populate - join
    // במקום לשלוף רק את קוד הקטגוריה - ישלוף את כל האובייקט
    apartment.find().populate({path:'codeCategory',select: "_id  name"}).populate({path:'codeCity' ,select:"_id  name"}).populate({path:'codeperson',select: "_id, email fhone password"})
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getAllmain = (req, res) => {
    // populate - join
    // במקום לשלוף רק את קוד הקטגוריה - ישלוף את כל האובייקט
    apartment.find().where({codeperson:{ $eq: req.params.codeperson } }).populate({path:'codeCategory',select: "-_id  name"}).populate({path:'codeCity' ,select:"-_id  name"}).populate({path:'codeperson',select: "_id email fhone"})
    .then(apart => {
        if(apart.length==0){
            res.status(400).send({ error: err.message })
        }
        res.status(200).send( apart )
    })
    .catch(err => {
        res.status(500).send({ error: err.message })
    })
}
    // .then(list => {
        //     res.status(200).send(list)
        // })
        // .catch(err => {
        //     res.status(500).send({ error: err.message })
        // })

export const getById = (req, res) => {
    apartment.findById(req.params.id).populate({path:'codeCategory',select: " name"}).populate({path:'codeCity' ,select:"-_id  name"}).populate({path:'codeperson',select: "_id , password"})
        .then(apart => {
            res.status(200).send(apart)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getByCatgeory = (req, res) => {
    apartment.find().where({codeCategory:{ $eq: req.params.codeCategory } })
        .then(apart => {
            if(apart.length==0){
                res.status(400).send({ error: err.message })
            }
            res.status(200).send({ apart })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getByCity = (req, res) => {
    apartment.find().where({ codeCity:{ $eq: req.params.codeCity } })
        .then(apart => {
            res.status(200).send({ apart })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getBybeds = (req, res) => {
    apartment.find().where({beds : { $eq: req.params.beds} })
    .then(apart => {
        res.status(200).send({ apart })
    })
    .catch(err => {
        res.status(500).send({ error: err.message })
    })
}

export const getMoreBe = (req, res) => {
    apartment.find().where({ beds: {  $gt: req.params.beds} })
        .then(apart => {
            res.status(200).send({ apart })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const geLessBe = (req, res) => {
    apartment.find().where({ beds: {  $lt: req.params.beds } })
        .then(apart => {
            res.status(200).send({ apart })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const geLessPrice = (req, res) => {
    apartment.find().where({  price: { $lt: req.params.price } })
        .then(apart => {
            res.status(200).send({ apart })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const gePrice = (req, res) => {
    apartment.find().where({ price: {  $eq: req.params.price } })
        .then(apart => {
            res.status(200).send({ apart })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const geMorePrice = (req, res) => {
    apartment.find().where({ price: { $gt: req.params.price } })
        .then(apart => {
            res.status(200).send({ apart })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getByCodePerson = (req, res) => {
    apartment.find().where({ codeperson: { $eq: req.params.id } })
        .then(apart => {
            res.status(200).send({ apart })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


//not_fininishet


//  const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//     cb(null,"uploads/")}
//     ,
    
//     filename:function(req,file,cb){
//         // const uniqurSufeerfix=Date.now();

//         cb(null,file.originalname)
//     }
// })
//   console.log("pppppppp");
//  const upload=multer({storage:storage})

//  console.log("yyyyyyyyy");
//    app.post("/upload-image",upload.single("image"),async(req,res)=>{
//     // const { image } = req.body;
//     //     if (typeof image !== 'string') {
//     //         return res.status(400).send('Image must be a string');}
//     console.log("uuuuuuuuuuu");
//     console.log(req.body);
//     const imagename=req.file.filename
// try{
//    await apartment.create({"image":imagename})
//    res.json({status:"ok"})
// }
// catch{error}
// res.json({status:error})

// app.get("/get-image",async(req,res)=>{
//     try{apartment.find({}).then((data)=>{
//         res.send({status:"ok",data:data});

//     })}
//     catch{error}
// })


    // res.send("uploads")
//    })
//    console.log("ggggggggggggg");
export const createApart = (req, res) => {

    const {path:image}=req.file

    const {adds,beds,codeCategory,codeCity,codeperson,desc,name,price} = req.body

    // יצירת מאמר חדש
    const newApartment = new apartment({

        adds,
        beds,
        codeCategory,
        codeCity,
        codeperson,
        desc,
        name,
        image: image.replace('\\', '/'),
        price 
    })
    
// debugger
    newApartment.save()
    // 
    
        // רק אחרי שהוספנו את הכתבה - 
        // נוכל לעדכן את המערך של הכתבות בקטגוריה -
        // הוספה של איבר חדש - קוד כתבה
        .then(async apart => {
            console.log(newApartment)
            let x = await category.findByIdAndUpdate(apart.codeCategory, { $push: { apartments: apart._id } })
            if (!x) {
                 return res.status(500).send({ message: `create apart ${apart._id} succeed! update category failed!` })
                console.log("create apart ${apart._id} succeed! update category failed!");
            }
            let y = await city.findByIdAndUpdate(apart.codeCity, { $push: { apartments: apart._id } })
            if (!y) {
                 return res.status(500).send({ message: `create apart ${apart._id} succeed! update city failed!` })
                console.log("create apart ${apart._id} succeed! update city failed!");

            }
            let z = await Person.findByIdAndUpdate(apart.codeperson, { $push: { apartments: apart._id } })
            if (!z) {
                 return res.status(500).send({ message: `create apart ${apart._id} succeed! update person failed!` })
                console.log("create apart ${apart._id} succeed! update person failed!");

            }

             return res.status(200).send({ message: `create apart ${apart._id} succeed!` })
            console.log("message: `create apart ${apart._id} succeed!");
        })
        .catch(err => {
            console.log("Error occurred:", err.message);
        });
}

export const removeapart = (req, res) => {

    apartment.findByIdAndDelete(req.params.id).where({ codeperson: { $eq: req.params.codeperson } })
        .then(async apart => {
            if (!apart) {
                return res.status(404).send({ error: `Apartment not found!` })
            }
            let x = await category.findByIdAndUpdate(apart.codeCategory, { $pull: { apartments: apart._id } })
            if (!x) {
                return res.status(200).send({ message: `delete article ${apart._id} succeed! update category failed!` })
            }
            let y = await city.findByIdAndUpdate(apart.codeCity, { $pull: { apartments: apart._id } })
            if (!y) {
                return res.status(200).send({ message: `delete article ${apart._id} succeed! update category failed!` })
            }
            let w = await person.findByIdAndUpdate(apart.codeperson, { $pull: { apartments: apart._id } })
            if (!w) {
                return res.status(200).send({ message: `delete article ${apart._id} succeed! update category failed!` })
            }

            res.status(200).send({ message: `delete article ${apart._id} succeed!` })
        })
        .catch(err => {
            //res.status(500).send({ error: err.message })
            console.log({error: err.message });
        })
}

export const update = (req, res) => {

   /// לא ניתן לעדכן את קוד הכתבה
    // const { _id } = req.body

    // if (_id) {
    //     return res.status(403).send({ error: `update id is forbidden!` })
    // }

    // const { id } = req.params.id
let a=apartment.find().where({_id:{$eq:req.params.id}})
    .then(ap=>{
        const [aa]=ap
        if(aa.codeperson!=req.params.codeperson){
            res.status(401).send("הדירה אינה שלך אין אפשרות לעדכן")}
           else{
            apartment.findByIdAndUpdate(req.params.id, req.body,{ new: true })
            .then(apartment => {
                res.status(200).send({ message: `update article  succeed!`, apartment })
            })
    
            .catch(err => {
                res.status(500).send({ error: err.message })
            })
           }
            


    })
    // apartment.findByIdAndUpdate(id, req.body,{ new: true }).where({ codeperson: { $eq: req.params.codeperson } })
        // .then(async apart => {
        //     const { codeCategory, codeCity,codeperson} = req.body

        //     if (codeCategory) {
        //         // article.category - החזרנו את האובייקט לפני שהשינוי- הקטגוריה הישנה
        //         let x = await category.findByIdAndUpdate(apart.codeCategory, { $pull: { apartments: apart._id } })
        //         // category - נשלח בגוף הבקשה - חדשה
        //         let y = await category.findByIdAndUpdate(codeCategory, { $push: { apartments: apart._id } })
        //         if (!x || !y) {
        //             return res.status(200).send({ message: `update apart ${apart._id} succeed!, upadte categories failed!` })
        //         }}
        //    if(codeCity){
        //         let r = await city.findByIdAndUpdate(apart.codeCity, { $pull: { apartments: apart._id } })
        //         // category - נשלח בגוף הבקשה - חדשה
        //         let u = await city.findByIdAndUpdate(codeCity, { $push: { apartments: apart._id } })
        //         if (!r || !u) {
        //             return res.status(200).send({ message: `update apart ${apart._id} succeed!, upadte city failed!` })
        //         }}
        //         if(codeperson){
        //         let a = await person.findByIdAndUpdate(apart.codeperson, { $pull: { apartments: apart._id } })
        //         // category - נשלח בגוף הבקשה - חדשה
        //         let b = await person.findByIdAndUpdate(codeperson, { $push: { apartments: apart._id } })
        //         if (!a || !b) {
        //             return res.status(200).send({ message: `update apart ${apart._id} succeed!, upadte categories failed!` })
        //         }}


                
            
        


    // article.updateOne(req.body)


}