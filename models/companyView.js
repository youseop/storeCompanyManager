const mongoose = require("mongoose");
const { Schema } = mongoose;

const companyViewSchema = new Schema({
  korName: { type: String, required: true, trim: true },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CompanyView", companyViewSchema);
