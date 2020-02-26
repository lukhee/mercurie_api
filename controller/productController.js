const product = require('../models/productSchema')
const Employee = require('../models/employeeSchema')


exports.viewProducts = (req, res, next) => {
    let APIquery = req.query
    let query = {}
    if(APIquery.status){
        query.status = APIquery.status
    }
    limit = Number(APIquery.limit)
    product.find(query)
    .select('-__v -employees')
    .limit(limit)
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
        if(!result){
            let error = new Error("product already created")
            error.status = 301
            throw error
        }
        console.log(result)
        
    return Product.save()
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

exports.updateProduct = (req, res, next) => {
    const { params } = req,
        { body } = req,
        value = body.payload
        updateField = body.field
        let ID = params.ID,
            query = {},
            update = {}

        switch(updateField) {
            case "employeeToProject": 
                query = {
                    _id: ID, "employees": { $nin: [value] }
                }
                update = {
                    $push: { employees : value }
                }
                break;
            case "removeEmployee":
                query = {
                    _id: ID
                }
                update = {
                    $pull: { employees:  value } 
                }
                break;
            case "addTeamLead":
                query = {
                    _id: ID
                }
                update = {
                    teamLead: value
                }
                break;
            case "generalUpdate":
                query = {
                    _id: ID
                }
                update = genaralUpdate
                break;
          default:
            let error = new Error("update name not recognized")
            error.status = 301
            throw error
          }
    product.findOneAndUpdate(
        query,
        update)
        .then(result=>{
            if(value && !result){
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