const express = require('express');
var user_controller = require('../controllers/userController');

const router = express.Router();

router.put('/:id',user_controller.update_user_detail);

module.exports = router;