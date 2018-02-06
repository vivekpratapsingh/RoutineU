const User = require('../models/users');

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

exports.update_user_detail = function(req,res,next){
    
}

exports.get_one = function(req,res,next){
    var user = req.user.toObject();
    delete user['facebookProvider'];
    delete user['__v'];
    res.json(user);
}