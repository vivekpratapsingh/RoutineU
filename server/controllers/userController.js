const {body,validationResult} = require('express-validator/check');
const {sanitizeBody,sanitizeParam,sanitizeQuery} = require('express-validator/filter');
const User = require('../models/users');

//get current user
exports.get_current_user = function(req,res,next){
    User.findById(req.auth.id,function(err,user){
        if(err){
            next(err);
        }
        else{
            req.user = user;
            next();
        }
    });
}

//update user details by id
exports.update_user_detail = [
    // sanitizeBody('*').trim().escape(),
    sanitizeParam('*').trim().escape(),
    sanitizeQuery('*').trim().escape(),
    (req,res,next) => {

        User.findOneAndUpdate({_id: req.params.id},{ $set : req.body},{new :true},(err,updatedUser) => {
            if(err){
                console.log(err);
            }
            console.log(updatedUser);
            res.send(updatedUser);
        });

        // User.findOneAndUpdate({_id: req.params.id},{ $set : req.body},{new :true}).populate('full_name').exec(function(err,updatedUser){
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log(updatedUser);
        //     res.send(updatedUser);
        // });
    }
]

//get user detail by id
exports.get_user_by_id = function(req,res,next){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log(err);
            next(err);
        }
        if(user == null){
            res.status(404);
            next();
        }
        else{
            res.send(user);
        }
    })
}