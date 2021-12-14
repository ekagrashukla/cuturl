const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken')

const register = async (req,res) => {
    try{
        let user = new User ({
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        res.json({
            message: "User added successfully"
        })
    }
    catch(error){
        res.json({
            message: error
        })
    }
}

const login = async (req,res) => {
    User.findOne({email:req.body.email})
    .then(user => {
        if(user){
            if (req.body.password === user.password){
                let token = jwt.sign({email:user.email}, 'verysecrettoken', {expiresIn: '10d'})
                res.json({
                    message: 'Login successful',
                    token: token
                })
            }
            else{
                res.json({
                    message:"Pasword does not match"
                })
            }
        }
        else{
            res.json({
                mesage:"No user found"
            })
        }
    })
}

module.exports = {register, login}