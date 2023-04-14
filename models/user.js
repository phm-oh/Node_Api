const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const crypt = require('../middleware/encryptpassword');

const userSchema = new Schema({
  name: {type:String, require:true , trim:true },
  email: {type:String ,require:true, trim:true , unique: true ,index:true},
  password:{ type:String,requrie:true,trim:true,minlenght:3},
  role: {type:String,default:'member'}
  
},{
  collection:'users'
});
//------------------------------------------------------------------------
// method แบบ ฝั้งติด schema 

userSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword;
}
//------------------------------------------------------


const user = mongoose.model('User',userSchema);

module.exports = user;