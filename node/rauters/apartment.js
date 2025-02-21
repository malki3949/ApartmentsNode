
import express from 'express'
import {
    update,
    removeapart,
    createApart,
    getByCodePerson,
    geMorePrice,
    gePrice,
    geLessPrice,
    geLessBe,
    getMoreBe,
    getBybeds,
    getByCity,
    getByCatgeory,
    getById,
    getAllapart,
    getAllmain

} from '../controllers/apartment.js'
import { categoryExists, checkToken,upload } from "../midelwewes.js"

const router = express.Router()

router.get('', getAllapart)
router.get('/getAllmain/:codeperson', getAllmain)
router.get('/getbyid/:id', getById)
router.get('/getbycategory/:codeCategory', getByCatgeory)
router.get('/getByCity/:codeCity', getByCity)
router.get('/getbyCodeperson/:id', getByCodePerson)
router.get('/geMorePrice/:price', geMorePrice)
router.get('/gePrice/:price', gePrice)
router.get('/geLessPrice/:price', geLessPrice)
router.get('/geLessBe/:beds', geLessBe)
router.get('/getMoreBe/:beds', getMoreBe)
router.get('/getBybeds/:beds', getBybeds)
router.post('',upload.single('image'),checkToken, createApart)
router.delete('/:id/:codeperson',checkToken, removeapart)
 //router.delete('', removeapart)
 //checkToken, categoryExists, 
router.patch('/:id/:codeperson',checkToken,update)

export default router;