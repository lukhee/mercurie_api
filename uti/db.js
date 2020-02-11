const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, DEFAULT_DB, PORT} = require('../config')
const url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0-w3x0u.mongodb.net/${DEFAULT_DB}?retryWrites=true&w=majority`

// let password = "mercurie@2019"
// const email = "mercurie@ymail.com"

module.exports = function MongooseConnection() {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(connect => {
        console.log("db connected")
    })
    .catch(err => {
        err.status = 500
        console.log(err)
        throw err
    })
} 