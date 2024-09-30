const express = require('express')
const router = express.Router()
const Carts = require('../models/Carts')
const cartController = require('../controllers/cartController')


router.get('/', cartController.getCartsByEmail)
router.post('/', cartController.addToCart)
router.delete('/:id', cartController.deleteCart)
router.put('/:id', cartController.updateCart)
router.get('/:id', cartController.getSingleCart)


module.exports = router