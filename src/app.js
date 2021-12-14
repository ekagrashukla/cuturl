const express = require('express')

const urlRoute = require('./routes/url.route')
const morgan = require('morgan')
require('./db/conn')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/', urlRoute)

const PORT = process.env.PORT || 3000;

app.listen(3000, ()=> console.log(`Server Running on port ${PORT}`))