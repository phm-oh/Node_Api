const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type:String, require:true , trim:true },
  email: {type:String ,require:true, trim:true , unique: true ,index:true},
  password:{ type:String,requrie:true,trim:true,minlenght:3},
  role: {type:String,default:'member'}
  
},{
  collection:'users'
});


const user = mongoose.model('User',userSchema);

module.exports = user;