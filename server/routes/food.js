const express = require('express');
const router = express.Router();
const food_controller = require('../controllers/foodController');

router.get('/',food_controller.get_food);

router.get('/name',food_controller.get_food_by_name);

module.exports = router;