const jwt = require('jsonwebtoken')
const ShortUrl = require('../models/url.model')

const authenticate = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,'verysecrettoken')
        // res.locals.email = decode.email
        // console.log(decode.email)
        // res.locals.email = decode.email
        next()
    } catch (error) {
        if(error.name == "TokenExpiredError") {
            res.status(401).json({
                message: "Token Expired"
            })
        }
        else {
            res.json({
                message: "Authentication failed "+error
            })
        }
    }
}

const isPublic = async (req,res,next) => {
    try {
        const shorturl = req.params.shortid
        const data = await ShortUrl.findOne({short_url:shorturl})
        const ispublic = data.public
        if(ispublic === true){
            next()
        }
        else{
            try {
                const token = req.headers.authorization.split(' ')[1]
                const decode = jwt.verify(token,'verysecrettoken')
                next()
            } catch (error) {
                if(error.name == "TokenExpiredError") {
                    res.status(401).json({
                        message: "Token Expired"
                    })
                }
                else {
                    res.json({
                        message: "Authentication failed "+error
                    })
                }
            }
        }
    } catch (error) {
        res.send("something went wrong")
    }
}

module.exports = {authenticate, isPublic}