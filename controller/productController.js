const product = require('../models/productSchema')
const Employee = require('../models/employeeSchema')


exports.viewProducts = (req, res, next) => {
    console.log(req.query)
    product.find()
    .select('-__v -employees')
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
    product.findById(ID).populate("employees").populate("teamLead")
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
        title: body.title,
        description: body.description,
        status: body.status,
        teamLead: body.teamLead,
        author: body.author
    })
    product.find({title: body.title})
    .then(result=>{
        if(result){
            let error = new Error("product already created")
            error.status = 301
            throw error
        }
        console.log(result)
        
    return Product.save()
    })
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
    const { params } = req,
        { body } = req,
        userID = body.userID,
        teamLead = body.teamLead
        removeID = body.removeID

    let ID = params.ID
    let query = {}
    let update = {}

    if(userID){
        query = {
            _id: ID, "employees": { $nin: [userID] }
        }
        update = {
            $push: { employees : userID }
        }
    } else if(teamLead) {
        query = {
            _id: ID
        }
        update = {
            teamLead: teamLead
        }
    }else if(removeID) {
        query = {
            _id: ID
        }
        update = {
            $pull: { employees:  removeID } 
        }
    } else {
        let error = new Error("update not recognized")
        error.status = 301
        throw error
    } 

    product.findOneAndUpdate(
        query,
        update)
        .then(result=>{
            if(userID && !result){
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