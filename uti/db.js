const mongoose = require('mongoose');
const Employee = require('../models/employeeSchema')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const url = 'mongodb://localhost:27017/Mercurie'
// const url = 'mongodb+srv://mercurie:balogun007.@cluster0-w3x0u.mongodb.net/test?retryWrites=true&w=majority'

let password = "mercurie@2019"
const email = "mercurie@ymail.com"

module.exports = function MongooseConnection() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(connect => {
        console.log("db connected")
    })
    .catch(err => {
        err.statusCode = 500
        next(err)
    })
} 