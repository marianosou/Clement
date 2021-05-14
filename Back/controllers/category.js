const { Type, Year, Country } = require('../models');

const getTypes = (req, res) => {
    Type.findAll()
       .then(types => res.status(200).json(types))
}
 
const addType = (req, res) => {
    Type.findOne({
       where: { name: req.body.name }
    }).then((type) => {
       if (!type) {
          Type.create(req.body)
             .then(typeCreated => res.status(201).json(typeCreated))
       } else {
          res.status(400).send("Category already exists")
 
       }
    })
}
 
const deleteType = (req, res) => {
    Type.destroy({
       where: { id: req.params.id }
    })
       .then(() => res.status(200).json())
       .catch(err => {
          console.log(err)
          res.sendStatus
       })
}
 
const updateType =  (req, res) => {
    Type.update(req.body, {
       where: { id: req.params.id },
       returning: true,
       plain: true
    }).then((typeUpdated) => {
       res.status(200).json(typeUpdated[1])
    });
}
 
const getYears = (req, res) => {
    Year.findAll()
       .then(years => res.status(200).json(years))
}
 
const addYear = (req, res) => {
    Year.findOne({
       where: { name: req.body.name }
    }).then((year) => {
       if (!year) {
          Year.create(req.body)
             .then(yearCreated => res.status(201).json(yearCreated))
       } else {
          res.status(400).send("Category already exists")
       }
    })
}
 
const deleteYear =  (req, res) => {
    Year.destroy({
       where: { id: req.params.id }
    })
       .then(() => res.status(200).json())
}
 
const updateYear = (req, res) => {
    Year.update(req.body, {
       where: { id: req.params.id },
       returning: true,
       plain: true
    }).then((yearUpdated) => {
       res.status(200).json(yearUpdated[1])
    });
}
 
const getCountries = (req, res) => {
    Country.findAll()
       .then(countries => res.status(200).json(countries))
}
 
const addCountry = (req, res) => {
    Country.findOne({
       where: { name: req.body.name }
    }).then((country) => {
       if (!country) {
          Country.create(req.body)
             .then(countryCreated => res.status(201).json(countryCreated))
       } else {
          res.status(400).send("Category already exists")
       }
    })
}
 
const deleteCountry = (req, res) => {
    Country.destroy({
       where: { id: req.params.id }
    })
       .then(() => res.status(200).json())
}
 
const updateCountry = (req, res) => {
    Country.update(req.body, {
       where: { id: req.params.id },
       returning: true,
       plain: true
    }).then((countryUpdated) => {
       res.status(200).json(countryUpdated[1])
    })
}
 
module.exports = { getTypes, addType, deleteType, updateType, getYears, addYear, deleteYear, updateYear, getCountries, addCountry, deleteCountry, updateCountry }