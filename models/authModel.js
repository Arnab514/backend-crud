const {Schema , model} = require('mongoose')

const authSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
    },
} , {timestamps : true})

module.exports = new model('users' , authSchema)