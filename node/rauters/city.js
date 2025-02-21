
import express from 'express'
import {

    createCity,
     getAllcity
} 
from '../controllers/city.js'
import { categoryExists, checkToken } from '../midelwewes.js'

const router = express.Router()

router.get('', getAllcity)

router.post('',checkToken,createCity)

export default router;