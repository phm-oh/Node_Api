const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { body } = require('express-validator');



/* GET users listing. */
/** http://localhost:3000/users */
router.get('/',userController.index );

/** http://localhost:3000/users/login */
router.post('/login', userController.login);

/** http://localhost:3000/users/login */
router.post('/register', [
    body('name').not().isEmpty().withMessage('กรุณาป้อนชื่อผู้ใช้'),
    body('email').not().isEmpty().withMessage('กรุณากรอกอีเมลด้วย').isEmail().withMessage('รูปแบบอีเมล์ไม่ถูกต้อง'),
    body('password').not().isEmpty().withMessage('กรุณาป้อนรหัสผ่าน').isLength({min:3}).withMessage('รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป'),

],userController.register);






module.exports = router;
