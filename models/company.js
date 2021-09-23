const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  engName: String,
  korName: String,
  brandUrl: String,
  tags: [String],
  isBranded: Boolean,
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Company", companySchema);
