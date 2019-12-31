const mongoose = require("mongoose")//Require Mongoose

//Define a schema
var Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
     products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
     }]
}, {
    timestamps: true
})

module.exports = mongoose.model('employee', EmployeeSchema);