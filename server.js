const express = require('express')
const path = require('path')
const app = express()
const authRoute = require('./Routes/authRoutes')
const bodyParser = require('body-parser')
const dbConnect = require('./config/dbConnect')
// const dbConnect = require(dbConnect)

app.set('views' , './view') //views is everything that is inside view folder
app.set('view engine' , 'ejs') //seting the view engine using ejs 

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname , 'view')))
app.use('/' , authRoute)

app.get('/' , (req , res) => {
    res.send("home")
})

dbConnect()

app.listen(8000, () => {
    console.log("Server is running on port : 8000")
})