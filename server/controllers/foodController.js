const Food = require('../models/foods');

exports.get_food = function(req,res,next){
    Food.find(function(err,foods){
        if(err){
            next(err);
        }
        if(foods == null || foods.length < 1){
            res.status(404);
            res.send('No food found');
        }
        else{
            res.status(200);
            res.send(foods);
        }
    })
}

exports.get_food_by_name = function(req,res,next){
    let query = req.query.name;
    if(query != ""){
        Food.findOne({name : query},function(err,foods){
            if(err){
                console.log(err);
                next(err);
            }
            if(foods == null || foods.length < 1){
                res.status(404);
                res.send()
            }
            else{
                res.status(200);
                res.send(foods);
            }
        })
    }
    else{
        res.status(400);
        res.send('query required');
    }
}