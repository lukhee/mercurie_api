const Employee = require('../models/employeeSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createEmployee = ( req, res, next ) => {
    const { body } = req
    let newEmployee = new Employee({
        name: body.name,
        email: body.email,
        role: body.role,
        level: body.level
    })
    Employee.findOne({email: body.email})
    .then(result=>{
        if(result){
            let error = new Error("employee with the email found")
            error.status = 400
            throw error
        }
        return bcrypt.hash(body.password, saltRounds)
    })
    .then(hashPassword=>{
        newEmployee.password = hashPassword
        return newEmployee.save()
    })
    .then(result=>{
        res.status(201).json({
            message: result
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.findAllEmployee= (req, res, next) => { 
    let query = { }
    let users = req.body.member
    if(users){
        query = { _id: { $nin: [ ...users ] } } // excluding some user/employees
    }
    Employee.find(query)
    .select('-__v -password')
    .then(result=>{
        res.json({
            message: result
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.findEmployeeByID = (req, res, next) => {
    const { params } = req
    const ID = params.ID
    console.log(ID)
    Employee.findById(ID)
    .populate('products')
    .select('-__v -password')
    .then(result=>{
        if(!result){
            let error = new Error("employee not found")
            error.status = 400
            throw(error)
        }
        res.status(201).json({
            message: result
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.updateEmployee = (req, res, next) => {
    const { params, body } = req
    const level = body.level
    const ID = params.ID
    Employee.findByIdAndUpdate(ID, { level: level })
    .then(result=>{
        res.status(200).json({
            message: result
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.deleteEmployee = (req, res, next) => {
    const { params } = req
    const ID = params.id
    Employee.findByIdAndDelete(ID)
    .then(result=>{
        res.json({
            message: "employee deleted successfully"
        })
    })
    .catch(err=>{
        next(err)
    })
}