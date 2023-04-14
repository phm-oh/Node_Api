const User = require('../models/user');


exports.index = (req, res, next)=> {
    // res.send('Hello phanu');
    res.status(200).json({
       message:'Hello user'
    })
  }

exports.login = (req, res, next)=> {
    // res.send('Hello phanu');
    res.status(200).json({
       message:'Hello login'
    })
  }



exports.register = async (req,res,next) =>{
    

   try {
      const  {name,email,password} = req.body;
      const exitsUser = await  User.findOne({email:email});
      if (exitsUser){
         const error = new Error('อีเมลซ้ำ มีผู้ใช้งานนี้แล้ว');
         error.statusCode = 400;
         throw error;
      }

      let user = new User();
      user.name = name;
      user.email = email;
      user.password = password;

      await user.save();

      res.status(201).json({
         mesaage: 'เพิ่มข้อมูลเรียบร้อย'
      })


      
      
   } catch(error) {
      next(error);
   }
   

}