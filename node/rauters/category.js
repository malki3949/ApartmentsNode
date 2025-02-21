
import express from 'express'
import {
    
    createCate,
    getAllcategory


} from '../controllers/category.js'
import { categoryExists, checkToken } from '../midelwewes.js'

const router = express.Router()

router.get('', getAllcategory)
router.post('',checkToken,createCate)


export default router;