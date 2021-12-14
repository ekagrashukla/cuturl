const jwt = require('jsonwebtoken')

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
                message: error
            })
        }
    }
}

module.exports = authenticate