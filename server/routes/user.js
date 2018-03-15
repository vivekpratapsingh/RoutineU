const express = require('express');
var user_controller = require('../controllers/userController');

const router = express.Router();

// router middleware to check valid user
router.use('/:id', function (req, res, next) {
    let userId = req.params.id;
    if (userId) {
        let user = null;
        user_controller.findUserById(userId,function(user){
            if (user) {
                console.log('user found');
                next();
            }
            else {
                console.log('user not found');
                res.status(404);
                res.send('invalid user id');
            }
        });
    }
});

// update user details
router.put('/:id', user_controller.update_user_detail);

router.get('/:id', user_controller.get_user_by_id);

//add exercise log
router.post('/:id/logs/exercises', user_controller.add_exercise_log);

//update exercise log
router.put('/:id/logs/exercises', user_controller.update_exercise_log);

//remove exercise log
router.delete('/:id/logs/exercises/:logId', user_controller.remove_exercise_log);

//add water log
router.post('/:id/logs/water', user_controller.add_water_log);

//update water log
router.put('/:id/logs/water',user_controller.update_water_log);

//remove water log
router.delete('/:id/logs/water/:logId',user_controller.remove_water_log);

//add food log
router.post('/:id/logs/food', user_controller.add_diet_log);

//update diet log
router.put('/:id/logs/food',user_controller.update_diet_log);

//remove diet log
router.delete('/:id/logs/food/:logId',user_controller.remove_diet_log);

module.exports = router;