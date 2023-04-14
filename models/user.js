const mongoose = require("mongoose");
const { Schema } = mongoose;
var bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    }, // ใส่ unique เพื่อไม่ให้ซ้ำใน db และ index เพื่อความเร็วในการค้นหา
    password: { type: String, required: true, trim: true, minlength: 3 },
    role: { type: String, default: "member" },
  },

  {
    collection: "users",
  }
);

  userSchema.methods.encryptPassword = async function(password){
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password,salt);
    return hashPassword;
}




const user = mongoose.model("users", userSchema);

module.exports = user;
