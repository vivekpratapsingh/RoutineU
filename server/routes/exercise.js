const exercise = require('../controllers/exerciseController');
const express = require('express');
const router = express.Router();

router.get('/',exercise.get_exercise);

router.post('/',exercise.add_exercise);

router.get('/search',exercise.get_exercise_by_query);

module.exports = router;