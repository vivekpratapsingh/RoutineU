const { body, validationResult } = require('express-validator/check');
const { sanitizeBody, sanitizeParam, sanitizeQuery } = require('express-validator/filter');
const User = require('../models/users');
const exercise_controller = require('./exerciseController');
const food_controller = require('./foodController');

//get current user
exports.get_current_user = function (req, res, next) {
    User.findById(req.auth.id).populate('user.logs.exercise.exercise', 'name').populate('logs.diet.food').exec(function (err, user) {
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
    User.findById(req.params.id).populate('logs.exercise.exercise', 'name').populate('logs.diet.food').exec(function (err, user) {
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
    sanitizeBody('*').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            return res.send({ errors: errors.array() });
        }
        else {
            const userId = req.params.id;
            User.findById(userId).populate('logs.exercise.exercise', 'name').populate('logs.diet.food').exec(function (err, user) {
                if (err) {
                    next(err);
                }
                if (user) {
                    const exerciseLog = req.body;
                    if (user.logs.exercise == undefined) {
                        user.logs.exercise = [];
                    }
                    user.logs.exercise.push(exerciseLog);
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }).populate('logs.exercise.exercise', 'name').populate('logs.diet.food').exec(function (error, updatedUser) {
                        if (error) {
                            next(error);
                        }
                        else {
                            console.log(updatedUser);
                            var exercise = exercise_controller.get_exercise_id(exerciseLog.exercise, next);
                            if (exercise) {
                                if (exercise._users == undefined) {
                                    exercise._users = [];
                                }
                                exercise._users.push(userId);
                                exercise_controller.update_exercise(exerciseLog.exercise, exercise, next);
                            }
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

exports.add_water_log = [
    body('amount').isLength({ min: 1 }).withMessage('water amount is required'),
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
                    User.findByIdAndUpdate(userId, { $set: user }, { new: true }, function (error, updatedUser) {
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
const findUserById = function (userId) {
    var user = null;
    User.findById(userId, function (err, result) {
        if (err) {
            next(err);
        }
        user = result;
    });
    return user;
}
