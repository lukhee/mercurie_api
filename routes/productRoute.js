const route = require('express').Router()
const productController = require('../controller/productController')

route.get("/viewProduct", productController.viewProducts)

route.get("/viewProduct/:ID", productController.viewProductByID)

route.post('/createProduct', productController.createProcuct)

route.delete('/deleteProduct/:ID', productController.deleteProduct)

route.put('/updateProduct/:ID', productController.updateProduct)

module.exports = route