const express = require('express');
const router = express.Router();
const food_controller = require('../controllers/foodController');

router.get('/',food_controller.get_food);

router.get('/search',food_controller.get_food_by_query);

module.exports = router;