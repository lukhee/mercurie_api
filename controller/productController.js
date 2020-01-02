const product = require('../models/productSchema')
const Employee = require('../models/employeeSchema')


exports.viewProducts = (req, res, next) => {
    product.find()
    .then(result=>{
        res.status(200).json({
            message: result
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.viewProductByID = (req, res, next) => {
    const { body } = req
    const ID = req.params.ID
    console.log(ID)
    product.findById(ID).populate("employees")
    .then(result=>{
        res.status(200).json({
            message: result
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.createProcuct = (req, res, next) => {
    const { body } = req
    const Product = new product({
        name: body.name,
        description: body.description,
        status: body.status,
    })
    return Product.save()
    .then(result=>{
        res.json({
            message: result
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.updateProduct = (req, res, next) => {
    const { params } = req
    let ID = params.ID
    const userID = req.body.userID
    product.findOneAndUpdate(
        { _id: ID, "employees": { $nin: [userID] } },
        { $push: { employees : userID } })
        .then(result=>{
            if(!result){
                let error = new Error("employee already added")
                error.status = 301
                throw error
            }
            res.json({
                message : result
            })
        })
        .catch(err=>{
            err.status = 500
            next(err)
        })
}

exports.deleteProduct = (req, res, next) => {
    const { params } = req
    let ID = params.ID
    product.findByIdAndDelete(ID)
    .then(result=>{
        res.status(201).json({
            message: result
        })
    })
    .catch(err=>{
        next(err)
    })
}