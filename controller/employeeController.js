const Employee = require('../models/employeeSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createEmployee = ( req, res, next ) => {
    const { body } = req
    let newEmployee = new Employee({
        name: body.name,
        email: body.email,
        role: body.role,
        level: body.level,
        description: body.description,
        password: "password"
    })
    Employee.findOne({email: body.email})
    .then(result=>{
        if(result){
            let error = new Error("employee with the email found")
            error.status = 301
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
    let APIquery = req.query
    let users
    if(req.body.payLoad){
        users = req.body.payLoad.employee
    }
    let filterQuery = {}
    let query = { }
    if(APIquery.status){
        filterQuery.status = APIquery.status
    }
    if(users){
        query = { _id: { $nin: [ ...users ] } } // excluding some user/employees
    } else if(APIquery.status){
        query = { level: APIquery.status }
    } else {
        query = { }
    }
    limit = Number(APIquery.limit)
    console.log(query)
    Employee.find(query)
    .select('-__v -password -email -products')
    .limit(limit)
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
    const ID = params.ID
    Employee.findByIdAndRemove(ID)
    .then(result=>{
        res.json({
            message: "employee deleted successfully"
        })
    })
    .catch(err=>{
        next(err)
    })
}