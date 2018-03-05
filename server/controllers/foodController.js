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

const update_food = function(id,food,next){
    Food.findByIdAndUpdate(id,food,function(err,result){
        if(err){
            next(err);
        }
        return result;
    })
}

exports.update_food = update_food;

const get_food_id = function(id,next){
    Food.findById(id,function(err,food){
        if(err){
            next(err);
        }
        return food;
    })
}
exports.get_food_id = get_food_id;