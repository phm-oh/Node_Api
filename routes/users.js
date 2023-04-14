const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { body } = require('express-validator');s



/* GET users listing. */
/** http://localhost:3000/users */
router.get('/',userController.index );

/** http://localhost:3000/users/login */
router.get('/login', userController.login);

/** http://localhost:3000/users/login */
router.post('/register', userController.register);






module.exports = router;
