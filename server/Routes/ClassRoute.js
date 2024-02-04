const express = require('express')
const router = express.Router()
const { read, list, create, update, remove } = require('../Controllers/ClassController')

//http://localhost:5000/api/crudclass
router.get('/crudclass/:id', read)
router.get('/crudclass/', list)
router.post('/crudclass', create)
router.put('/crudclass/:id', update)
router.delete('/crudclass/:id', remove)

module.exports = router
