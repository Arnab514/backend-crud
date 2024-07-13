const express = require('express')
const path = require('path')
const app = express()
const authRoute = require('./Routes/authRoutes')
const bodyParser = require('body-parser')
const dbConnect = require('./config/dbConnect')
const session = require('express-session')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')

app.set('views' , './view') //views is everything that is inside view folder
app.set('view engine' , 'ejs') //seting the view engine using ejs 

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname , 'view')))
app.use('/' , authRoute)

app.use(cookieParser)
app.use(session({
    secret: '895yu835yy9wie804u985',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.get('/' , (req , res) => {
    res.send("home")
})

dbConnect()

app.listen(8000, () => {
    console.log("Server is running on port : 8000")
})