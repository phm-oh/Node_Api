const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String , default: 'nopic.png' },
    location: {
        lat: Number,
        lgn:Number
    },
  },

  {
    timestamps: true,
    collection: "shops",
    toJSON: { virtuals: true}
  }
);

shopSchema.virtual('menus',{
  ref:'Menu', // ลิงค์ไปที่ model menu
  localField: '_id', //_id ฟิลด์ของโมเดล  Shop  (ไฟล์นี้)
  foreignField:'shop' //shop คือฟิลของ model Menu (fk)
})


const shop = mongoose.model("shops", shopSchema);

module.exports = shop;
