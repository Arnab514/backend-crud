const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/backend-crud")
        console.log("DB connected successfully...")
    } catch (error) {
        console.log("Error in connecting db" , error)
    }
}

module.exports = dbConnect