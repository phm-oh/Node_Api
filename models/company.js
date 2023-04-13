const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  name: String, // String is shorthand for {type: String}
  address: {
    province: { type:String }
  },
  
},{
  collection:'companies'
});


const company = mongoose.model('company',companySchema);

module.exports = company;