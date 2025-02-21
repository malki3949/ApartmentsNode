import express from "express"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import apartmentRouter from './node/rauters/apartment.js'
import categoryRouter from './node/rauters/category.js'
import cityRouter from './node/rauters/city.js'
import personRouter from './node/rauters/person.js'
import apartment from "./node/models/apartment.js"


export const app=express()
//const port = 3001
dotenv.config();



app.use(bodyParser.json())
app.use(cors())
app.use(express.static("uploads"))
mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😁');
    })
    .catch(err => {
        console.log({ error: err.message });
    })

// npm i dotenv
// התקנה של ספריית משתני סביבה
//import dotenv from 'dotenv'
app.get('',(req,res)=>{
    res.send('🤣❤😍🤦‍♀️🤦‍♀️')
})
// app.get("/get-image"(req,res)=>{
// try{apartment.find}


   
app.use('/apartment', apartmentRouter)
app.use('/category', categoryRouter)
app.use('/city', cityRouter)
app.use('/person', personRouter)


app.listen(3001, () => {
    console.log(`my application is listening on http://localhost:${3001}`);
})
