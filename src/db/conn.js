require('dotenv').config()
const mongoose = require('mongoose')


const uri = process.env.URI 

mongoose.connect(uri)
const db = mongoose.connection 

db.on('error',(err) => {
    console.log(err)
})

db.once('open',()=> {
    console.log("Database Connection Established")
})