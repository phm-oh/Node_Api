const mongoose = require("mongoose");
const { Schema } = mongoose;

const staffSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    salary: { type: Number },
    created: { type: Date , default: Date.now }
  },

  {
    collection: "staffs",
  }
);

const staff = mongoose.model("staffs", staffSchema);

module.exports = staff;
