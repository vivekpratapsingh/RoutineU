const express = require('express');
var user_controller = require('../controllers/userController');

const router = express.Router();

router.put('/:id',user_controller.update_user_detail);

router.get('/:id',user_controller.get_user_by_id);

//add exercise log
router.post('/:id/logs/exercises',user_controller.add_exercise_log);

//add water log
router.post('/:id/logs/water',user_controller.add_water_log);

//add food log
router.post(':id/logs/food',user_controller.add_diet_log);

module.exports = router;