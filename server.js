const express = require('express')
const path = require('path')
const app = express()

app.set('views' , './view') //views is everything that is inside view folder
app.set('view engine' , 'ejs') //seting the view engine using ejs 

app.use(express.static(path.join(__dirname , 'view')))

app.get('/' , (req , res) => {
    return res.render('index')
})

app.listen(8000, () => {
    console.log("Server is running on port : 8000")
})