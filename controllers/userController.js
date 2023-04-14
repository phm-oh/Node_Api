const User = require("../models/user");
const crypt = require("../middleware/encryptpassword");
const { validationResult } = require("express-validator");

exports.index = (req, res, next) => {
  // res.send('Hello phanu');
  res.status(200).json({
    message: "Hello user",
  });
};

exports.login = async (req, res, next) => {
  
  try {
    const { email, password } = req.body;

    
    
    //check มี email ในระบบหรือไม่
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งานในระบบ");
      error.statusCode = 404;
      throw error;
    }

    //ตรวจสอบรหัวว่าตรงหันไหม
    const isValid = await user.comparePassword(password);
    if(!isValid){
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({
      mesaage: "เข้าระบบเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
 
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลไม่ถูกต้อง");
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }

    const exitsUser = await User.findOne({ email: email });
    if (exitsUser) {
      const error = new Error("อีเมลซ้ำ มีผู้ใช้งานนี้แล้ว");
      error.statusCode = 400;
      throw error;
    }

    let user = new User();
    user.name = name;
    user.email = email;
    // user.password = await crypt.encrypt(password) ;
    user.password = await user.encryptPassword(password);

    await user.save();

    res.status(201).json({
      mesaage: "เพิ่มข้อมูลเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};
