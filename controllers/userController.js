const User = require("../models/user");

exports.index = (req, res, next) => {
  // res.send('Hello phanu');
  res.status(200).json({
    data: [
      { id: 1, name: "John" },
      { id: 2, name: "Mary" },
    ],
  });
};

exports.login = (req, res, next) => {
  // res.send('Hello phanu');
  res.status(200).json({
    message: "Hello login",
  });
};

exports.register = async (reg, res, next) => {
  try {
    const { name, email, password } = reg.body;

    // check email ซ้ำ
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      
        const error = new Error('อีเมลซ้ำ มีผู้ใช้งานแล้ว') ;
        error.statusCode = 400;
        throw error;

    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);

    await user.save();

    res.status(201).json({ message: " ลงทะเบียนเรียบร้อย " });
  } catch (error) {
    next(error);
  }
};
