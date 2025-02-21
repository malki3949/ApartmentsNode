// יבוא של המודל
import city from '../models/city.js'

export const getAllcity = (req, res) => {
    city.find()
        .then(City => {
            res.status(200).send(City)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const createCity = (req, res) => {

    const { name ,apartments} = req.body

    const newCity = new city({
        name,
        apartments
    })
    newCity.save()
        .then(city => {
            res.status(200).send({ message: `create city ${city._id} succeed!`})
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

