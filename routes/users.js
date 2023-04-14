const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



/* GET users listing. */
/** http://localhost:3000/user */
router.get('/',userController.index );

/** http://localhost:3000/user/login */
router.get('/login', userController.login);

/** http://localhost:3000/user/register */
router.post('/register', userController.register);




module.exports = router;
