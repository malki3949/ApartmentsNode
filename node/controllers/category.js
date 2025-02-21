// יבוא של המודל
import category from '../models/category.js'

export const getAllcategory = (req, res) => {
    category.find()
        .then(categories => {
            res.status(200).send(categories)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


export const createCate = (req, res) => {

    const {name,apartments} = req.body

    const newCategory = new category({
        name,
        apartments
    })
    newCategory.save()
        .then(category => {
            res.status(200).send({ message: `create category ${category._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

