const route = require('express').Router()
const employeeController = require('../controller/employeeController')

route.post("/viewAllEmployee", employeeController.findAllEmployee)

route.get("/viewEmployees/:ID", employeeController.viewEmployee)

route.post("/createEmployee", employeeController.createEmployee)

route.get("/updateEmployee", employeeController.updateEmployee)

route.get('/deleteEmployee', employeeController.deleteEmployee)

module.exports = route