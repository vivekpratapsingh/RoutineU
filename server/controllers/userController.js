const { body, validationResult } = require('express-validator/check');
const { sanitizeBody, sanitizeParam, sanitizeQuery } = require('express-validator/filter');
const User = require('../models/users');
const exercise_controller = require('./exerciseController');
const food_controller = require('./foodController');

//get current user
exports.get_current_user = function (req, res, next) {
    User.findById(req.auth.id).populate('user.logs.exercise.exercise').populate('logs.diet.food').exec(function (err, user) {
        if (err) {
            next(err);
        }
        else {
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
    (req, res, next) => {

        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, (err, updatedUser) => {
            if (err) {
                console.log(err);
            }
            console.log(updatedUser);
            res.send(updatedUser);
        });
    }
]

//get user detail by id
exports.get_user_by_id = function (req, res, next) {
    User.findById(req.params.id).populate('logs.exercise.exercise').populate('logs.diet.food').exec(function (err, user) {
        if (err) {
            console.log(err);
            next(err);
        }
        if (user == null) {
            res.status(404);
            next();
        }
        else {
            res.send(user);
        }
    })
}

//add exercise log
exports.add_exercise_log = [
    body('exercise').isMongoId().withMessage('Invalid exercise'),
    body('intensity').isLength({ min: 1 }).withMessage('exercise sets are required'),
    body('added').isLength({ min: 1 }).withMessage('date is required'),
    sanitizeBody('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            return res.send({ errors: errors.array() });
        }
        else {
            const userId = req.params.id;
            User.findById(userId).populate('logs.exercise.exercise').populate('logs.diet.food').exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                if (user) {
                    const exerciseLog = req.body;
                    if (user.logs.exercise == undefined) {
                        user.logs.exercise = [];
                    }
                    user.logs.exercise.push(exerciseLog);
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }).populate('logs.exercise.exercise').populate('logs.diet.food').exec(function (error, updatedUser) {
                        if (error) {
                            return next(error);
                        }
                        else {
                            console.log(updatedUser);
                            // updatedUser = attachExerciseToLog(updatedUser);
                            res.status(201);
                            res.send(updatedUser);
                        }
                    })
                }
                else {
                    next('user not found');
                }
            })
        }
    }
];

//update exercise log
exports.update_exercise_log = [
    body('_id').isMongoId().withMessage('Invalid exercise log'),
    body('exercise').isMongoId().withMessage('Invalid exercise'),
    body('added').isLength({ min: 1 }).withMessage('date is required'),
    sanitizeBody('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            return res.send({ errors: errors.array() });
        }
        else {
            const userId = req.params.id;
            User.findById(userId, function (err, user) {
                if (err) {
                    next(err);
                }
                if (user) {
                    const exerciseLog = req.body;
                    const logId = exerciseLog._id;
                    if (user.logs.exercise == undefined) {
                        user.logs.exercise = [];
                    }
                    if (logId) {
                        const exerciseLogId = filterLogById(user.logs.exercise, logId);
                        //remove logged exercise
                        user.logs.exercise.splice(exerciseLogId, 1);
                    }
                    if (exerciseLog.intensity.length > 0) {
                        user.logs.exercise.push({
                            exercise: exerciseLog.exercise,
                            intensity: exerciseLog.intensity,
                            added: exerciseLog.added
                        });
                    }
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }).populate('logs.exercise.exercise').populate('logs.diet.food').exec(function (error, updatedUser) {
                        if (error) {
                            next(error);
                        }
                        else {
                            console.log(updatedUser);
                            res.status(201);
                            res.send(updatedUser);
                        }
                    })
                }
                else {
                    next('user not found');
                }
            })
        }
    }
]

//remove exercise log
exports.remove_exercise_log = function (req, res, next) {
    const userId = req.params.id;
    User.findById(userId, function (err, user) {
        if (err) {
            next(err);
        }
        if (user) {
            const logId = req.params.logId;
            if (user.logs.exercise == undefined) {
                user.logs.exercise = [];
            }
            if (logId) {
                const exerciseLogId = filterLogById(user.logs.exercise, logId);
                if (exerciseLogId > -1) {
                    //delete exercise log
                    user.logs.exercise.splice(exerciseLogId, 1);
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }).populate('logs.exercise.exercise').populate('logs.diet.food').exec(function (error, updatedUser) {
                        if (error) {
                            next(error);
                        }
                        user = updatedUser;
                        console.log(updatedUser);
                        res.status(201);
                        res.send(updatedUser);
                    });
                }
                else {
                    res.status(201);
                    res.send(user);
                }
            }
            else {
                res.status(400);
                res.send('resourse log not provided');
            }
        }
        else {
            next('user not found');
        }
    })
}

//add water log
exports.add_water_log = [
    body('amount').isLength({ min: 1 }).withMessage('water amount is required'),
    body('added').isLength({ min: 1 }).withMessage('water amount is required'),
    sanitizeBody('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            res.send(errors.array());
        }
        else {
            const userId = req.params.id;

            User.findById(userId, function (err, user) {
                if (err) {
                    next(err);
                }
                if (user) {
                    const waterLog = req.body;
                    if (user.logs.water == undefined) {
                        user.logs.water = [];
                    }
                    user.logs.water.push(waterLog);
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }).populate('logs.exercise.exercise').exec(function (error, updatedUser) {
                        if (error) {
                            next(error);
                        }
                        else {
                            console.log(updatedUser);
                            res.status(201);
                            res.send(updatedUser);
                        }
                    });
                }
                else {
                    next('user not found');
                }
            })
        }
    }
];

//update water log
exports.update_water_log = [
    body('amount').isLength({ min: 1 }).withMessage('water amount is required'),
    body('_id').isMongoId().withMessage('invalid water log'),
    sanitizeBody('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            res.send(errors.array());
        }
        else {
            const userId = req.params.id;

            User.findById(userId, function (err, user) {
                if (err) {
                    next(err);
                }
                if (user) {
                    const logId = req.body._id;
                    if (user.logs.water == undefined) {
                        user.logs.water = [];
                    }
                    if (logId) {
                        const waterLogIndex = filterLogById(user.logs.water, logId);
                        if (waterLogIndex > -1) {
                            //delete water log
                            user.logs.water.splice(waterLogIndex, 1);
                        }
                    }
                    user.logs.water.push({
                        amount: req.body.amount,
                        added: req.body.added
                    });
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }).populate('logs.exercise.exercise').exec(function (error, updatedUser) {
                        if (error) {
                            next(error);
                        }
                        else {
                            console.log(updatedUser);
                            res.status(201);
                            res.send(updatedUser);
                        }
                    });
                }
                else {
                    next('user not found');
                }
            })
        }
    }
];

//delte water log
exports.remove_water_log = function (req, res, next) {
    const userId = req.params.id;
    User.findById(userId, function (err, user) {
        if (err) {
            next(err);
        }
        if (user) {
            const logId = req.params.logId;
            if (user.logs.water == undefined) {
                user.logs.water = [];
            }
            if (logId) {
                const waterLogIndex = filterLogById(user.logs.water, logId);
                if (waterLogIndex > -1) {
                    //delete water log
                    user.logs.water.splice(waterLogIndex, 1);
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }).populate('logs.exercise.exercise').exec(function (error, updatedUser) {
                        if (error) {
                            next(error);
                        }
                        user = updatedUser;
                        console.log(updatedUser);
                        res.status(201);
                        res.send(updatedUser);
                    });
                }
                else {
                    res.status(201);
                    res.send(user);
                }
            }
            else {
                res.status(400);
                res.send('resourse log not provided');
            }
        }
        else {
            next('user not found');
        }
    })
}

//add diet log
exports.add_diet_log = [
    body('food').isMongoId().withMessage('Invalid food'),
    body('mealOption').isLength({ min: 6 }).withMessage('Invalid meal option'),
    body('servings.size.amount').isInt({ min: 1 }).withMessage('Provide servings amount'),
    body('servings.quantity').isInt({ min: 1 }).withMessage('Provide servings quantity'),
    sanitizeBody('*').trim().escape(),
    sanitizeParam('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400);
            res.send(errors.array());
        }
        else {
            const userId = req.params.id;
            User.findById(userId, function (err, user) {
                if (err) {
                    next(err);
                }
                if (user) {
                    if (user.logs.diet == undefined) {
                        user.logs.diet = [];
                    }
                    user.logs.diet.push({
                        food: req.body.food,
                        servings: {
                            size: {
                                amount: req.body.servings.size.amount,
                                unit: req.body.servings.size.unit
                            },
                            quantity: req.body.servings.size.quantity
                        },
                        mealOption: req.body.mealOption,
                        added: new Date(req.body.added)
                    });
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }, function (err, result) {
                        if (err) {
                            next(err);
                        }
                        var food = food_controller.get_food_id(req.body.food, next);
                        if (food) {
                            food._users.push(req.params.id);
                            food_controller.update_food(req.body.food, food, next);
                            res.status(201);
                            res.send(result);
                        }
                    });
                }
            })
        }
    }
]

//update diet log
exports.update_diet_log = [
    body('food').isMongoId().withMessage('Invalid food'),
    body('mealOption').isLength({ min: 6 }).withMessage('Invalid meal option'),
    body('servings.size.amount').isInt({ min: 1 }).withMessage('Provide servings amount'),
    body('servings.quantity').isInt({ min: 1 }).withMessage('Provide servings quantity'),
    sanitizeBody('*').trim().escape(),
    sanitizeParam('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400);
            res.send(errors.array());
        }
        else {
            const userId = req.params.id;
            User.findById(userId, function (err, user) {
                if (err) {
                    next(err);
                }
                if (user) {
                    if (user.logs.diet == undefined) {
                        user.logs.diet = [];
                    }
                    user.logs.diet.push({
                        food: req.body.food,
                        servings: {
                            size: {
                                amount: req.body.servings.size.amount,
                                unit: req.body.servings.size.unit
                            },
                            quantity: req.body.servings.size.quantity
                        },
                        mealOption: req.body.mealOption,
                        added: new Date(req.body.added)
                    });
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }, function (err, result) {
                        if (err) {
                            next(err);
                        }
                        var food = food_controller.get_food_id(req.body.food, next);
                        if (food) {
                            food._users.push(req.params.id);
                            food_controller.update_food(req.body.food, food, next);
                            res.status(201);
                            res.send(result);
                        }
                    });
                }
            })
        }
    }
]

//find user by id
const findUserById = function (userId, next) {
    console.log(userId);
    User.findById(userId, function (err, result) {
        if (err) {
            next(err);
        }
        console.log(result);
        next(result);
    });
}

exports.findUserById = findUserById;

//find logged water by id
const filterLogById = function (array, logId) {
    var index = -1;
    for (let i = 0; i < array.length; i++) {
        if (array[i]._id == logId) {
            index = i;
            break;
        }
    }
    return index;
}

//attach exercise detail to exercise log
const attachExerciseToLog = function (user) {
    var result = user;
    for (let i = 0; i < user.logs.exercise.length; i++) {
        exercise_controller.get_exercise_id(user.logs.exercise[i]._id, function (exercise) {
            result.logs.exercise[i].exercise = exercise;
        });
    }
    return result;
}