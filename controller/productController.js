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
    console.log("ID", ID)
    const userID = req.body.userID
    console.log(userID)
    product.findOneAndUpdate(
        { _id: ID, "employees": { $nin: [userID] } },
        { $push: { employees : userID } })
        .then(result=>{
            res.json({
                message : result
            })
        })
        .catch(err=>{
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