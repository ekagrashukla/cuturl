const ShortUrl = require('../models/url.model')
const User = require('../models/user.model')
const shortid = require('shortid')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const shorturl = async (req,res) => {
    try {
        const {longUrl} = req.body
    
        if(!longUrl){
            res.send("Not a valid URL")
        }    
        const urlExists = await ShortUrl.findOne({full_url:longUrl})
        if (urlExists){
            res.send(`URL already existed ==> http://localhost:3000/${urlExists.short_url}`)
        }
        else{
            const token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token,'verysecrettoken')
            const email = (decode.email)
            // const email = req.locals.email
            const userdata = await User.findOne({email:email})
            const userid = (userdata._id)
            const sid = shortid.generate()
            const shortUrl = new ShortUrl({full_url: longUrl, short_url: sid, user:userid})

            const result = await shortUrl.save()
            res.send("Short URL created successfully ==> http://localhost:3000/"+result.short_url)
        }
    } catch (error) { 
        res.send(error)
    }
}

const unshorturl = async (req,res) => {
    try {
        const {shortid} = req.params
        const result = await ShortUrl.findOne({short_url:shortid})
        if(!result){
            res.send("Not Found")
        }
        else{
            ShortUrl.findOneAndUpdate(
                {short_url:shortid},
                { $inc: { click_count: 1 },shared_on:Date.now()},
                {new: true}
            ).then((response)=>{
                res.redirect(result.full_url)
            })
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = {shorturl, unshorturl}