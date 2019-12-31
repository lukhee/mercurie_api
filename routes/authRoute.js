const route = require('express').Router()
const authController = require('../controller//authControler')

route.get( '/login', authController.login )

module.exports = route