const mongoose = require("mongoose")//Require Mongoose

//Define a schema
var Schema = mongoose.Schema;

let ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    author: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending'
    },
    teamLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema);