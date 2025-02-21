
import express from 'express'
import {
    register,
    login,
    getAll

} from '../controllers/person.js'
//import { checkEmail} from "../midelwewes.js"

const router = express.Router()
router.get('', getAll)
router.post('',register)
router.post('/login',login)


// router.get('/getbyid/:id', getById)
// router.get('/getbycategory/:id', getByCatgeory)
// router.get('/gettitles', getTitleAndCategory)
// router.post('', checkToken, categoryExists, create)
// router.delete('/:id', checkToken, remove)
// router.patch('/:id', checkToken, categoryExists, update)

export default router;
