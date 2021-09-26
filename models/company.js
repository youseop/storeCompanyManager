const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  engName: { type: String, required: true, trim: true },
  korName: { type: String, required: true, trim: true },
  brandUrl: { type: String, required: true, trim: true },
  tags: { type: [String], required: true },
  isBranded: { type: Boolean, required: true },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Company", companySchema);
