const exercise = require('../controllers/exerciseController');
const express = require('express');
const router = express.Router();

router.get('/',exercise.get_exercise);

router.post('/',exercise.add_exercise);

router.get('/name',exercise.get_exercise_by_name);

module.exports = router;