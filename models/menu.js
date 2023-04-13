const mongoose = require("mongoose");
const { Schema } = mongoose;

const menuSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number},
    shop: { type: Schema.Types.ObjectId , ref: 'shops' }
  },

  {
    timestamps: true,
    collection: "menus",
    toJSON: { virtuals: true}
  }
);

menuSchema.virtual('price_vat').get(function(){
  return  (this.price*0.07)+this.price;
});


const menu = mongoose.model("Menu", menuSchema);

module.exports = menu;