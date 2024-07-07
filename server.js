const express = require('express')
const path = require('path')
const app = express()
const authRoute = require('./Routes/authRoutes')

app.set('views' , './view') //views is everything that is inside view folder
app.set('view engine' , 'ejs') //seting the view engine using ejs 

app.use(express.static(path.join(__dirname , 'view')))
app.use('/' , authRoute)

app.get('/' , (req , res) => {
    res.send("home")
})

app.listen(8000, () => {
    console.log("Server is running on port : 8000")
})