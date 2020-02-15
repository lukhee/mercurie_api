const route = require('express').Router()
const employeeController = require('../controller/employeeController')

route.get("/findAllEmployees", employeeController.findAllEmployee)

route.get("/findEmployeeByID/:ID", employeeController.findEmployeeByID)

route.post("/createEmployee", employeeController.createEmployee)

route.put("/updateEmployee/:ID", employeeController.updateEmployee)

route.delete('/deleteEmployee/:ID', employeeController.deleteEmployee)

module.exports = route