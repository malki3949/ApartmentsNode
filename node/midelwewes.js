import jwt from "jsonwebtoken"
import Category from "./models/category.js"
import person from "./models/person.js"
import apartment from  "./models/apartment.js"
import multer from 'multer'
import dotenv from 'dotenv'
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const bodyParser = require('body-parser');
// מידלוור כללי
// אין לו הגדרת ניתוב
// בהגדרת קריאת שרת שתרצה להשתמש בו - נשלח אליו
// export const checkEmail = (req, res, next) => {
//     const { email } = req.body
//     if (email && email.contains('@')) {
//         return next()
//     }
//     res.status(400).send({ error: 'invalid email!' })
// }
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 3000;

// // MongoDB URI
// const mongoURI = 'your_mongodb_uri_here';

// // Create mongo connection
// const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// // Init gfs
// let gfs;
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: 'uploads' // Collection name
//     };
//   }
// });
// const upload = multer({ storage });

// // @route POST /upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   res.json({ file: req.file });
// });

// // @route GET /files/:filename
// app.get('/files/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     if (!file || file.length === 0) {
//       return res.status(404).json({ err: 'No file exists' });
//     }
//     const readstream = gfs.createReadStream(file.filename);
//     readstream.pipe(res);
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });










export const categoryExists = (req, res, next) => {

    const { codeCategory } = req.body

    if (!codeCategory &&( req.method == 'PATCH'|| req.method == 'PUT')) {
        return next()
    }

    Category.findById(codeCategory)
        .then(category => {
            if (!category) {
                return res.status(404).send({ error: `catgory not found!` })
            }
            next()
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}

// בדיקה האם נשלח טוקן והאם הוא תקין ותקף
export const checkToken = (req, res, next) => {
   
    if (!req.headers.authorization) {
        // אין הרשאה
        return res.status(401).send({ error: 'Authorization failed!11' })
    }

    const token = req.headers.authorization.split(' ')[1]
    console.log(token);
    if (!token) {
        return res.status(401).send({ error: 'Authorization failed!22' })
    }

    // decoded - פיענוח
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            // האימות נכשל
            return res.status(401).send({ error: 'Authentication failed!33' })
        }
        if (decoded) {
            // האובייקט יכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
            // באם יהיה צורך נוכל לשמור אותם באובייקט הבקשה ואז להשתמש בפונקציות הבאות
            next()
        }
    })

}
// export const checkToken = (req, res, next) => {    
//     if (!req.headers.authorization)
//         res.status(401).send("Aouthoration field")
//     const token = req.headers.authorization.split(' ')[1]
//     if (!token){
//         res.status(401).send("Aouthoration field")
//     }
//     jwt.verify(token,  process.env.SECRET, (error, decoded) => {
//         console.log(process.env.SECRET);
//         if (error || !decoded)
//             res.status(401).send("Aouthoration field")
//         else
//             next()
//     })
// }
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    cb(null, false)
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
})


export const upload= multer({
    storage,
    limits: {
        fileSize: 88888 * 88888 * 2
    },
    fileFilter
})

