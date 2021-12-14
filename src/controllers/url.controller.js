const ShortUrl = require('../models/url.model')
const shortid = require('shortid')

const shorturl = async (req,res) => {
    try {
        const {longUrl} = req.body
        console.log(longUrl)
        if(!longUrl){
            res.send("Not a valid URL")
        }
        const urlExists = await ShortUrl.findOne({full_url:longUrl})
        console.log(urlExists)
        if (urlExists){
            res.send(`URL already existed ==> http://localhost:3000/${urlExists.short_url}`)
        }
        else{
            const shortUrl = new ShortUrl({full_url: longUrl, short_url: shortid.generate()})
            const result = await shortUrl.save()
            res.send("Short URL created successfully ==> http://localhost:3000/"+result.shorturl)
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
                { $inc: { click_count: 1 }},
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