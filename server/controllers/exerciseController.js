const Exercise = require('../models/exercises');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.get_exercise = function (req, res, next) {
    Exercise.find(function (err, exercise) {
        if (err) {
            next(err);
        }
        if (exercise == null || exercise.length < 1) {
            res.status(404);
            res.send();
        }
        else {
            res.send(exercise);
        }
    })
}

exports.get_exercise_by_name = function (req, res, next) {
    let query = req.query.name;
    console.log(query);
    if (query != "") {
        Exercise.find({ $text :{$search : query} }, function (err, exercises) {
            if (err) {
                console.log(err);
                next(err);
            }
            if (exercises == null || exercises.length < 1) {
                res.status(404);
                res.send()
            }
            else {
                res.status(200);
                res.send(exercises);
            }
        })
    }
    else {
        res.status(400);
        res.send('query required');
    }
}

exports.add_exercise = [
    body('name').isLength({ min: 3 }).trim().withMessage('name must be 3 characters long'),
    body('description').isLength({ min: 3 }).trim().withMessage('description must be 3 characters long'),
    body('type').isLength({ min: 1 }).trim().withMessage('type must be provided'),
    body('primary_muscle').isLength({ min: 1 }).trim().withMessage('primary muscle worked must be provided'),
    body('equipment').isLength({ min: 1 }).trim().withMessage('equipment must be provided'),
    body('level').isLength({ min: 1 }).trim().withMessage('level must be provided'),
    body('added_by').isMongoId().withMessage('invalid person'),
    sanitizeBody('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400);
            return res.send({ errors: errors.array() });
        }
        else {
            var exercise = new Exercise({
                name: req.body.name,
                description: req.body.description,
                type: req.body.type,
                primary_muscle: req.body.primary_muscle,
                secondary_muscle: req.body.secondary_muscle,
                equipment: req.body.equipment,
                level: req.body.level,
                added_by: req.body.added_by
            })
            Exercise.findOne({
                "name": exercise.name, "type": exercise.type, "primary_muscle": exercise.primary_muscle,
                "secondary_muscle": exercise.secondary_muscle, "equipment": exercise.equipment, "level": exercise.level
            },
                function (err, result) {
                    if (err) {
                        next(err);
                    }
                    if (!result) {
                        exercise.save(function (error, savedExercise) {
                            if (error) {
                                console.log(error);
                                next(error);
                            }
                            res.status(201)
                            res.send(savedExercise);
                        });
                    }
                    else {
                        res.status(409);
                        res.send(result);
                    }
                })
        }
    }
]

const get_exercise_id = function(id,next){
    Exercise.findById(id).populate('_users').exec(function(err,result){
        if(err){
            next(err);
        }
        return next(result);
    });
}

exports.get_exercise_id = get_exercise_id;

const update_exercise = function(id,exercise,next){
    Exercise.findByIdAndUpdate(id,{$set : exercise},{new :true},function(err,result){
        if(err){
            next(err);
        }
        return result;
    })
}

exports.update_exercise = update_exercise;