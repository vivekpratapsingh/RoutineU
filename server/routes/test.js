const express = require('express');

const router = express.Router();

var test_controller = require('../controllers/testController');

router.get('/',test_controller.index);

module.exports = router;