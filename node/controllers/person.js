import Person from '../models/person.js'
import jwt from 'jsonwebtoken'

export const getAll = (req, res) => {
    Person.find()
        .then(list => {
            res.status(200).send(list)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// כניסה - signin
export const login = (req, res) => {

    // שליפה לפי שם מפתח
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ error: `email and password are required!`})
    }

    Person.find()
        // חיפוש לפי אימייל
        .where({ email: { $eq: email } })
        .then(async users => {
            // לא נמצאו משתמשים מתאימים
            if (users.length == 0) {
                console.log('email not found!');
                return res.status(404).send({ error: `email and password are not match!` })
            }

            // מערך - שליפה לפי מיקום
            let [user] = users

            // הסימה לא תואמת
            if (user.password !== password) {
                console.log('password is not match!');
                return res.status(404).send({ error: `email and password are not match!` })
            }

            // יצירת טוקן:
            // מקבלת שלשה פרמטרים:
            // 1. נתונים של המשתמש מהם יווצר הטוקן - אין לתת נתונים רגישים כמו סיסמה
            // 2. מחרוזת יחודית למערכת
            // 3. אובייקט אפשרויות - לא חובה
            const token = await jwt.sign(
                { password: user.password, email },
                process.env.SECRET,
                {
                    expiresIn: '1hr', // second
                   
                }
            )

            // המשתמש נמצא - נשלח חזרה לצד לקוח
            res.status(200).send({ user, token })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// הרשמה - signup
export const register = (req, res) => {

    const {email, password,fhone,anotherFhone,apartments } = req.body

    Person.find()
        .or([{ email: { $eq: email }},{password:{$eq: password} }])
        .then(users => {
            if (users.length > 0) {
                return res.status(400).send({ error: 'email has been exists already!' })
            }

            const newUser = new Person({
                email,
                password,
                fhone,
                anotherFhone,
                apartments
            })

            newUser.save()
                .then(async user => {
                    // יצירת טוקן:
                    // מקבלת שלשה פרמטרים:
                    // 1. נתונים של המשתמש מהם יווצר הטוקן - אין לתת נתונים רגישים כמו סיסמה
                    // 2. מחרוזת יחודית למערכת
                    // 3. אובייקט אפשרויות - לא חובה
                    // const token = await jwt.sign(
                    //     { fhone:user.fhone, email },
                    //     process.env.SECRET,
                    //     {
                    //         // ניתן להגדיר תוקף לטוקן
                    //         expiresIn: '6hr' // hours
                            
                    //     }
                    // )

                    const token = await jwt.sign(
                        { password: user.password, email },
                        process.env.SECRET,
                        {
                            // ניתן להגדיר תוקף לטוקן
                            // expiresIn: '1hr' // hours
                            // expiresIn: '1d', // days
                            // expiresIn: '10m', // minutes
                            // expiresIn: '20ms', // mili seconds
                            expiresIn: '1hr', // second
                            // expiresIn: '3 months', 
                        }
                    )



                    return res.status(200).send({ newUser, token })
                })
                .catch(err => {
                    return res.status(500).send({ error: err.message })
                })
        })
}