const express = require('express');
const authContoller = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/facebook',authContoller.authenticate);

// router.get('/facebook',authContoller.get_authenticate);

//router.get('/auth/me',authContoller.token,userController.get_current_user,userController.get_one);

module.exports = router;