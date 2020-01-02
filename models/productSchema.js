const mongoose = require("mongoose")//Require Mongoose

//Define a schema
var Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    teamLead: {
        type: String,
        required: false
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema);