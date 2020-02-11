const Employee = require('../models/employeeSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createEmployee = ( req, res, next ) => {
    const { body } = req
    let newEmployee = new Employee({
        name: body.name,
        email: body.email,
        role: body.role
    })
    Employee.findOne({email: body.email})
    .then(result=>{
        console.log(result)
        if(result){
            let error = new Error("employee with the email found")
            error.status = 401
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
        query = { _id: { $nin: [ ...users ] } }
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

exports.viewEmployee = (req, res, next) => {
    const { params } = req
    const ID = params.ID // we are to get the ID from auth payrol so we change later when we start login in 
    console.log(req.params)
    Employee.findById(ID).populate('products')
    .then(result=>{
        if(!result){
            let error = new Error("employee not found")
            error.status = 401
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
    res.send("update employees")
}

exports.deleteEmployee = (req, res, next) => {
    const { params } = req
    const ID = params.ID
    Employee.findByIdAndDelete(ID)
    .then(result=>{
        res.json({
            message: "employee deleted successfully"
        })
    })
    .catch(err=>{
        next(err)
    })
    res.send("delete employees")
}